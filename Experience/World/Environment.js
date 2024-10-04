import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import GUI from "lil-gui";
import { color } from "three/examples/jsm/nodes/Nodes.js";

export default class Environment {
  //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    //Carga del modelo glb que importamos
    //this.resources = this.experience.resources;

    //Uso de lil-gui para los colores del botón de Dark/Light mode
     //this.gui = new GUI({ container: document.querySelector(".hero-main") });
    this.obj = {
      colorObj: { r: 0, g: 0, b: 0 },
      intensity: 3,
    };

    this.setSunlight();
     //this.setGUI();
  }

  setGUI() {
    this.gui.addColor(this.obj, "colorObj").onChange(() => {
      this.sunLight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      //console.log(this.obj.colorObj);
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
      this.sunLight.intensity = this.obj.intensity;
      this.ambientLight.intensity = this.obj.intensity;
    });
  }

  setSunlight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    //Prueba para ver la luz de donde viene. Con eso puedo ver de donde viene la luz y donde proyecta las sombras
    // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
    // this.scene.add(helper);
    //
    this.sunLight.position.set(-1.5, 7, 3); //Si yo ajusto la luz acá, la CameraHelper se actualiza y mueve la luz hacia otra posición
    this.scene.add(this.sunLight);

    //Casteo de luz para las sombras de los objetos
    this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunLight.color, {
        r: 0.1843137254901961,
        g: 0.3411764705882353,
        b: 0.8156862745098039,
      });
      GSAP.to(this.ambientLight.color, {
        r: 0.1843137254901961,
        g: 0.3411764705882353,
        b: 0.8156862745098039,
      });
      GSAP.to(this.sunLight, {
        intensity: 0.78,
      });
      GSAP.to(this.ambientLight, {
        intensity: 0.78,
      });
    } else {
      GSAP.to(this.sunLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      GSAP.to(this.sunLight, {
        intensity: 3,
      });
      GSAP.to(this.ambientLight, {
        intensity: 3,
      });
    }
  }

  resize() {}

  update() {}
}
