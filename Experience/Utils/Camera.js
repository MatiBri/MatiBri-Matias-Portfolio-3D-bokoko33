import Experience from "../Experience";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera{
    //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes; //Esto viene de Experience.js, que a su vez viene de Sizes.js
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrtographicCamera(); //Esta es la que estoy usando
        this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 5;
    }

    createOrtographicCamera(){
        this.frustrum = 5;
        //Los parámetros de la cámara ortográfica representan los ángulos de la función resize (left, right, top y bottom)
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100
        );
        this.scene.add(this.orthographicCamera)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;

    }

    //Funcion para cambiar el tamaño de las camaras
    resize(){
        //Actualiza la perspectiva de la cámara al cambiar el tamaño
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()

        //Actualiza el ángulo ortográfico de la cámara al cambiar el tamaño
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix()
    }

    update(){
        this.controls.update();
    }
}