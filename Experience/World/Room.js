import Experience from "../Experience";
import * as THREE from 'three';

export default class Room {
    //La camara necesita  el tamaño y la escena. Esta las traigo de Experience.js
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        //Carga del modelo glb que importamos
        this.resources = this.experience.resources;
        this.room = this.resources.items.room; //Obtenemos el objeto ítem de Resources de la funcion singleAssetLoaded del arreglo [asset.name]
        this.actualRoom = this.room.scene;

        this.setModel();
    }

    setModel(){
        this.scene.add(this.actualRoom);
    }

    resize(){
        
    }

    update(){
        
    }
}