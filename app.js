import Producto from './producto.js';
import { Almacen } from './almacen.js';

const almacen = new Almacen();
const availableProductsList = document.getElementById('available-products');
const removedProductsList = document.getElementById('removed-products');
const totalAddedElement = document.getElementById('total-added');
const totalRemovedElement = document.getElementById('total-removed');

let totalAgregados = 0;
let totalRetirados = 0;

const addProductButton = document.getElementById('add-product');

addProductButton.addEventListener('click', () => {
    const producto = new Producto();
    almacen.agregarProducto(producto);
    totalAgregados++;

    const listItem = document.createElement('li');
    const productoInfo = document.createElement('span');
    productoInfo.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toFixed(2)}`;
    const eliminarButton = document.createElement('button');
    eliminarButton.textContent = 'Eliminar';

    listItem.appendChild(productoInfo);
    listItem.appendChild(eliminarButton);
    availableProductsList.appendChild(listItem);

    eliminarButton.addEventListener('click', () => {
        const cantidadAEliminar = parseInt(prompt(`Cantidad a eliminar de ${producto.nombre}:`, 1));

        if (!isNaN(cantidadAEliminar) && cantidadAEliminar > 0) {
            if (cantidadAEliminar <= producto.cantidad) {
                producto.cantidad -= cantidadAEliminar;
                productoInfo.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio.toFixed(2)}`;
            } else {
                alert('La cantidad es insuficiente. No se pueden retirar más productos de los disponibles.');
            }

            if (producto.cantidad === 0) {
                totalAgregados--;
                totalRetirados++;
                const removedListItem = listItem.cloneNode(true);
                listItem.removeChild(eliminarButton);
                availableProductsList.removeChild(listItem);

                // Clonar el nodo sin el botón y agregarlo a la lista de retirados
                const removedListItemWithoutButton = removedListItem.cloneNode(true);
                removedListItemWithoutButton.removeChild(removedListItemWithoutButton.querySelector('button'));
                removedProductsList.appendChild(removedListItemWithoutButton);
            }
        }
        actualizarTotales();
    });

    actualizarTotales();
});
function actualizarTotales() {
    totalAddedElement.textContent = totalAgregados;
    totalRemovedElement.textContent = totalRetirados;
}