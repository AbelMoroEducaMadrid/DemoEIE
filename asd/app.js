// Datos simulados para pedidos y productos
const pedidos = [
    { id: 1, fecha: '2024-12-01', estado: 'Pendiente', cliente: 'Juan Pérez', total: 120 },
    { id: 2, fecha: '2024-12-02', estado: 'En proceso', cliente: 'Ana Gómez', total: 200 },
    { id: 3, fecha: '2024-12-03', estado: 'Entregado', cliente: 'Carlos Ruiz', total: 150 }
  ];
  
  const productos = [
    { id: 1, nombre: 'Martillo', cantidad: 10, precio: 15, estado: 'Disponible' },
    { id: 2, nombre: 'Clavos', cantidad: 50, precio: 2, estado: 'Disponible' },
    { id: 3, nombre: 'Sierra', cantidad: 5, precio: 30, estado: 'Agotado' }
  ];
  
  // Variables para los elementos del DOM
  const ventasHoy = document.getElementById('ventasHoy');
  const pedidosPendientes = document.getElementById('pedidosPendientes');
  const productosAgotados = document.getElementById('productosAgotados');
  const tareasImportantes = document.getElementById('tareasImportantes');
  const ventasChart = document.getElementById('ventasChart');
  
  // Función para actualizar los widgets en el dashboard
  function actualizarDashboard() {
    // Asegúrate de que los elementos existen antes de intentar modificar su contenido
    if (!ventasHoy || !pedidosPendientes || !productosAgotados || !tareasImportantes) {
      console.error('No se encontraron los elementos del DOM');
      return; // Detener la ejecución si los elementos no están disponibles
    }
  
    // Ventas del día (simulación)
    const ventasDelDia = pedidos.filter(pedido => pedido.estado === 'Entregado').reduce((total, pedido) => total + pedido.total, 0);
    ventasHoy.textContent = `Ventas del día: $${ventasDelDia}`;
  
    // Pedidos pendientes
    pedidosPendientes.textContent = `Pedidos pendientes: ${pedidos.filter(pedido => pedido.estado === 'Pendiente').length}`;
  
    // Productos agotados
    productosAgotados.textContent = `Productos agotados: ${productos.filter(producto => producto.estado === 'Agotado').length}`;
  
    // Tareas importantes (simulación)
    tareasImportantes.textContent = 'Reabastecer productos agotados.';
  }
  
  // Función para mostrar las estadísticas
  function mostrarEstadisticas() {
    const ctx = ventasChart.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
        datasets: [{
          label: 'Ventas por mes',
          data: [500, 700, 800, 600, 950],
          borderColor: '#4CAF50',
          fill: false
        }]
      }
    });
  }
  
  // Función para actualizar la tabla de pedidos
  function actualizarTablaPedidos() {
    const tablaPedidos = document.getElementById('tablaPedidos');
    tablaPedidos.innerHTML = ''; // Limpiar tabla antes de actualizar
  
    pedidos.forEach(pedido => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.fecha}</td>
        <td>${pedido.estado}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.total}</td>
        <td><button onclick="eliminarPedido(${pedido.id})">Eliminar</button></td>
      `;
      tablaPedidos.appendChild(tr);
    });
  }
  
  // Función para agregar un pedido
  function agregarPedido() {
    const fechaPedido = document.getElementById('fechaPedido').value;
    const estadoPedido = document.getElementById('estadoPedido').value;
    const clientePedido = document.getElementById('clientePedido').value;
    const totalPedido = parseFloat(document.getElementById('totalPedido').value);
  
    const nuevoPedido = {
      id: pedidos.length + 1,
      fecha: fechaPedido,
      estado: estadoPedido,
      cliente: clientePedido,
      total: totalPedido
    };
  
    pedidos.push(nuevoPedido);
    actualizarTablaPedidos();
    cerrarModalPedido();
  }
  
  // Función para eliminar un pedido
  function eliminarPedido(id) {
    const index = pedidos.findIndex(pedido => pedido.id === id);
    if (index !== -1) {
      pedidos.splice(index, 1);
      actualizarTablaPedidos();
    }
  }
  
  // Función para abrir el modal de pedido
  function abrirModalPedido() {
    document.getElementById('modalPedido').style.display = 'block';
  }
  
  // Función para cerrar el modal de pedido
  function cerrarModalPedido() {
    document.getElementById('modalPedido').style.display = 'none';
  }
  
  // Función para abrir el modal de producto
  function abrirModalProducto() {
    document.getElementById('modalProducto').style.display = 'block';
  }
  
  // Función para cerrar el modal de producto
  function cerrarModalProducto() {
    document.getElementById('modalProducto').style.display = 'none';
  }
  
  // Inicialización
  document.addEventListener('DOMContentLoaded', () => {
    // Inicializar los datos del dashboard
    actualizarDashboard();
  
    // Event listeners para acciones del dashboard
    document.getElementById('menuEstadisticas').addEventListener('click', mostrarEstadisticas);
    document.getElementById('menuPedidos').addEventListener('click', actualizarTablaPedidos);
    document.getElementById('menuProductos').addEventListener('click', actualizarTablaProductos);
  });
  