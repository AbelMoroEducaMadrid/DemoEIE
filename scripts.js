// Simulación de usuarios
const usuarios = [
    { username: "admin", password: "1234" },
    { username: "user", password: "abcd" }
];

// Simulación de datos
const pedidos = [
    { id: 1, cliente: "Juan Pérez", estado: "Enviado" },
    { id: 2, cliente: "Ana Gómez", estado: "Pendiente" }
];

const productos = [
    { id: 101, nombre: "Producto A", precio: "$10" },
    { id: 102, nombre: "Producto B", precio: "$15" }
];

// Gestión de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const usuarioValido = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
        document.getElementById('login').classList.remove('active');
        document.getElementById('dashboard').classList.add('active');
        mostrarPedidos();
        mostrarProductos();
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

// Logout
document.getElementById('logout').addEventListener('click', function () {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('login').classList.add('active');
});

// Navegación entre tabs
document.querySelectorAll('.tab').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active-tab'));
        document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-tab'));

        this.classList.add('active-tab');
        document.getElementById(this.dataset.section).classList.add('active-tab');
    });
});

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

// Función para agregar un pedido
document.getElementById('agregarPedidoBtn').addEventListener('click', function () {
    const id = prompt("Introduce el ID del pedido:");
    const cliente = prompt("Introduce el nombre del cliente:");
    const estado = prompt("Introduce el estado del pedido:");

    if (id && cliente && estado) {
        const nuevoPedido = { id: parseInt(id), cliente: cliente, estado: estado };
        pedidos.push(nuevoPedido);
        mostrarPedidos();
    }
});

// Función para editar un pedido
function editarPedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        const clienteNuevo = prompt("Nuevo nombre del cliente:", pedido.cliente);
        const estadoNuevo = prompt("Nuevo estado del pedido:", pedido.estado);

        if (clienteNuevo && estadoNuevo) {
            pedido.cliente = clienteNuevo;
            pedido.estado = estadoNuevo;
            mostrarPedidos();
        }
    }
}

// Función para eliminar un pedido
function eliminarPedido(id) {
    const index = pedidos.findIndex(p => p.id === id);
    if (index !== -1) {
        const confirmacion = confirm("¿Estás seguro de eliminar este pedido?");
        if (confirmacion) {
            pedidos.splice(index, 1);
            mostrarPedidos();
        }
    }
}

// Función para mostrar los pedidos en la tabla
function mostrarPedidos() {
    const tablaPedidos = document.getElementById('tabla-pedidos');
    tablaPedidos.innerHTML = pedidos.map(pedido =>
        `<tr>
            <td>${pedido.id}</td>
            <td>${pedido.cliente}</td>
            <td>${pedido.estado}</td>
            <td>
                <button class="editar" onclick="editarPedido(${pedido.id})">Editar</button>
                <button class="eliminar" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
            </td>
        </tr>`).join('');
}

// Mostrar los pedidos inicialmente
mostrarPedidos();