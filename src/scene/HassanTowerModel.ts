import * as THREE from 'three';
import {
  createSandstoneTexture,
  createStoneBumpMap,
  createSebkaTexture,
  createContactShadowTexture,
} from '../utils/proceduralTextures.ts';

export interface HassanTowerParts {
  group: THREE.Group;
  baseGroup: THREE.Group;
  shaftGroup: THREE.Group;
  upperTierGroup: THREE.Group;
  unfinishedTopGroup: THREE.Group;
  internalRampGroup: THREE.Group;
  dimensionMarkersGroup: THREE.Group;
  contactShadow: THREE.Mesh;
  setCutawayProgress: (progress: number) => void;
  setDimensionsVisible: (visible: boolean) => void;
  update: (time: number) => void;
}

export function createHassanTower(): HassanTowerParts {
  const group = new THREE.Group();
  group.name = 'HassanTower';

  // Shared procedural textures
  const sandstoneTex = createSandstoneTexture(1024, 1024);
  sandstoneTex.repeat.set(2, 4);
  const stoneBump = createStoneBumpMap(512, 512);
  stoneBump.repeat.set(2, 4);
  const sebkaTex = createSebkaTexture(512, 512);
  sebkaTex.repeat.set(1, 2);

  // Materials with varied physical roughness/metalness
  const mainSandstoneMat = new THREE.MeshStandardMaterial({
    map: sandstoneTex,
    bumpMap: stoneBump,
    bumpScale: 0.08,
    roughness: 0.88,
    metalness: 0.05,
    color: new THREE.Color(0xd2754e),
  });

  const basePlinthMat = new THREE.MeshStandardMaterial({
    map: sandstoneTex,
    bumpMap: stoneBump,
    bumpScale: 0.12,
    roughness: 0.95,
    metalness: 0.02,
    color: new THREE.Color(0x9d4b2d),
  });

  const sebkaReliefMat = new THREE.MeshStandardMaterial({
    map: sebkaTex,
    bumpMap: sebkaTex,
    bumpScale: 0.15,
    roughness: 0.75,
    metalness: 0.1,
    color: new THREE.Color(0xe4895f),
  });

  const archTrimMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xf1a57b),
    roughness: 0.6,
    metalness: 0.15,
  });

  const darkInteriorMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x28130b),
    roughness: 0.95,
    metalness: 0.0,
  });

  const rampStoneMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xc06742),
    roughness: 0.82,
    metalness: 0.05,
  });

  const goldAccentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd4af37),
    roughness: 0.35,
    metalness: 0.8,
  });

  // Group sub-components for modular hierarchy & cutaway
  const baseGroup = new THREE.Group();
  const shaftGroup = new THREE.Group();
  const upperTierGroup = new THREE.Group();
  const unfinishedTopGroup = new THREE.Group();
  const internalRampGroup = new THREE.Group();
  const dimensionMarkersGroup = new THREE.Group();

  group.add(baseGroup);
  group.add(shaftGroup);
  group.add(upperTierGroup);
  group.add(unfinishedTopGroup);
  group.add(internalRampGroup);
  group.add(dimensionMarkersGroup);

  // Dimensions scale: 1 Three.js unit = ~1 meter
  // Hassan Tower actual dimensions: 16m x 16m base, 44m height
  const baseWidth = 16;
  const totalHeight = 44;
  const plinthHeight = 2.5;
  const shaftHeight = 24.5;
  const upperTierHeight = 14;
  const topParapetHeight = 3.0;

  // 1. STEPPED BASE PLINTH (3 stepped courses)
  const stepCount = 3;
  for (let s = 0; s < stepCount; s++) {
    const sWidth = baseWidth + (stepCount - 1 - s) * 0.8;
    const sHeight = plinthHeight / stepCount;
    const sGeo = new THREE.BoxGeometry(sWidth, sHeight, sWidth);
    const sMesh = new THREE.Mesh(sGeo, basePlinthMat);
    sMesh.position.y = s * sHeight + sHeight / 2;
    sMesh.castShadow = true;
    sMesh.receiveShadow = true;
    baseGroup.add(sMesh);
  }

  // 2. LOWER/MAIN SHAFT TOWER
  // Hollow square tower so internal ramp is physically inside
  const wallThickness = 2.4;
  const innerWidth = baseWidth - wallThickness * 2; // 11.2m hollow core

  const createHollowSection = (w: number, h: number, t: number, mat: THREE.Material) => {
    const sectionGroup = new THREE.Group();
    // 4 thick walls
    const northWall = new THREE.Mesh(new THREE.BoxGeometry(w, h, t), mat);
    northWall.position.set(0, h / 2, -w / 2 + t / 2);
    northWall.castShadow = true;
    northWall.receiveShadow = true;

    const southWall = new THREE.Mesh(new THREE.BoxGeometry(w, h, t), mat);
    southWall.position.set(0, h / 2, w / 2 - t / 2);
    southWall.castShadow = true;
    southWall.receiveShadow = true;

    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(t, h, w - t * 2), mat);
    eastWall.position.set(w / 2 - t / 2, h / 2, 0);
    eastWall.castShadow = true;
    eastWall.receiveShadow = true;

    const westWall = new THREE.Mesh(new THREE.BoxGeometry(t, h, w - t * 2), mat);
    westWall.position.set(-w / 2 + t / 2, h / 2, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;

    sectionGroup.add(northWall, southWall, eastWall, westWall);
    return sectionGroup;
  };

  const lowerShaft = createHollowSection(baseWidth, shaftHeight, wallThickness, mainSandstoneMat);
  lowerShaft.position.y = plinthHeight;
  shaftGroup.add(lowerShaft);

  // Decorative Corner Pilasters (المعالم الزاوية البارزة)
  const cornerR = 0.55;
  const cornerGeo = new THREE.CylinderGeometry(cornerR, cornerR, shaftHeight, 16);
  const corners = [
    [baseWidth / 2, -baseWidth / 2],
    [-baseWidth / 2, -baseWidth / 2],
    [baseWidth / 2, baseWidth / 2],
    [-baseWidth / 2, baseWidth / 2],
  ];

  corners.forEach(([cx, cz]) => {
    const col = new THREE.Mesh(cornerGeo, archTrimMat);
    col.position.set(cx, plinthHeight + shaftHeight / 2, cz);
    col.castShadow = true;
    shaftGroup.add(col);
  });

  // GRAND HORSESHOE ARCH PORTALS on four sides at lower base
  const portalWidth = 3.6;
  const portalHeight = 6.2;
  const portalDepth = 0.8;

  const createHorseshoePortal = (rotationY: number) => {
    const pGroup = new THREE.Group();
    // Portal outer frame
    const frameGeo = new THREE.BoxGeometry(portalWidth + 1.2, portalHeight + 1.2, portalDepth);
    const frameMesh = new THREE.Mesh(frameGeo, archTrimMat);
    frameMesh.position.y = (portalHeight + 1.2) / 2;

    // Recessed dark entry opening
    const innerNiche = new THREE.Mesh(
      new THREE.BoxGeometry(portalWidth, portalHeight, portalDepth * 1.5),
      darkInteriorMat
    );
    innerNiche.position.y = portalHeight / 2;
    innerNiche.position.z = 0.2;

    // Arch crowning molding
    const archTop = new THREE.Mesh(
      new THREE.CylinderGeometry(portalWidth / 2 + 0.3, portalWidth / 2 + 0.3, portalDepth + 0.1, 24, 1, false, 0, Math.PI),
      archTrimMat
    );
    archTop.rotation.z = Math.PI / 2;
    archTop.rotation.y = Math.PI / 2;
    archTop.position.y = portalHeight;

    pGroup.add(frameMesh, innerNiche, archTop);
    pGroup.rotation.y = rotationY;
    return pGroup;
  };

  // South portal (facing the forest of columns/prayer hall)
  const southPortal = createHorseshoePortal(0);
  southPortal.position.set(0, plinthHeight, baseWidth / 2 + 0.1);
  shaftGroup.add(southPortal);

  // North portal (facing Bouregreg river)
  const northPortal = createHorseshoePortal(Math.PI);
  northPortal.position.set(0, plinthHeight, -baseWidth / 2 - 0.1);
  shaftGroup.add(northPortal);

  // 3. MID-SHAFT SEBKA PANELS & MULTIFOIL BLIND ARCADES (Each face has distinct decorative motifs)
  const createFacadeDecorations = () => {
    const decGroup = new THREE.Group();
    const panelW = baseWidth * 0.72;
    const panelH = shaftHeight * 0.58;
    const panelY = plinthHeight + shaftHeight * 0.55;

    // Faces: 0: South, 1: North, 2: East, 3: West
    const faces = [
      { rot: 0, pos: [0, panelY, baseWidth / 2 + 0.05] },
      { rot: Math.PI, pos: [0, panelY, -baseWidth / 2 - 0.05] },
      { rot: Math.PI / 2, pos: [baseWidth / 2 + 0.05, panelY, 0] },
      { rot: -Math.PI / 2, pos: [-baseWidth / 2 - 0.05, panelY, 0] },
    ];

    faces.forEach((face, idx) => {
      const fGroup = new THREE.Group();

      // Recessed sebka relief background panel
      const sebkaPanel = new THREE.Mesh(
        new THREE.PlaneGeometry(panelW, panelH),
        sebkaReliefMat
      );
      sebkaPanel.castShadow = true;
      sebkaPanel.receiveShadow = true;
      fGroup.add(sebkaPanel);

      // Multifoil / Polylobed Arch Frame around the sebka panel
      const frameThickness = 0.45;
      const topArc = new THREE.Mesh(
        new THREE.TorusGeometry(panelW / 2, frameThickness / 2, 8, 32, Math.PI),
        archTrimMat
      );
      topArc.position.y = panelH / 2;
      fGroup.add(topArc);

      // Twin slender columns flanking the arch niche
      const colHeight = panelH + 1.0;
      const colGeo = new THREE.CylinderGeometry(0.22, 0.25, colHeight, 16);
      const leftCol = new THREE.Mesh(colGeo, archTrimMat);
      leftCol.position.set(-panelW / 2 - 0.3, 0, 0.2);
      leftCol.castShadow = true;

      const rightCol = new THREE.Mesh(colGeo, archTrimMat);
      rightCol.position.set(panelW / 2 + 0.3, 0, 0.2);
      rightCol.castShadow = true;
      fGroup.add(leftCol, rightCol);

      // Slitted Ramp Windows (Arrow slits at an angle tracking the interior ramp)
      const windowGeo = new THREE.BoxGeometry(0.4, 2.2, 0.8);
      const winCount = 3;
      for (let w = 0; w < winCount; w++) {
        const win = new THREE.Mesh(windowGeo, darkInteriorMat);
        const winX = (w - 1) * 2.8;
        const winY = (w - 1) * 2.5 + (idx % 2 === 0 ? 0.5 : -0.5);
        win.position.set(winX, winY, 0.1);
        fGroup.add(win);
      }

      fGroup.position.set(face.pos[0], face.pos[1], face.pos[2]);
      fGroup.rotation.y = face.rot;
      decGroup.add(fGroup);
    });

    return decGroup;
  };

  shaftGroup.add(createFacadeDecorations());

  // Horizontal Intermediate Cornice Band separating Lower and Upper Tiers
  const corniceBandHeight = 1.2;
  const corniceWidth = baseWidth + 0.6;
  const corniceGeo = new THREE.BoxGeometry(corniceWidth, corniceBandHeight, corniceWidth);
  const corniceMesh = new THREE.Mesh(corniceGeo, archTrimMat);
  corniceMesh.position.y = plinthHeight + shaftHeight;
  corniceMesh.castShadow = true;
  corniceMesh.receiveShadow = true;
  shaftGroup.add(corniceMesh);

  // Stepped Moorish Merlons / Crenellations (شرافات الأندلسية المسننة) along the cornice
  const merlonW = 0.7;
  const merlonH = 0.8;
  const merlonGeo = new THREE.BoxGeometry(merlonW, merlonH, 0.35);
  const merlonsPerSide = 12;
  const merlonSpacing = corniceWidth / merlonsPerSide;

  for (let side = 0; side < 4; side++) {
    const rot = (side * Math.PI) / 2;
    for (let m = 0; m < merlonsPerSide; m++) {
      const mMesh = new THREE.Mesh(merlonGeo, archTrimMat);
      const mx = (m - merlonsPerSide / 2 + 0.5) * merlonSpacing;
      const my = plinthHeight + shaftHeight + corniceBandHeight / 2 + merlonH / 2;
      const mz = corniceWidth / 2 - 0.15;

      const p = new THREE.Vector3(mx, my, mz);
      p.applyAxisAngle(new THREE.Vector3(0, 1, 0), rot);
      mMesh.position.copy(p);
      mMesh.rotation.y = rot;
      shaftGroup.add(mMesh);
    }
  }

  // 4. UPPER TIER SECTION (Slightly narrower, richly arcaded)
  const upperWidth = baseWidth - 0.8;
  const upperShaft = createHollowSection(upperWidth, upperTierHeight, wallThickness, mainSandstoneMat);
  upperShaft.position.y = plinthHeight + shaftHeight + corniceBandHeight;
  upperTierGroup.add(upperShaft);

  // Upper Tier Blind Gallery Arches (أروقة القناطر العلوية المتشابكة)
  const upperArcadeGroup = new THREE.Group();
  const upperY = plinthHeight + shaftHeight + corniceBandHeight + upperTierHeight * 0.5;

  for (let side = 0; side < 4; side++) {
    const rot = (side * Math.PI) / 2;
    const arcadesCount = 3;
    const arcW = upperWidth / 4;

    for (let a = 0; a < arcadesCount; a++) {
      const ax = (a - 1) * (arcW * 1.15);
      const archFrame = new THREE.Mesh(
        new THREE.BoxGeometry(arcW * 0.85, upperTierHeight * 0.65, 0.4),
        archTrimMat
      );
      archFrame.castShadow = true;

      const archInner = new THREE.Mesh(
        new THREE.BoxGeometry(arcW * 0.65, upperTierHeight * 0.55, 0.6),
        sebkaReliefMat
      );

      const aUnit = new THREE.Group();
      aUnit.add(archFrame, archInner);
      aUnit.position.set(ax, 0, upperWidth / 2 + 0.1);
      aUnit.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rot);
      aUnit.rotation.y = rot;
      upperArcadeGroup.add(aUnit);
    }
  }
  upperArcadeGroup.position.y = upperY;
  upperTierGroup.add(upperArcadeGroup);

  // 5. UNFINISHED SUMMIT / CROWN (القمة غير المكتملة التاريخية)
  // Reached 44m height when Sultan Ya'qub al-Mansur died in 1199 CE
  const summitY = plinthHeight + shaftHeight + corniceBandHeight + upperTierHeight;
  
  // Outer jagged parapet
  const parapetGeo = new THREE.BoxGeometry(upperWidth, topParapetHeight, upperWidth);
  const parapetMesh = new THREE.Mesh(parapetGeo, mainSandstoneMat);
  parapetMesh.position.y = summitY + topParapetHeight / 2;
  parapetMesh.castShadow = true;
  parapetMesh.receiveShadow = true;
  unfinishedTopGroup.add(parapetMesh);

  // Jagged broken masonry stones along the top edge (reflecting the unfinished state)
  const jaggedStoneCount = 28;
  const jaggedGeo = new THREE.DodecahedronGeometry(0.65, 0);
  for (let j = 0; j < jaggedStoneCount; j++) {
    const jStone = new THREE.Mesh(jaggedGeo, basePlinthMat);
    const theta = (j / jaggedStoneCount) * Math.PI * 2;
    const jx = (Math.cos(theta) * upperWidth) / 2 + (Math.random() - 0.5) * 0.6;
    const jz = (Math.sin(theta) * upperWidth) / 2 + (Math.random() - 0.5) * 0.6;
    const jy = summitY + topParapetHeight + Math.random() * 0.8;
    jStone.position.set(jx, jy, jz);
    jStone.scale.set(1 + Math.random() * 0.5, 0.6 + Math.random() * 0.8, 1 + Math.random() * 0.5);
    jStone.castShadow = true;
    unfinishedTopGroup.add(jStone);
  }

  // Putlog holes (ثقوب السقالات والعوارض الخشبية الأصلية للقرن الثاني عشر)
  const putlogGeo = new THREE.BoxGeometry(0.3, 0.3, 0.6);
  for (let p = 0; p < 16; p++) {
    const hole = new THREE.Mesh(putlogGeo, darkInteriorMat);
    const ang = (p / 16) * Math.PI * 2;
    hole.position.set(
      (Math.cos(ang) * upperWidth) / 2,
      summitY - 1.2 - (p % 3) * 1.5,
      (Math.sin(ang) * upperWidth) / 2
    );
    unfinishedTopGroup.add(hole);
  }

  // 6. INTERNAL SPIRALING EQUESTRIAN RAMP (المنحدر الداخلي المخصص لركوب الخيل)
  // Instead of stairs, Almohad minarets feature an inclined ramp around a central core
  const coreWidth = 4.2;
  const rampCoreGeo = new THREE.BoxGeometry(coreWidth, totalHeight - 4, coreWidth);
  const rampCoreMesh = new THREE.Mesh(rampCoreGeo, basePlinthMat);
  rampCoreMesh.position.y = (totalHeight - 4) / 2 + plinthHeight;
  rampCoreMesh.castShadow = true;
  internalRampGroup.add(rampCoreMesh);

  // Spiral ramp floor flights climbing up
  const flights = 20;
  const flightHeight = (totalHeight - 8) / flights;
  const rampWidth = (innerWidth - coreWidth) / 2 + 0.4;

  for (let f = 0; f < flights; f++) {
    const fAngle = (f % 4) * (Math.PI / 2);
    const fY = plinthHeight + 2 + f * flightHeight;
    const flightGeo = new THREE.BoxGeometry(coreWidth + rampWidth * 1.8, 0.4, rampWidth);
    const flightMesh = new THREE.Mesh(flightGeo, rampStoneMat);
    flightMesh.position.y = fY;

    // Position along the four inner perimeter corridors
    const dir = f % 4;
    const dist = (coreWidth + rampWidth) / 2;
    if (dir === 0) flightMesh.position.set(0, fY, dist);
    else if (dir === 1) flightMesh.position.set(dist, fY, 0);
    else if (dir === 2) flightMesh.position.set(0, fY, -dist);
    else flightMesh.position.set(-dist, fY, 0);

    flightMesh.rotation.y = fAngle;
    flightMesh.rotation.z = 0.08; // subtle incline
    flightMesh.castShadow = true;
    flightMesh.receiveShadow = true;
    internalRampGroup.add(flightMesh);

    // Warm amber interior lantern on every 3rd ramp turn
    if (f % 3 === 0) {
      const lanternGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const lanternMat = new THREE.MeshBasicMaterial({ color: 0xffaa44 });
      const lanternMesh = new THREE.Mesh(lanternGeo, lanternMat);
      lanternMesh.position.set(flightMesh.position.x, fY + 1.2, flightMesh.position.z);
      internalRampGroup.add(lanternMesh);

      const lampLight = new THREE.PointLight(0xff9933, 0.8, 6, 2);
      lampLight.position.copy(lanternMesh.position);
      internalRampGroup.add(lampLight);
    }
  }

  // 7. SOFT CONTACT SHADOW ON THE GROUND (flush with ground at y=0.01)
  const shadowTex = createContactShadowTexture();
  const shadowGeo = new THREE.PlaneGeometry(baseWidth * 2.8, baseWidth * 2.8);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = 0.02;
  group.add(contactShadow);

  // 8. 3D ARCHITECTURAL DIMENSION MARKERS (Height 44m, Width 16m)
  const createDimensionLine = (
    start: THREE.Vector3,
    end: THREE.Vector3,
    colorHex: number,
    labelMesh?: THREE.Object3D
  ) => {
    const dGroup = new THREE.Group();
    const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
    const lineMat = new THREE.LineBasicMaterial({
      color: colorHex,
      linewidth: 2,
      depthTest: false,
    });
    const line = new THREE.Line(lineGeo, lineMat);
    dGroup.add(line);

    // End caps
    const capGeo = new THREE.SphereGeometry(0.35, 12, 12);
    const capMat = new THREE.MeshBasicMaterial({ color: colorHex, depthTest: false });
    const cap1 = new THREE.Mesh(capGeo, capMat);
    cap1.position.copy(start);
    const cap2 = new THREE.Mesh(capGeo, capMat);
    cap2.position.copy(end);
    dGroup.add(cap1, cap2);

    if (labelMesh) {
      labelMesh.position.lerpVectors(start, end, 0.5);
      dGroup.add(labelMesh);
    }

    return dGroup;
  };

  // Height line (44m) on the west flank
  const heightStart = new THREE.Vector3(-baseWidth / 2 - 3.5, 0, 0);
  const heightEnd = new THREE.Vector3(-baseWidth / 2 - 3.5, totalHeight, 0);
  const heightLine = createDimensionLine(heightStart, heightEnd, 0xd4af37);
  dimensionMarkersGroup.add(heightLine);

  // Base width line (16m) in front of north side
  const baseStart = new THREE.Vector3(-baseWidth / 2, 0.5, baseWidth / 2 + 3.0);
  const baseEnd = new THREE.Vector3(baseWidth / 2, 0.5, baseWidth / 2 + 3.0);
  const baseLine = createDimensionLine(baseStart, baseEnd, 0x38bdf8);
  dimensionMarkersGroup.add(baseLine);

  dimensionMarkersGroup.visible = false; // toggled by UI

  // Cutaway controller: smoothly lifts or slides sections to inspect the interior
  const setCutawayProgress = (progress: number) => {
    // Lift upper tier and crown upward
    const liftDistance = progress * 16;
    upperTierGroup.position.y = liftDistance * 0.8;
    unfinishedTopGroup.position.y = liftDistance;

    // Shift the south/north walls slightly to expose inner ramp core
    lowerShaft.children.forEach((wall, idx) => {
      if (idx === 1) {
        // South wall
        wall.position.z = (baseWidth / 2 - wallThickness / 2) + progress * 8;
      }
    });
  };

  const setDimensionsVisible = (visible: boolean) => {
    dimensionMarkersGroup.visible = visible;
  };

  const update = (_time: number) => {
    // Subtle procedural updates if needed
  };

  return {
    group,
    baseGroup,
    shaftGroup,
    upperTierGroup,
    unfinishedTopGroup,
    internalRampGroup,
    dimensionMarkersGroup,
    contactShadow,
    setCutawayProgress,
    setDimensionsVisible,
    update,
  };
}
