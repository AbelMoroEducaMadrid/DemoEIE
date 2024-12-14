// secciones/productos.js

// Simulación de datos de productos
const productos = [
    { id: 101, nombre: "Producto A", precio: "$10" },
    { id: 102, nombre: "Producto B", precio: "$15" }
];

// Mostrar productos
function mostrarProductos() {
    const tablaProductos = document.getElementById('tabla-productos');
    tablaProductos.innerHTML = productos.map(producto =>
        `<tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>`).join('');
}

// Inicializar la sección de productos
mostrarProductos();
