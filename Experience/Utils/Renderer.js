import Experience from "../Experience";
import * as THREE from 'three';

export default class Renderer {
    //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes; //Esto viene de Experience.js, que a su vez viene de Sizes.js
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        console.log(this.camera, this.camera.perspectiveCamera);

        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas, //El canvas de Experience.js
            antialias: true,
        });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.SRGBColorSpace //En la versión 1.5.2 se actualizó sRGBEncoding a SRGBColorSpace
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        //this.camera apunta a la clase de arriba en el constructor
        this.renderer.render(this.scene, this.camera.perspectiveCamera)
    }
}