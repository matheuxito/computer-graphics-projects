/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Kemal Çolak (https://sketchfab.com/kemalcolak)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/aerobatic-airplane-6bdb6d7c221b463c8943a1d58c13f96f
Title: Aerobatic Airplane
*/

import React, { useRef } from 'react';
import { Matrix4, Quaternion, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import AirplaneModel from '../../assets/models/airplane.glb';
import { turbo, updatePlaneAxis } from '../../utils/controls.js';

type GLTFResult = GLTF & {
  nodes: {
    Body_body_0: THREE.Mesh;
    Body_body_front_0: THREE.Mesh;
    Body_whell_black_0: THREE.Mesh;
    Body_body_blue_0: THREE.Mesh;
    Body_cocpit_black_0: THREE.Mesh;
    Engine_body_blue_0: THREE.Mesh;
    Engine_engine_metalic_0: THREE.Mesh;
  };
  materials: {
    body: THREE.MeshStandardMaterial;
    body_front: THREE.MeshStandardMaterial;
    whell_black: THREE.MeshStandardMaterial;
    body_blue: THREE.MeshStandardMaterial;
    cocpit_black: THREE.MeshStandardMaterial;
    engine_metalic: THREE.MeshStandardMaterial;
  };
};

const x = new Vector3(1, 0, 0);
const y = new Vector3(0, 1, 0);
const z = new Vector3(0, 0, 1);
const planePosition = new Vector3(0, 3, 7);

const resetPlaneAxis = (): void => {
  x.set(1, 0, 0);
  y.set(0, 1, 0);
  z.set(0, 0, 1);
  planePosition.set(0, 3, 7);
};

const delayedRotMatrix = new Matrix4();
const delayedQuaternion = new Quaternion();

const Airplane = (props: JSX.IntrinsicElements['group']) => {
  const { nodes, materials } = useGLTF(AirplaneModel) as GLTFResult;

  const airplaneRef = useRef<THREE.Group>(null!);
  const helixMeshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ camera }) => {
    if (planePosition.x > 8 || planePosition.x < -8) {
      resetPlaneAxis();
    }
    if (planePosition.z > 8 || planePosition.z < -8) {
      resetPlaneAxis();
    }
    if (planePosition.y > 10 || planePosition.y < 1) {
      resetPlaneAxis();
    }

    updatePlaneAxis(x, y, z, planePosition, camera);

    const rotMatrix = new Matrix4().makeBasis(x, y, z);

    const matrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(rotMatrix);

    airplaneRef.current.matrixAutoUpdate = false;
    airplaneRef.current.matrix.copy(matrix);
    airplaneRef.current.matrixWorldNeedsUpdate = true;

    const quaternionA = new Quaternion().copy(delayedQuaternion);
    const quaternionB = new Quaternion().setFromRotationMatrix(rotMatrix);

    const interpolationFactor = 0.175;
    const interpolatedQuaternion = new Quaternion()
      .copy(quaternionA)
      .slerp(quaternionB, interpolationFactor);
    delayedQuaternion.copy(interpolatedQuaternion);

    delayedRotMatrix.identity().makeRotationFromQuaternion(delayedQuaternion);

    const cameraMatrix = new Matrix4()
      .multiply(
        new Matrix4().makeTranslation(
          planePosition.x,
          planePosition.y,
          planePosition.z
        )
      )
      .multiply(delayedRotMatrix)
      .multiply(new Matrix4().makeRotationX(-0.02))
      .multiply(new Matrix4().makeTranslation(0, 0.065, 0.5));

    camera.matrixAutoUpdate = false;
    camera.matrix.copy(cameraMatrix);
    camera.matrixWorldNeedsUpdate = true;

    let helixVelocity = turbo > 0.5 ? 1 : 0.3;
    helixVelocity *= 0.95;
    helixMeshRef.current.rotation.x -= helixVelocity;
  });

  return (
    <group ref={airplaneRef}>
      <group
        {...props}
        dispose={null}
        scale={[0.01, 0.01, 0.01]}
        rotation-y={Math.PI / 2}
      >
        <group position={[0.116, -0.132, 0]} rotation={[0, 0, 0.164]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_body_0.geometry}
            material={materials.body}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_body_front_0.geometry}
            material={materials.body_front}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_whell_black_0.geometry}
            material={materials.whell_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_body_blue_0.geometry}
            material={materials.body_blue}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_cocpit_black_0.geometry}
            material={materials.cocpit_black}
          />
        </group>
        <group position={[4.557, 4.488, -0.011]} rotation={[0, 0, 0.3]}>
          <mesh
            ref={helixMeshRef}
            castShadow
            receiveShadow
            geometry={nodes.Engine_body_blue_0.geometry}
            material={materials.body_blue}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Engine_engine_metalic_0.geometry}
            material={materials.engine_metalic}
          />
        </group>
      </group>
    </group>
  );
};

export { planePosition, Airplane };

useGLTF.preload(AirplaneModel);
