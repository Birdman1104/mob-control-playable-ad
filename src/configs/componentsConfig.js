import { Vector3 } from "three";

export const TowerConfig = Object.freeze({
  position: { x: -9, y: 0.275, z: 2 },
  rotation: new Vector3(0, Math.PI / 2, 0),
  scale: new Vector3(1, 1, 1),
});

export const CannonConfig = Object.freeze({
  position: { x: 8, y: 0.25, z: 0 },
  rotation: { x: 0, y: Math.PI / 2, z: 0 },
  scale: { x: 1, y: 1, z: 1 },
  minZ: -1.75,
  maxZ: 1.75,
});

export const GroundConfig = Object.freeze({
  color: 0x9e6136,
  roadSize: { x: 4, y: 19, z: 0.5 },
  road: {
    rotation: { x: Math.PI / 2, y: 0, z: Math.PI / 2 },
    position: { x: 0, y: 0, z: 0 },
  },

  circleSize: { radius: 4, height: 0.5, segments: 32 },
  circle1: {
    position: { x: -10, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
  },
  circle2: {
    position: { x: 10, y: 0, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
  },
});

