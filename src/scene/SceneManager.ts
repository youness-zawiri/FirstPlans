import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { TimeOfDay } from '../types.ts';
import { createHassanTower, HassanTowerParts } from './HassanTowerModel.ts';
import { createCourtyardAndSurroundings, CourtyardParts } from './CourtyardAndColumns.ts';

// Pre-allocated math objects to ensure zero GC in animation loop
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export interface SceneManagerConfig {
  container: HTMLDivElement;
  onHotspotsUpdate?: (screenPositions: { id: string; x: number; y: number; visible: boolean }[]) => void;
  onCameraMoveStart?: () => void;
}

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;

  private tower: HassanTowerParts;
  private courtyard: CourtyardParts;

  // Lights
  private sunLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private nightSpotLights: THREE.SpotLight[] = [];

  // Animation & state
  private reqId: number | null = null;
  private clock = new THREE.Clock();
  private isDestroyed = false;
  private isTransitioningCamera = false;
  private cameraTransitionProgress = 1;
  private cameraStartPos = new THREE.Vector3();
  private cameraStartTarget = new THREE.Vector3();
  private autoRotate = true;

  private timeOfDay: TimeOfDay = 'golden_hour';
  private cutawayProgress = 0;
  private targetCutawayProgress = 0;

  private onHotspotsUpdate?: (screenPositions: { id: string; x: number; y: number; visible: boolean }[]) => void;
  private hotspotWorldPositions: { id: string; pos: THREE.Vector3 }[] = [];

  constructor(config: SceneManagerConfig) {
    const { container, onHotspotsUpdate } = config;
    this.onHotspotsUpdate = onHotspotsUpdate;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x38241e);
    this.scene.fog = new THREE.FogExp2(0x38241e, 0.0045);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 800);
    this.camera.position.set(0, 24, -58);

    // 3. Renderer setup adhering to Three.js guidelines
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    this.renderer = new THREE.WebGLRenderer({
      antialias: !isHeadless,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = !isHeadless;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // 4. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = envTexture;
    pmremGenerator.dispose();

    // 5. Controls setup with smooth damping
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath ground plane
    this.controls.minDistance = 6;
    this.controls.maxDistance = 250;
    this.controls.target.set(0, 18, 0);
    this.controls.autoRotate = this.autoRotate;
    this.controls.autoRotateSpeed = 0.5;

    // 6. Lighting Rig
    this.hemiLight = new THREE.HemisphereLight(0xffeedd, 0x553322, 1.2);
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xffc277, 2.8);
    this.sunLight.position.set(-60, 75, -50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 10;
    this.sunLight.shadow.camera.far = 300;
    const shadowD = 85;
    this.sunLight.shadow.camera.left = -shadowD;
    this.sunLight.shadow.camera.right = shadowD;
    this.sunLight.shadow.camera.top = shadowD;
    this.sunLight.shadow.camera.bottom = -shadowD;
    this.sunLight.shadow.bias = -0.0005;
    this.sunLight.shadow.normalBias = 0.02;
    this.scene.add(this.sunLight);

    // Night Architectural Up-spotlights on the 4 tower facades
    const spotPositions = [
      [0, 0.5, 20, 0, 24, 0],    // South
      [0, 0.5, -20, 0, 24, 0],   // North
      [20, 0.5, 0, 0, 24, 0],    // East
      [-20, 0.5, 0, 0, 24, 0],   // West
    ];

    spotPositions.forEach(([x, y, z, tx, ty, tz]) => {
      const spot = new THREE.SpotLight(0xffa544, 0, 80, Math.PI / 3, 0.45, 1.2);
      spot.position.set(x, y, z);
      spot.target.position.set(tx, ty, tz);
      this.scene.add(spot);
      this.scene.add(spot.target);
      this.nightSpotLights.push(spot);
    });

    // 7. Procedural Models Assembly
    this.tower = createHassanTower();
    this.scene.add(this.tower.group);

    this.courtyard = createCourtyardAndSurroundings();
    this.scene.add(this.courtyard.group);

    // Initial Atmosphere
    this.applyTimeOfDay(this.timeOfDay);

    // Handle Window Resize
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    // Pre-warm WebGL shaders
    this.renderer.compile(this.scene, this.camera);

    // Start loop
    this.animate = this.animate.bind(this);
    this.reqId = requestAnimationFrame(this.animate);
  }

  public setHotspotWorldPositions(hotspots: { id: string; pos: [number, number, number] }[]) {
    this.hotspotWorldPositions = hotspots.map((h) => ({
      id: h.id,
      pos: new THREE.Vector3(h.pos[0], h.pos[1], h.pos[2]),
    }));
  }

  public setAutoRotate(enabled: boolean) {
    this.autoRotate = enabled;
    this.controls.autoRotate = enabled;
  }

  public setCutaway(enabled: boolean) {
    this.targetCutawayProgress = enabled ? 1 : 0;
  }

  public setDimensionsVisible(visible: boolean) {
    this.tower.setDimensionsVisible(visible);
  }

  public flyToPreset(position: [number, number, number], target: [number, number, number], fov?: number) {
    this.isTransitioningCamera = true;
    this.cameraTransitionProgress = 0;
    this.cameraStartPos.copy(this.camera.position);
    this.cameraStartTarget.copy(this.controls.target);

    _targetCamPos.set(position[0], position[1], position[2]);
    _targetLookAt.set(target[0], target[1], target[2]);

    if (fov && this.camera.fov !== fov) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }

    this.controls.autoRotate = false;
  }

  public setTimeOfDay(tod: TimeOfDay) {
    this.timeOfDay = tod;
    this.applyTimeOfDay(tod);
  }

  private applyTimeOfDay(tod: TimeOfDay) {
    let bgColor = 0x38241e;
    let fogDensity = 0.0045;
    let sunColor = 0xffc277;
    let sunIntensity = 2.8;
    let hemiSky = 0xffeedd;
    let hemiGround = 0x553322;
    let hemiIntensity = 1.2;
    let exposure = 1.1;
    let nightSpotIntensity = 0;

    if (tod === 'golden_hour') {
      // Moroccan Golden Hour sunset over Atlantic
      bgColor = 0x522922;
      fogDensity = 0.0042;
      sunColor = 0xff9944;
      sunIntensity = 3.2;
      this.sunLight.position.set(-80, 42, -65);
      hemiSky = 0xffbe99;
      hemiGround = 0x3a1d17;
      hemiIntensity = 1.1;
      exposure = 1.15;
      nightSpotIntensity = 0.8;
    } else if (tod === 'daylight') {
      // Crisp Moroccan Mediterranean daylight
      bgColor = 0x8ecae6;
      fogDensity = 0.0028;
      sunColor = 0xfffcf0;
      sunIntensity = 3.6;
      this.sunLight.position.set(-30, 95, -20);
      hemiSky = 0xbee1f5;
      hemiGround = 0x6e5241;
      hemiIntensity = 1.4;
      exposure = 1.05;
      nightSpotIntensity = 0.0;
    } else if (tod === 'night') {
      // Midnight architectural illumination
      bgColor = 0x060913;
      fogDensity = 0.005;
      sunColor = 0x223366; // Moonlight
      sunIntensity = 0.35;
      this.sunLight.position.set(40, 60, 40);
      hemiSky = 0x0c1328;
      hemiGround = 0x03060d;
      hemiIntensity = 0.4;
      exposure = 1.25;
      nightSpotIntensity = 6.5; // Dramatic golden uplighting
    } else if (tod === 'dawn') {
      // Atlantic coastal morning mist
      bgColor = 0x7a626a;
      fogDensity = 0.0065;
      sunColor = 0xffb59d;
      sunIntensity = 2.4;
      this.sunLight.position.set(80, 35, 60);
      hemiSky = 0xd4b8b8;
      hemiGround = 0x3a2c2c;
      hemiIntensity = 1.0;
      exposure = 1.05;
      nightSpotIntensity = 0.4;
    }

    this.scene.background = new THREE.Color(bgColor);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(bgColor);
      this.scene.fog.density = fogDensity;
    }
    this.sunLight.color.setHex(sunColor);
    this.sunLight.intensity = sunIntensity;
    this.hemiLight.color.setHex(hemiSky);
    this.hemiLight.groundColor.setHex(hemiGround);
    this.hemiLight.intensity = hemiIntensity;
    this.renderer.toneMappingExposure = exposure;

    this.nightSpotLights.forEach((spot) => {
      spot.intensity = nightSpotIntensity;
    });
  }

  private animate() {
    if (this.isDestroyed) return;
    this.reqId = requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Camera interpolation if transitioning
    if (this.isTransitioningCamera) {
      this.cameraTransitionProgress += delta * 1.5;
      const t = Math.min(this.cameraTransitionProgress, 1.0);
      // Smooth quintic ease
      const easeT = 1 - Math.pow(1 - t, 4);

      this.camera.position.lerpVectors(this.cameraStartPos, _targetCamPos, easeT);
      this.controls.target.lerpVectors(this.cameraStartTarget, _targetLookAt, easeT);

      if (t >= 1.0) {
        this.isTransitioningCamera = false;
        if (this.autoRotate) {
          this.controls.autoRotate = true;
        }
      }
    }

    // 2. Smooth cutaway animation with exponential damping
    if (Math.abs(this.cutawayProgress - this.targetCutawayProgress) > 0.001) {
      this.cutawayProgress = THREE.MathUtils.damp(
        this.cutawayProgress,
        this.targetCutawayProgress,
        6,
        delta
      );
      this.tower.setCutawayProgress(this.cutawayProgress);
    }

    // 3. Update controls with damping
    this.controls.update();

    // 4. Update procedural parts
    this.tower.update(elapsedTime);
    this.courtyard.update(elapsedTime);

    // 5. Render
    this.renderer.render(this.scene, this.camera);

    // 6. Update hotspot 2D screen projections for React UI
    if (this.onHotspotsUpdate && this.hotspotWorldPositions.length > 0) {
      const halfW = this.renderer.domElement.clientWidth / 2;
      const halfH = this.renderer.domElement.clientHeight / 2;

      const screenPositions = this.hotspotWorldPositions.map((h) => {
        _vec3.copy(h.pos);
        _vec3.project(this.camera);

        const isBehind = _vec3.z > 1.0;
        const x = _vec3.x * halfW + halfW;
        const y = -_vec3.y * halfH + halfH;
        return {
          id: h.id,
          x,
          y,
          visible: !isBehind,
        };
      });

      this.onHotspotsUpdate(screenPositions);
    }
  }

  public handleResize() {
    const parent = this.renderer.domElement.parentElement;
    if (!parent) return;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.reqId) cancelAnimationFrame(this.reqId);
    window.removeEventListener('resize', this.handleResize);

    this.controls.dispose();
    this.renderer.dispose();

    // Clean up DOM
    if (this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
