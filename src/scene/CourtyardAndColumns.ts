import * as THREE from 'three';
import {
  createMarblePlazaTexture,
  createZellijTexture,
  createSandstoneTexture,
  createStoneBumpMap,
} from '../utils/proceduralTextures.ts';

export interface CourtyardParts {
  group: THREE.Group;
  columnsMesh: THREE.InstancedMesh;
  fountainMesh: THREE.Group;
  mausoleumGroup: THREE.Group;
  mihrabGroup: THREE.Group;
  perimeterWallsGroup: THREE.Group;
  palmsGroup: THREE.Group;
  update: (time: number) => void;
}

export function createCourtyardAndSurroundings(): CourtyardParts {
  const group = new THREE.Group();
  group.name = 'CourtyardAndSurroundings';

  // Procedural textures
  const marbleTex = createMarblePlazaTexture(512, 512);
  marbleTex.repeat.set(24, 24);

  const zellijTex = createZellijTexture(512, 512);
  zellijTex.repeat.set(4, 4);

  const stoneTex = createSandstoneTexture(512, 512);
  stoneTex.repeat.set(4, 2);

  const stoneBump = createStoneBumpMap(512, 512);
  stoneBump.repeat.set(4, 2);

  // Materials
  const marbleMat = new THREE.MeshStandardMaterial({
    map: marbleTex,
    roughness: 0.45,
    metalness: 0.1,
    color: new THREE.Color(0xf3ece0),
  });

  const columnStoneMat = new THREE.MeshStandardMaterial({
    roughness: 0.85,
    metalness: 0.05,
    color: new THREE.Color(0xd7ba9d),
  });

  const wallMat = new THREE.MeshStandardMaterial({
    map: stoneTex,
    bumpMap: stoneBump,
    bumpScale: 0.08,
    roughness: 0.9,
    metalness: 0.05,
    color: new THREE.Color(0xaf5b38),
  });

  const zellijMat = new THREE.MeshStandardMaterial({
    map: zellijTex,
    roughness: 0.25,
    metalness: 0.2,
  });

  const waterMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0e7490),
    roughness: 0.1,
    metalness: 0.8,
  });

  // 1. GRAND ESPLANADE PLAZA FLOOR
  // 183m x 139m authentic Almohad mosque courtyard footprint + surrounding buffer
  const plazaGeo = new THREE.PlaneGeometry(220, 260);
  const plazaMesh = new THREE.Mesh(plazaGeo, marbleMat);
  plazaMesh.rotation.x = -Math.PI / 2;
  plazaMesh.position.set(0, 0, 45); // Centered relative to the minaret at 0,0,0
  plazaMesh.receiveShadow = true;
  group.add(plazaMesh);

  // Raised Prayer Hall Terrace Floor (elevated by 0.15m to avoid Z-fighting)
  const terraceGeo = new THREE.BoxGeometry(110, 0.25, 130);
  const terraceMat = new THREE.MeshStandardMaterial({
    map: marbleTex,
    roughness: 0.55,
    metalness: 0.08,
    color: new THREE.Color(0xe5dcce),
  });
  const terraceMesh = new THREE.Mesh(terraceGeo, terraceMat);
  terraceMesh.position.set(0, 0.12, 75);
  terraceMesh.receiveShadow = true;
  group.add(terraceMesh);

  // 2. THE FOREST OF 348 COLUMNS (غابة الأعمدة الأثرية)
  // Historical Almohad hypostyle hall layout: 21 aisles, rows of cylindrical stone columns
  // We place 348 column drums of varied preserved historical heights using InstancedMesh
  const totalColumns = 348;
  const colBaseGeo = new THREE.CylinderGeometry(0.55, 0.65, 1, 16);
  // Center cylinder geometry bottom at 0
  colBaseGeo.translate(0, 0.5, 0);

  const columnsMesh = new THREE.InstancedMesh(colBaseGeo, columnStoneMat, totalColumns);
  columnsMesh.castShadow = true;
  columnsMesh.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();

  // Grid distribution inside the prayer hall
  // 21 columns east-west, 17 rows north-south = ~357 slots, 348 placed
  const colsX = 21;
  const rowsZ = 17;
  const spacingX = 4.8;
  const spacingZ = 6.8;
  const startX = -((colsX - 1) * spacingX) / 2;
  const startZ = 22; // In front of the tower

  let instanceIdx = 0;
  for (let r = 0; r < rowsZ && instanceIdx < totalColumns; r++) {
    for (let c = 0; c < colsX && instanceIdx < totalColumns; c++) {
      // Historical irregularities: some columns broken at 1.4m, some at 3.5m, some with capitals
      const isMissing = Math.random() < 0.04;
      if (isMissing) continue;

      const posX = startX + c * spacingX + (Math.random() - 0.5) * 0.1;
      const posZ = startZ + r * spacingZ + (Math.random() - 0.5) * 0.1;

      // Varied historical height from 1.2m to 3.8m
      const height = 1.3 + Math.random() * 2.4;
      dummy.position.set(posX, 0.25, posZ);
      dummy.scale.set(1, height, 1);
      dummy.rotation.y = (c + r) * 0.3;
      dummy.updateMatrix();

      columnsMesh.setMatrixAt(instanceIdx, dummy.matrix);

      // Weathering color tint variation (calcarenite ochre / warm beige / limestone gray)
      const tintSeed = Math.random();
      if (tintSeed < 0.4) {
        color.setHex(0xd6ba9e); // warm ochre
      } else if (tintSeed < 0.75) {
        color.setHex(0xcab395); // weathered beige
      } else {
        color.setHex(0xbfa585); // darker aged stone
      }
      columnsMesh.setColorAt(instanceIdx, color);

      instanceIdx++;
    }
  }

  // Fill any remaining to exact 348 count
  while (instanceIdx < totalColumns) {
    dummy.position.set(0, -100, 0); // offscreen
    dummy.scale.set(0, 0, 0);
    dummy.updateMatrix();
    columnsMesh.setMatrixAt(instanceIdx, dummy.matrix);
    instanceIdx++;
  }

  columnsMesh.instanceMatrix.needsUpdate = true;
  if (columnsMesh.instanceColor) columnsMesh.instanceColor.needsUpdate = true;
  columnsMesh.computeBoundingSphere();
  group.add(columnsMesh);

  // 3. THE GREAT MIHRAB & QIBLA WALL (المحراب وجدار القبلة التاريخي)
  const mihrabGroup = new THREE.Group();
  const qiblaZ = startZ + rowsZ * spacingZ + 5;

  // Qibla wall foundation
  const qiblaWallGeo = new THREE.BoxGeometry(112, 3.5, 2.5);
  const qiblaWall = new THREE.Mesh(qiblaWallGeo, wallMat);
  qiblaWall.position.set(0, 1.75, qiblaZ);
  qiblaWall.castShadow = true;
  qiblaWall.receiveShadow = true;
  mihrabGroup.add(qiblaWall);

  // Central horseshoe mihrab alcove
  const mihrabAlcoveGeo = new THREE.CylinderGeometry(2.5, 2.5, 5, 24, 1, false, 0, Math.PI);
  const mihrabAlcove = new THREE.Mesh(mihrabAlcoveGeo, wallMat);
  mihrabAlcove.position.set(0, 2.5, qiblaZ + 0.5);
  mihrabAlcove.rotation.y = Math.PI;
  mihrabAlcove.castShadow = true;
  mihrabGroup.add(mihrabAlcove);

  // Mihrab arch border
  const mihrabArchBorder = new THREE.Mesh(
    new THREE.TorusGeometry(2.5, 0.4, 8, 24, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.4, metalness: 0.6 })
  );
  mihrabArchBorder.position.set(0, 5.0, qiblaZ - 1.25);
  mihrabGroup.add(mihrabArchBorder);

  group.add(mihrabGroup);

  // 4. MOROCCAN STAR ABLUTION FOUNTAIN (الفسقية وصهريج الوضوء الموحدي)
  const fountainMesh = new THREE.Group();
  const fX = 0;
  const fZ = -22; // In northern courtyard before the tower

  // Octagonal outer stone curb
  const basinOuterGeo = new THREE.CylinderGeometry(6.5, 7.0, 1.2, 8);
  const basinOuter = new THREE.Mesh(basinOuterGeo, marbleMat);
  basinOuter.position.y = 0.6;
  basinOuter.castShadow = true;
  basinOuter.receiveShadow = true;
  fountainMesh.add(basinOuter);

  // Inner zellij lining
  const basinInnerGeo = new THREE.CylinderGeometry(5.4, 5.4, 0.8, 8);
  const basinInner = new THREE.Mesh(basinInnerGeo, zellijMat);
  basinInner.position.y = 0.7;
  fountainMesh.add(basinInner);

  // Water surface
  const waterGeo = new THREE.CylinderGeometry(5.2, 5.2, 0.05, 8);
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.y = 0.95;
  fountainMesh.add(waterMesh);

  // Central fountain carved stone spout & pedestal
  const spoutPedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.4, 1.8, 8),
    marbleMat
  );
  spoutPedestal.position.y = 1.4;
  spoutPedestal.castShadow = true;
  fountainMesh.add(spoutPedestal);

  const upperBowl = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 0.8, 0.6, 8),
    marbleMat
  );
  upperBowl.position.y = 2.2;
  upperBowl.castShadow = true;
  fountainMesh.add(upperBowl);

  fountainMesh.position.set(fX, 0, fZ);
  group.add(fountainMesh);

  // 5. MAUSOLEUM OF MOHAMMED V (ضريح محمد الخامس)
  // Stands majestically at the southern end of the esplanade
  const mausoleumGroup = new THREE.Group();
  const mauZ = qiblaZ + 38;

  // Raised marble platform with stepped access
  const mauBaseGeo = new THREE.BoxGeometry(42, 2.5, 42);
  const mauBaseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xfbfbf9),
    roughness: 0.35,
    metalness: 0.1,
  });
  const mauBase = new THREE.Mesh(mauBaseGeo, mauBaseMat);
  mauBase.position.y = 1.25;
  mauBase.castShadow = true;
  mauBase.receiveShadow = true;
  mausoleumGroup.add(mauBase);

  // White Italian marble cubic structure
  const mauBodyGeo = new THREE.BoxGeometry(26, 12, 26);
  const mauBody = new THREE.Mesh(mauBodyGeo, mauBaseMat);
  mauBody.position.y = 2.5 + 6;
  mauBody.castShadow = true;
  mauBody.receiveShadow = true;
  mausoleumGroup.add(mauBody);

  // Horseshoe arched portals and colonnade on 4 sides of the mausoleum
  const mauColGeo = new THREE.CylinderGeometry(0.35, 0.35, 10, 16);
  for (let s = 0; s < 4; s++) {
    const rot = (s * Math.PI) / 2;
    for (let c = -3; c <= 3; c++) {
      const col = new THREE.Mesh(mauColGeo, mauBaseMat);
      col.position.set(c * 3.4, 2.5 + 5, 14.5);
      col.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rot);
      col.castShadow = true;
      mausoleumGroup.add(col);
    }
  }

  // Iconic Emerald Green Pyramidal Roof (السقف الهرمي الأخضر القرميدي الشهير)
  const roofHeight = 8.5;
  const roofGeo = new THREE.ConeGeometry(20, roofHeight, 4);
  const roofMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0f5638), // Moroccan emerald green tile
    roughness: 0.3,
    metalness: 0.25,
  });
  const roofMesh = new THREE.Mesh(roofGeo, roofMat);
  roofMesh.position.y = 2.5 + 12 + roofHeight / 2;
  roofMesh.rotation.y = Math.PI / 4;
  roofMesh.castShadow = true;
  mausoleumGroup.add(roofMesh);

  // Golden finial & crescent at apex
  const finialGeo = new THREE.CylinderGeometry(0.15, 0.25, 3.5, 8);
  const finialMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xd4af37),
    metalness: 0.9,
    roughness: 0.2,
  });
  const finialMesh = new THREE.Mesh(finialGeo, finialMat);
  finialMesh.position.y = 2.5 + 12 + roofHeight + 1.75;
  mausoleumGroup.add(finialMesh);

  const crescentGeo = new THREE.TorusGeometry(0.8, 0.15, 8, 24, Math.PI * 1.4);
  const crescent = new THREE.Mesh(crescentGeo, finialMat);
  crescent.position.y = 2.5 + 12 + roofHeight + 3.8;
  crescent.rotation.z = Math.PI * 0.3;
  mausoleumGroup.add(crescent);

  mausoleumGroup.position.set(0, 0, mauZ);
  group.add(mausoleumGroup);

  // 6. PERIMETER HISTORIC WALLS WITH MOORISH MERLONS (الأسوار التاريخية للموقع)
  const perimeterWallsGroup = new THREE.Group();
  const wallH = 4.5;
  const wallThick = 2.0;

  // East & West side perimeter walls
  const wallLen = 220;
  const sideEast = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, wallLen), wallMat);
  sideEast.position.set(70, wallH / 2, 45);
  sideEast.castShadow = true;
  sideEast.receiveShadow = true;

  const sideWest = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, wallLen), wallMat);
  sideWest.position.set(-70, wallH / 2, 45);
  sideWest.castShadow = true;
  sideWest.receiveShadow = true;

  perimeterWallsGroup.add(sideEast, sideWest);

  // Crenellations along perimeter walls
  const pMerlonGeo = new THREE.BoxGeometry(0.8, 0.9, 0.4);
  const pMerlonCount = 60;
  for (let m = 0; m < pMerlonCount; m++) {
    const mz = -55 + m * 3.4;
    const me1 = new THREE.Mesh(pMerlonGeo, wallMat);
    me1.position.set(70, wallH + 0.45, mz);
    const mw1 = new THREE.Mesh(pMerlonGeo, wallMat);
    mw1.position.set(-70, wallH + 0.45, mz);
    perimeterWallsGroup.add(me1, mw1);
  }

  group.add(perimeterWallsGroup);

  // 7. MOROCCAN DATE PALM GROVES (واحات النخيل المغربية)
  const palmsGroup = new THREE.Group();
  const palmCount = 18;
  const palmTrunkMat = new THREE.MeshStandardMaterial({
    color: 0x5a3e28,
    roughness: 0.9,
  });
  const palmFrondMat = new THREE.MeshStandardMaterial({
    color: 0x2e6631,
    roughness: 0.7,
  });

  const trunkGeo = new THREE.CylinderGeometry(0.28, 0.45, 9, 8);
  const frondGeo = new THREE.ConeGeometry(3.5, 1.2, 5);

  const palmLocations = [
    [-60, -30], [-55, -15], [-58, 10], [-56, 35], [-58, 60], [-55, 90],
    [60, -30], [55, -15], [58, 10], [56, 35], [58, 60], [55, 90],
    [-25, -45], [25, -45], [-35, 140], [35, 140], [-20, 160], [20, 160],
  ];

  palmLocations.forEach(([px, pz]) => {
    const pGroup = new THREE.Group();
    const trunk = new THREE.Mesh(trunkGeo, palmTrunkMat);
    trunk.position.y = 4.5;
    trunk.castShadow = true;
    pGroup.add(trunk);

    // Crown of fronds
    for (let f = 0; f < 7; f++) {
      const frond = new THREE.Mesh(frondGeo, palmFrondMat);
      frond.position.set(0, 9, 0);
      frond.rotation.z = 0.9 + Math.random() * 0.2;
      frond.rotation.y = (f / 7) * Math.PI * 2;
      frond.castShadow = true;
      pGroup.add(frond);
    }

    pGroup.position.set(px, 0, pz);
    palmsGroup.add(pGroup);
  });

  group.add(palmsGroup);

  const update = (time: number) => {
    // Subtle water surface shimmer
    waterMesh.rotation.y = time * 0.05;
  };

  return {
    group,
    columnsMesh,
    fountainMesh,
    mausoleumGroup,
    mihrabGroup,
    perimeterWallsGroup,
    palmsGroup,
    update,
  };
}
