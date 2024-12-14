// Datos de ejemplo actualizados
let products = [
    { id: 1, name: "Martillo", stock: 50, price: 15.99 },
    { id: 2, name: "Destornillador", stock: 100, price: 5.99 },
    { id: 3, name: "Sierra", stock: 30, price: 25.99 },
    { id: 4, name: "Taladro", stock: 20, price: 49.99 },
    { id: 5, name: "Clavos (caja)", stock: 200, price: 3.99 },
    { id: 6, name: "Tornillos (caja)", stock: 150, price: 4.99 },
    { id: 7, name: "Llave inglesa", stock: 40, price: 12.99 },
    { id: 8, name: "Cinta métrica", stock: 75, price: 7.99 },
    { id: 9, name: "Nivel", stock: 35, price: 9.99 },
    { id: 10, name: "Alicates", stock: 60, price: 8.99 },
    { id: 11, name: "Pintura (lata)", stock: 0, price: 19.99 },
    { id: 12, name: "Brocas (set)", stock: 5, price: 14.99 },
    { id: 13, name: "Escalera", stock: 15, price: 79.99 },
    { id: 14, name: "Lijadora", stock: 25, price: 39.99 },
    { id: 15, name: "Sellador", stock: 40, price: 9.99 }
];

let orders = [
    { id: 1, customer: "Juan Pérez", date: "2023-05-15", status: "Completado", items: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }] },
    { id: 2, customer: "María García", date: "2023-05-16", status: "Pendiente", items: [{ productId: 2, quantity: 3 }, { productId: 5, quantity: 2 }] },
    { id: 3, customer: "Carlos Rodríguez", date: "2023-05-17", status: "En proceso", items: [{ productId: 4, quantity: 1 }, { productId: 7, quantity: 2 }] },
    { id: 4, customer: "Ana Martínez", date: "2023-05-18", status: "Completado", items: [{ productId: 6, quantity: 5 }, { productId: 8, quantity: 1 }] },
    { id: 5, customer: "Luis Sánchez", date: "2023-05-19", status: "Pendiente", items: [{ productId: 9, quantity: 2 }, { productId: 10, quantity: 3 }] }
];

let supplierOrders = [
    { id: 1, supplier: "Herramientas S.A.", date: "2023-05-10", status: "Recibido", items: [{ productId: 1, quantity: 50 }, { productId: 2, quantity: 100 }] },
    { id: 2, supplier: "Materiales Construcción", date: "2023-05-12", status: "En camino", items: [{ productId: 5, quantity: 500 }, { productId: 6, quantity: 300 }] },
    { id: 3, supplier: "Pinturas y Más", date: "2023-05-14", status: "Pendiente", items: [{ productId: 11, quantity: 100 }] },
    { id: 4, supplier: "Herramientas Eléctricas", date: "2023-05-16", status: "En camino", items: [{ productId: 4, quantity: 20 }, { productId: 14, quantity: 15 }] },
    { id: 5, supplier: "Suministros Industriales", date: "2023-05-18", status: "Pendiente", items: [{ productId: 7, quantity: 30 }, { productId: 9, quantity: 25 }] }
];

let automationTasks = [
    { id: 1, name: "Pedido automático de clavos", description: "Realizar pedido cuando el stock sea menor a 50 cajas", active: true },
    { id: 2, name: "Reporte semanal de ventas", description: "Generar y enviar reporte todos los lunes", active: true },
    { id: 3, name: "Actualización de precios", description: "Ajustar precios según la inflación mensual", active: false }
];

// Funciones de utilidad
function $(id) { return document.getElementById(id); }

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
    $(screenId).classList.remove('hidden');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    $('notification-container').appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Manejo de login
$('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = $('username').value;
    const password = $('password').value;
    if (username === 'admin' && password === 'password') {
        showScreen('main-app');
        $('user-name').textContent = username;
        loadSection('home');
    } else {
        $('login-error').textContent = 'Usuario o contraseña incorrectos';
    }
});

// Manejo de logout
$('logout-btn').addEventListener('click', function() {
    showScreen('login-screen');
    $('username').value = '';
    $('password').value = '';
    $('login-error').textContent = '';
});

// Navegación del sidebar
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        loadSection(this.dataset.section);
    });
});

// Toggle del sidebar
$('toggle-sidebar').addEventListener('click', function() {
    $('sidebar').classList.toggle('collapsed');
    $('content').classList.toggle('expanded');
});

