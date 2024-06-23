import Experience from "../Experience";
import * as THREE from 'three';

import Room from "./Room";
import Environment from "./Environment";

export default class World {
    //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes; //Esto viene de Experience.js, que a su vez viene de Sizes.js
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources; //Esto viene de: Experience.js -> " this.resources = new Resources(assets);"
        
        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.room = new Room();
        });
    }

    resize(){
        
    }

    update(){
        
    }
}