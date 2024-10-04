import Experience from "../Experience";
import * as THREE from "three";

import Room from "./Room";
import Floor from "./Floor";
import Controls from "./Controls";
import Environment from "./Environment";
import { EventEmitter } from "events";

export default class World extends EventEmitter {
  //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes; //Esto viene de Experience.js, que a su vez viene de Sizes.js
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources; //Esto viene de: Experience.js -> " this.resources = new Resources(assets);"
    this.theme = this.experience.theme;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.floor = new Floor();
      this.room = new Room();
      //this.controls = new Controls(); ACÁ ESTABA EL PROBLEMA DE QUE SE BUGEABA LA PANTALLA
      this.emit("worldready");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
