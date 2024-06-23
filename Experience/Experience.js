import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Resources from './Utils/Resources';
import assets from './Utils/assets';

import Camera from './Utils/Camera';
import Renderer from './Utils/Renderer';

import World from './World/World';

export default class Experience{
    static instance
    constructor(canvas){
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();

        this.sizes.on("resize", ()=>{
            this.resize();
        });
        this.time.on("update", ()=>{
            this.update();
        });
    }

    resize(){
        this.camera.resize(); //Este llama a la funcion update en Camara.js
        this.renderer.resize(); //Este llama a la funcion update en Renderer.js
    }
    update(){
        this.camera.update(); //Este llama a la funcion update en Camara.js
        this.renderer.update(); //Este llama a la funcion update en Renderer.js
    }
}