// Carga de secciones
function loadSection(section) {
    const content = $('content');
    content.innerHTML = '';
    switch(section) {
        case 'home':
            loadHome();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'supplierOrders':
            loadSupplierOrders();
            break;
        case 'products':
            loadProducts();
            break;
        case 'stats':
            loadStats();
            break;
        case 'automation':
            loadAutomation();
            break;
    }
}

function loadHome() {
    const totalSales = orders.reduce((sum, order) => {
        return sum + order.items.reduce((itemSum, item) => {
            const product = products.find(p => p.id === item.productId);
            return itemSum + (product.price * item.quantity);
        }, 0);
    }, 0);

    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 10).length;
    const noStockProducts = products.filter(p => p.stock === 0).length;
    const pendingOrders = orders.filter(o => o.status === "Pendiente").length;
    const pendingSupplierOrders = supplierOrders.filter(o => o.status === "Pendiente").length;

    $('content').innerHTML = `
        <h2>Bienvenido a la Ferretería El Tornillo Feliz</h2>
        <div class="widget-container">
            <div class="widget">
                <h3>Ventas Totales del Mes</h3>
                <p>$${totalSales.toFixed(2)}</p>
            </div>
            <div class="widget">
                <h3>Productos con Bajo Stock</h3>
                <p>${lowStockProducts}</p>
            </div>
            <div class="widget">
                <h3>Productos Sin Stock</h3>
                <p>${noStockProducts}</p>
            </div>
            <div class="widget">
                <h3>Pedidos Pendientes</h3>
                <p>${pendingOrders}</p>
            </div>
            <div class="widget">
                <h3>Pedidos a Proveedores Pendientes</h3>
                <p>${pendingSupplierOrders}</p>
            </div>
        </div>
    `;
}

