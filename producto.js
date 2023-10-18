export default class Producto {
    constructor() {
        this.cantidad = Math.floor(Math.random() * 10) + 1;
        this.precio = parseFloat((Math.random() * 100).toFixed(2));
        this.nombre = `Producto${Producto.contador++}`;
    }
}
Producto.contador = 1;