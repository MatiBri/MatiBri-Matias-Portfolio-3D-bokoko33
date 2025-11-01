import { EventEmitter } from "events";

//Esta clase sirve para definir las medidas de la pantalla y detectar cambios en el tamaño de la ventana
//y el tipo de dispositivo (móvil o escritorio)
export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 5;
    if (this.width < 968) {
      this.device = "mobile";
    } else {
      this.device = "desktop";
    }

    window.addEventListener("resize", () => {
      //Cuando la pantalla cambie de tamaño
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize"); //Emite el evento "resize"

      if (this.width < 968 && this.device !== "mobile") {
        this.device = "mobile";
        this.emit("switchdevice", this.device);
        //console.log("mobile");
      } else if (this.width >= 968 && this.device !== "desktop") {
        this.device = "desktop";
        this.emit("switchdevice", this.device);
        //console.log("desktop");
      }
    });
  }
}