function loadOrders() {
    let html = `
        <h2>Gestión de Pedidos</h2>
        <div class="form-container">
            <h3>Nuevo Pedido</h3>
            <form id="orderForm">
                <input type="text" id="orderCustomer" placeholder="Nombre del cliente" required>
                <input type="date" id="orderDate" required>
                <select id="orderStatus">
                    <option value="Pendiente">Pendiente</option>
                    <option value="En proceso">En proceso</option>
                    <option value="Completado">Completado</option>
                </select>
                <div id="orderItems"></div>
                <button type="button" onclick="addOrderItem()">Añadir Producto</button>
                <button type="submit">Crear Pedido</button>
            </form>
        </div>
        <table>
            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
    `;
    orders.forEach(order => {
        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="showOrderDetails(${order.id})">Ver Detalles</button>
                    <button onclick="editOrder(${order.id})">Editar</button>
                    <button onclick="deleteOrder(${order.id})">Eliminar</button>
                </td>
            </tr>
            <tr id="orderDetails${order.id}" style="display: none;">
                <td colspan="5">
                    <div class="order-details">
                        <h4>Detalles del Pedido</h4>
                        <ul>
                            ${order.items.map(item => {
                                const product = products.find(p => p.id === item.productId);
                                return `<li>${product.name} - Cantidad: ${item.quantity} - Precio: $${(product.price * item.quantity).toFixed(2)}</li>`;
                            }).join('')}
                        </ul>
                        <p><strong>Total: $${order.items.reduce((sum, item) => {
                            const product = products.find(p => p.id === item.productId);
                            return sum + (product.price * item.quantity);
                        }, 0).toFixed(2)}</strong></p>
                    </div>
                </td>
            </tr>
        `;
    });
    html += '</table>';
    $('content').innerHTML = html;

    $('orderForm').addEventListener('submit', handleOrderSubmit);
}

function loadProducts() {
    let html = `
        <h2>Gestión de Productos</h2>
        <div class="form-container">
            <hh3>Nuevo Producto</h3>
            <form id="productForm">
                <input type="text" id="productName" placeholder="Nombre del producto" required>
                <input type="number" id="productStock" placeholder="Stock" required>
                <input type="number" id="productPrice" placeholder="Precio" step="0.01" required>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
        <table>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
    `;
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.stock}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button onclick="editProduct(${product.id})">Editar</button>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    html += '</table>';
    $('content').innerHTML = html;

    $('productForm').addEventListener('submit', handleProductSubmit);
}

function loadStats() {
    $('content').innerHTML = `
        <h2>Estadísticas y Reportes</h2>
        <div class="chart-container">
            <div class="chart">
                <canvas id="salesChart"></canvas>
            </div>
            <div class="chart">
                <canvas id="productChart"></canvas>
            </div>
            <div class="chart">
                <canvas id="supplierOrdersChart"></canvas>
            </div>
            <div class="chart">
                <canvas id="inventoryChart"></canvas>
            </div>
        </div>
    `;
    
    // Gráfico de ventas por mes
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Ventas por Mes',
                data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 3800, 5200, 4700, 6000, 5500],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de productos más vendidos
    const productCtx = document.getElementById('productChart').getContext('2d');
    new Chart(productCtx, {
        type: 'pie',
        data: {
            labels: ['Martillo', 'Destornillador', 'Sierra', 'Taladro', 'Clavos', 'Tornillos', 'Llave inglesa'],
            datasets: [{
                data: [300, 500, 200, 150, 800, 600, 250],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Gráfico de pedidos a proveedores
    const supplierOrdersCtx = document.getElementById('supplierOrdersChart').getContext('2d');
    new Chart(supplierOrdersCtx, {
        type: 'bar',
        data: {
            labels: ['Herramientas S.A.', 'Materiales Construcción', 'Pinturas y Más', 'Herramientas Eléctricas', 'Suministros Industriales'],
            datasets: [{
                label: 'Pedidos a Proveedores',
                data: [5, 3, 2, 4, 3],
                backgroundColor: 'rgba(255, 159, 64, 0.6)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    });

    // Gráfico de niveles de inventario
    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
    new Chart(inventoryCtx, {
        type: 'bar',
        data: {
            labels: products.map(p => p.name),
            datasets: [{
                label: 'Nivel de Inventario',
                data: products.map(p => p.stock),
                backgroundColor: 'rgba(153, 102, 255, 0.6)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadSupplierOrders() {
    let html = `
        <h2>Gestión de Pedidos a Proveedores</h2>
        <div class="form-container">
            <h3>Nuevo Pedido a Proveedor</h3>
            <form id="supplierOrderForm">
                <input type="text" id="supplierOrderSupplier" placeholder="Nombre del proveedor" required>
                <input type="date" id="supplierOrderDate" required>
                <select id="supplierOrderStatus">
                    <option value="Pendiente">Pendiente</option>
                    <option value="En camino">En camino</option>
                    <option value="Recibido">Recibido</option>
                </select>
                <div id="supplierOrderItems"></div>
                <button type="button" onclick="addSupplierOrderItem()">Añadir Producto</button>
                <button type="submit">Crear Pedido</button>
            </form>
        </div>
        <table>
            <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
    `;
    supplierOrders.forEach(order => {
        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.supplier}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>
                    <button onclick="showSupplierOrderDetails(${order.id})">Ver Detalles</button>
                    <button onclick="editSupplierOrder(${order.id})">Editar</button>
                    <button onclick="deleteSupplierOrder(${order.id})">Eliminar</button>
                </td>
            </tr>
            <tr id="supplierOrderDetails${order.id}" style="display: none;">
                <td colspan="5">
                    <div class="order-details">
                        <h4>Detalles del Pedido</h4>
                        <ul>
                            ${order.items.map(item => {
                                const product = products.find(p => p.id === item.productId);
                                return `<li>${product.name} - Cantidad: ${item.quantity}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                </td>
            </tr>
        `;
    });
    html += '</table>';
    $('content').innerHTML = html;

    $('supplierOrderForm').addEventListener('submit', handleSupplierOrderSubmit);
}

function loadAutomation() {
    let html = `
        <h2>Automatización de Procesos</h2>
        <div class="form-container">
            <h3>Nueva Tarea de Automatización</h3>
            <form id="automationForm">
                <input type="text" id="automationName" placeholder="Nombre de la tarea" required>
                <textarea id="automationDescription" placeholder="Descripción de la tarea" required></textarea>
                <label>
                    <input type="checkbox" id="automationActive"> Activa
                </label>
                <button type="submit">Crear Tarea</button>
            </form>
        </div>
        <table>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
    `;
    automationTasks.forEach(task => {
        html += `
            <tr>
                <td>${task.id}</td>
                <td>${task.name}</td>
                <td>${task.description}</td>
                <td>${task.active ? 'Activa' : 'Inactiva'}</td>
                <td>
                    <button onclick="editAutomationTask(${task.id})">Editar</button>
                    <button onclick="deleteAutomationTask(${task.id})">Eliminar</button>
                    <button onclick="toggleAutomationTask(${task.id})">${task.active ? 'Desactivar' : 'Activar'}</button>
                </td>
            </tr>
        `;
    });
    html += '</table>';
    $('content').innerHTML = html;

    $('automationForm').addEventListener('submit', handleAutomationSubmit);
}

function handleProductSubmit(e) {
    e.preventDefault();
    const name = $('productName').value;
    const stock = parseInt($('productStock').value);
    const price = parseFloat($('productPrice').value);

    const newProduct = {
        id: products.length + 1,
        name,
        stock,
        price
    };

    products.push(newProduct);
    showNotification('Producto creado con éxito');
    loadProducts();
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        $('productName').value = product.name;
        $('productStock').value = product.stock;
        $('productPrice').value = product.price;
        $('productForm').onsubmit = function(e) {
            e.preventDefault();
            product.name = $('productName').value;
            product.stock = parseInt($('productStock').value);
            product.price = parseFloat($('productPrice').value);
            showNotification('Producto actualizado con éxito');
            loadProducts();
        };
    }
}

function deleteProduct(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        products = products.filter(p => p.id !== id);
        showNotification('Producto eliminado con éxito');
        loadProducts();
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();
    const customer = $('orderCustomer').value;
    const date = $('orderDate').value;
    const status = $('orderStatus').value;
    const items = [];

    document.querySelectorAll('.order-item').forEach(item => {
        const productId = parseInt(item.querySelector('.product-select').value);
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        if (productId && quantity) {
            items.push({ productId, quantity });
        }
    });

    const newOrder = {
        id: orders.length + 1,
        customer,
        date,
        status,
        items
    };

    orders.push(newOrder);
    showNotification('Pedido creado con éxito');
    loadOrders();
}

function addOrderItem() {
    const orderItems = $('orderItems');
    const newItem = document.createElement('div');
    newItem.className = 'order-item';
    newItem.innerHTML = `
        <select class="product-select">
            <option value="">Seleccionar producto</option>
            ${products.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
        </select>
        <input type="number" class="quantity-input" placeholder="Cantidad" min="1">
        <button type="button" onclick="this.parentElement.remove()">Eliminar</button>
    `;
    orderItems.appendChild(newItem);
}

function showOrderDetails(id) {
    const detailsRow = $(`orderDetails${id}`);
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
}

function editOrder(id) {
    const order = orders.find(o => o.id === id);
    if (order) {
        $('orderCustomer').value = order.customer;
        $('orderDate').value = order.date;
        $('orderStatus').value = order.status;
        $('orderItems').innerHTML = '';
        order.items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'order-item';
            newItem.innerHTML = `
                <select class="product-select">
                    <option value="">Seleccionar producto</option>
                    ${products.map(product => `<option value="${product.id}" ${product.id === item.productId ? 'selected' : ''}>${product.name}</option>`).join('')}
                </select>
                <input type="number" class="quantity-input" placeholder="Cantidad" min="1" value="${item.quantity}">
                <button type="button" onclick="this.parentElement.remove()">Eliminar</button>
            `;
            $('orderItems').appendChild(newItem);
        });
        $('orderForm').onsubmit = function(e) {
            e.preventDefault();
            order.customer = $('orderCustomer').value;
            order.date = $('orderDate').value;
            order.status = $('orderStatus').value;
            order.items = [];
            document.querySelectorAll('.order-item').forEach(item => {
                const productId = parseInt(item.querySelector('.product-select').value);
                const quantity = parseInt(item.querySelector('.quantity-input').value);
                if (productId && quantity) {
                    order.items.push({ productId, quantity });
                }
            });
            showNotification('Pedido actualizado con éxito');
            loadOrders();
        };
    }
}

function deleteOrder(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
        orders = orders.filter(o => o.id !== id);
        showNotification('Pedido eliminado con éxito');
        loadOrders();
    }
}

function handleSupplierOrderSubmit(e) {
    e.preventDefault();
    const supplier = $('supplierOrderSupplier').value;
    const date = $('supplierOrderDate').value;
    const status = $('supplierOrderStatus').value;
    const items = [];

    document.querySelectorAll('.supplier-order-item').forEach(item => {
        const productId = parseInt(item.querySelector('.product-select').value);
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        if (productId && quantity) {
            items.push({ productId, quantity });
        }
    });

    const newOrder = {
        id: supplierOrders.length + 1,
        supplier,
        date,
        status,
        items
    };

    supplierOrders.push(newOrder);
    showNotification('Pedido a proveedor creado con éxito');
    loadSupplierOrders();
}

function addSupplierOrderItem() {
    const orderItems = $('supplierOrderItems');
    const newItem = document.createElement('div');
    newItem.className = 'supplier-order-item';
    newItem.innerHTML = `
        <select class="product-select">
            <option value="">Seleccionar producto</option>
            ${products.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
        </select>
        <input type="number" class="quantity-input" placeholder="Cantidad" min="1">
        <button type="button" onclick="this.parentElement.remove()">Eliminar</button>
    `;
    orderItems.appendChild(newItem);
}

function showSupplierOrderDetails(id) {
    const detailsRow = $(`supplierOrderDetails${id}`);
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
}

function editSupplierOrder(id) {
    const order = supplierOrders.find(o => o.id === id);
    if (order) {
        $('supplierOrderSupplier').value = order.supplier;
        $('supplierOrderDate').value = order.date;
        $('supplierOrderStatus').value = order.status;
        $('supplierOrderItems').innerHTML = '';
        order.items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'supplier-order-item';
            newItem.innerHTML = `
                <select class="product-select">
                    <option value="">Seleccionar producto</option>
                    ${products.map(product => `<option value="${product.id}" ${product.id === item.productId ? 'selected' : ''}>${product.name}</option>`).join('')}
                </select>
                <input type="number" class="quantity-input" placeholder="Cantidad" min="1" value="${item.quantity}">
                <button type="button" onclick="this.parentElement.remove()">Eliminar</button>
            `;
            $('supplierOrderItems').appendChild(newItem);
        });
        $('supplierOrderForm').onsubmit = function(e) {
            e.preventDefault();
            order.supplier = $('supplierOrderSupplier').value;
            order.date = $('supplierOrderDate').value;
            order.status = $('supplierOrderStatus').value;
            order.items = [];
            document.querySelectorAll('.supplier-order-item').forEach(item => {
                const productId = parseInt(item.querySelector('.product-select').value);
                const quantity = parseInt(item.querySelector('.quantity-input').value);
                if (productId && quantity) {
                    order.items.push({ productId, quantity });
                }
            });
            showNotification('Pedido a proveedor actualizado con éxito');
            loadSupplierOrders();
        };
    }
}

function deleteSupplierOrder(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este pedido a proveedor?')) {
        supplierOrders = supplierOrders.filter(o => o.id !== id);
        showNotification('Pedido a proveedor eliminado con éxito');
        loadSupplierOrders();
    }
}

function handleAutomationSubmit(e) {
    e.preventDefault();
    const name = $('automationName').value;
    const description = $('automationDescription').value;
    const active = $('automationActive').checked;

    const newTask = {
        id: automationTasks.length + 1,
        name,
        description,
        active
    };

    automationTasks.push(newTask);
    showNotification('Tarea de automatización creada con éxito');
    loadAutomation();
}

function editAutomationTask(id) {
    const task = automationTasks.find(t => t.id === id);
    if (task) {
        $('automationName').value = task.name;
        $('automationDescription').value = task.description;
        $('automationActive').checked = task.active;
        $('automationForm').onsubmit = function(e) {
            e.preventDefault();
            task.name = $('automationName').value;
            task.description = $('automationDescription').value;
            task.active = $('automationActive').checked;
            showNotification('Tarea de automatización actualizada con éxito');
            loadAutomation();
        };
    }
}

function deleteAutomationTask(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea de automatización?')) {
        automationTasks = automationTasks.filter(t => t.id !== id);
        showNotification('Tarea de automatización eliminada con éxito');
        loadAutomation();
    }
}

function toggleAutomationTask(id) {
    const task = automationTasks.find(t => t.id === id);
    if (task) {
        task.active = !task.active;
        showNotification(`Tarea de automatización ${task.active ? 'activada' : 'desactivada'} con éxito`);
        loadAutomation();
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    showScreen('login-screen');
});