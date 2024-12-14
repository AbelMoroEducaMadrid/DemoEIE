// secciones/pedidos.js

// Simulación de datos de pedidos
const pedidos = [
    { id: 1, cliente: "Juan Pérez", estado: "Enviado" },
    { id: 2, cliente: "Ana Gómez", estado: "Pendiente" }
];

// Mostrar pedidos
function mostrarPedidos() {
    const tablaPedidos = document.getElementById('tabla-pedidos');
    tablaPedidos.innerHTML = pedidos.map(pedido =>
        `<tr>
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.estado}</td>
        </tr>`).join('');
}

// Inicializar la sección de pedidos
mostrarPedidos();
