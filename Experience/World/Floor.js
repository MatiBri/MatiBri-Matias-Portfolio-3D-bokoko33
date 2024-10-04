import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import { color } from "three/examples/jsm/nodes/Nodes.js";

export default class Floor {
  //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
    //this.onMouseMove();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 32);

    const material = new THREE.MeshStandardMaterial({ color: 0xe5a1aa }); //Uso MeshStandardd para recibir sombras
    const material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

    this.circleFirst = new THREE.Mesh(geometry, material);
    this.circleSecond = new THREE.Mesh(geometry, material2);
    this.circleThird = new THREE.Mesh(geometry, material3);
    
    this.circleFirst.position.y = -0.29;
    
    this.circleSecond.position.y = -0.28;
    this.circleSecond.position.x = 2;

    this.circleThird.position.y = -0.27;

    this.circleFirst.scale.set(0, 0, 0);
    this.circleSecond.scale.set(0, 0, 0);
    this.circleThird.scale.set(0, 0, 0);

    this.circleFirst.rotation.x =
      this.circleSecond.rotation.x =
      this.circleThird.rotation.x =
        -Math.PI / 2;

    this.circleFirst.receiveShadow =
    this.circleSecond.receiveShadow =
    this.circleThird.receiveShadow =
        true

    this.scene.add(this.circleFirst);
    this.scene.add(this.circleSecond);
    this.scene.add(this.circleThird);
  }

  resize() {}

  update() {}
}
