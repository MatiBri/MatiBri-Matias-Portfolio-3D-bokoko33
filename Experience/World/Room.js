import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

export default class Room {
  //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    //Carga del modelo glb que importamos
    this.resources = this.experience.resources;
    this.room = this.resources.items.room; //Obtenemos el objeto ítem de Resources de la funcion singleAssetLoaded del arreglo [asset.name]
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      //Seteo de sombras para los objetos
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      console.log(child);

      // if (child.name === "Material.010") {
      //   child.material = new THREE.MeshPhysicalMaterial();
      //   child.material.roughness = 0;
      //   child.material.color.set(0x279fdd);
      //   child.material.ior = 3;
      //   child.material.transmission = 1;
      //   child.material.opacity = 1;
      // }

      //Los Strings son referencia al nombre de los materiales con los que fueron llamados en Blender
      // if (child.name === "Screen") {
      //   child.material = new THREE.MeshBasicMaterial({
      //     map: this.resources.items.screen, //Y esto es referencia al nombre que asigné a los assets en assets.js
      //     //Entonces, items.screen, llamo al nombre que le puse en assets.js desde la clase Resources.js, en el arreglo de
      //     //this.items[asset.name]
      //   });
      // }
      // if (child.name === "TVVideo") {
      //   child.material = new THREE.MeshBasicMaterial({
      //     map: this.resources.items.foo, //Y esto es referencia al nombre que asigné a los assets en assets.js
      //     //Entonces, items.screen, llamo al nombre que le puse en assets.js desde la clase Resources.js, en el arreglo de
      //     //this.items[asset.name]
      //   });
      // }
      if (child.name === "Mini_Floor") {
        child.position.x = 2.11095;
        child.position.z = -8.18447;
      }

      // if (
      //   child.name === "Mailbox" ||
      //   child.name === "Databases002" ||
      //   child.name === "Software002" ||
      //   child.name === "UI_UX002"
      // ) {
      //   child.scale.set(0, 0, 0);
      // }

      child.scale.set(0, 0, 0);
      if (child.name === "Cube") {
        //child.scale.set(1, 1, 1);
        child.position.set(0, -1.5, 0);
        child.rotation.y = Math.PI / 4;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    //Luz de la lámpara al lado de la computadora
    const width = 0.5;
    const height = 0.7;
    const intensity = 1;
    const rectLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height
    );
    rectLight.position.set(0.284901, 6.02545, 0.5);
    //rectLight.rotation.x = Math.PI / 2;
    //rectLight.rotation.z = Math.PI / 4;
    //rectLight.lookAt(0, 0, 0);
    this.actualRoom.add(rectLight);

    this.roomChildren["rectLight"] = rectLight;
    // const rectLightHelper = new RectAreaLightHelper(rectLight);
    // rectLight.add(rectLightHelper);
    //

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
    this.actualRoom.rotation.y = Math.PI;
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      //console.log(e);
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
