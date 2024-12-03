import Ammo from "ammo.js";
import * as THREE from "three";

class PhysicsHandler {
  constructor() {
    if (PhysicsHandler.instance) {
      return PhysicsHandler.instance;
    }

    this.initAmmoPhysics();

    PhysicsHandler.instance = this;
  }

  async initAmmoPhysics() {
    await Ammo;

    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const broadphase = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();

    this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);

    this.physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0));

    this.rigidBodies = [];
    this.transformAux1 = new Ammo.btTransform();
  }

  addPhysicsToMob(mob, mass, options = {}) {
    const { friction = 0.5, restitution = 0.1 } = options;

    mob.mesh.geometry.computeBoundingBox();
    const boundingBox = mob.mesh.geometry.boundingBox;
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    const halfExtents = new Ammo.btVector3(size.x / 2, size.y / 2, size.z / 2);
    const collisionShape = new Ammo.btBoxShape(halfExtents);

    const position = mob.mesh.position;
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z));

    const motionState = new Ammo.btDefaultMotionState(transform);

    const localInertia = new Ammo.btVector3(0, 0, 0);
    collisionShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, collisionShape, localInertia);
    const rigidBody = new Ammo.btRigidBody(rbInfo);

    rigidBody.setFriction(friction);
    rigidBody.setRestitution(restitution);

    this.physicsWorld.addRigidBody(rigidBody);

    mob.mesh.userData.physicsBody = rigidBody;

    this.rigidBodies.push(mob);
  }

  checkCollisions(callback) {
    const dispatcher = this.physicsWorld.getDispatcher();
    const numManifolds = dispatcher.getNumManifolds();

    for (let i = 0; i < numManifolds; i++) {
      const contactManifold = dispatcher.getManifoldByIndexInternal(i);
      const body0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
      const body1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);

      const numContacts = contactManifold.getNumContacts();
      for (let j = 0; j < numContacts; j++) {
        const pt = contactManifold.getContactPoint(j);
        if (pt.getDistance() < 0.0) {
          callback(body0, body1);
        }
      }
    }
  }

  removePhysicsFromMob(mob) {
    const body = mob.mesh.userData.physicsBody;
    if (body) {
      this.physicsWorld.removeRigidBody(body);

      const index = this.rigidBodies.indexOf(mob);
      if (index > -1) {
        this.rigidBodies.splice(index, 1);
      }

      Ammo.destroy(body.getMotionState());
      Ammo.destroy(body);
      delete mob.mesh.userData.physicsBody;
    }
  }

  update(deltaTime) {
    if (!this.physicsWorld) return;

    this.physicsWorld.stepSimulation(deltaTime, 10);

    for (let i = 0; i < this.rigidBodies.length; i++) {
      const mob = this.rigidBodies[i];
      const body = mob.mesh.userData.physicsBody;

      const motionState = body.getMotionState();
      if (motionState) {
        motionState.getWorldTransform(this.transformAux1);
        const position = this.transformAux1.getOrigin();
        const quaternion = this.transformAux1.getRotation();
        const pos = { x: position.x(), y: position.y(), z: position.z() };
        const quat = { x: quaternion.x(), y: quaternion.y(), z: quaternion.z(), w: quaternion.w() };

        mob.updatePosition(pos);
      }
    }

    this.checkCollisions((body0, body1) => {
      // console.log("Collision detected between:", body0, body1);
    });
  }
}

const PhysicsWorld = new PhysicsHandler();
export default PhysicsWorld;

