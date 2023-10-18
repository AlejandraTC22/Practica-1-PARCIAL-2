export class Almacen {
    constructor() {
        this.productosDisponibles = [];
        this.productosRetirados = [];
    }

    agregarProducto(producto) {
        this.productosDisponibles.push(producto);
    }

    eliminarCantidadProducto(producto, cantidad) {
        const index = this.productosDisponibles.indexOf(producto);
        if (index !== -1) {
            const productoEnAlmacen = this.productosDisponibles[index];

            if (cantidad < productoEnAlmacen.cantidad) {
                productoEnAlmacen.cantidad -= cantidad;
            } else {
                this.productosDisponibles.splice(index, 1);
                productoEnAlmacen.cantidad = 0;
                this.productosRetirados.push(producto);
            }
        }
    }

}