import Experience from "../Experience";
import * as THREE from "three";

export default class Room {
  //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    //Carga del modelo glb que importamos
    this.resources = this.experience.resources;
    this.room = this.resources.items.room; //Obtenemos el objeto ítem de Resources de la funcion singleAssetLoaded del arreglo [asset.name]
    this.actualRoom = this.room.scene;

    this.setModel();
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

      if (child.name === "Material.010") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x279fdd);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }

      //Los Strings son referencia al nombre de los materiales con los que fueron llamados en Blender
      if (child.name === "Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen, //Y esto es referencia al nombre que asigné a los assets en assets.js
          //Entonces, items.screen, llamo al nombre que le puse en assets.js desde la clase Resources.js, en el arreglo de
          //this.items[asset.name]
        });
      }
      if (child.name === "TVVideo") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.foo, //Y esto es referencia al nombre que asigné a los assets en assets.js
          //Entonces, items.screen, llamo al nombre que le puse en assets.js desde la clase Resources.js, en el arreglo de
          //this.items[asset.name]
        });
      }
    });
    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
    this.actualRoom.rotation.y = Math.PI;
  }

  resize() {}

  update() {}
}
