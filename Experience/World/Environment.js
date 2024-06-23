import Experience from "../Experience";
import * as THREE from 'three';

export default class Environment {
    //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        //Carga del modelo glb que importamos
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        //Prueba para ver la luz de donde viene. Con eso puedo ver de donde viene la luz y donde proyecta las sombras
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        //
        this.sunLight.position.set(1.5, 7, 3); //Si yo ajusto la luz acá, la CameraHelper se actualiza y mueve la luz hacia otra posición
        this.scene.add(this.sunLight);

        //Casteo de luz para las sombras de los objetos
        this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
        this.scene.add(this.ambientLight);
    }

    resize(){
        
    }

    update(){
        
    }
}