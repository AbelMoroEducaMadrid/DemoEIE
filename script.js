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
    { id: 5, customer: "Luis Sánchez", date: "2023-05-19", status: "Pendiente", items: [{ productId: 9, quantity: 2 }, { productId: 10, quantity: 3 }] },
    { id: 6, customer: "Elena Torres", date: "2023-05-20", status: "En proceso", items: [{ productId: 11, quantity: 1 }, { productId: 12, quantity: 2 }] },
    { id: 7, customer: "Pedro Ramírez", date: "2023-05-21", status: "Completado", items: [{ productId: 13, quantity: 1 }, { productId: 14, quantity: 1 }] },
    { id: 8, customer: "Laura Fernández", date: "2023-05-22", status: "Pendiente", items: [{ productId: 15, quantity: 3 }, { productId: 1, quantity: 2 }] }
];

let supplierOrders = [
    { id: 1, supplier: "Herramientas S.A.", date: "2023-05-10", status: "Recibido", items: [{ productId: 1, quantity: 50 }, { productId: 2, quantity: 100 }] },
    { id: 2, supplier: "Materiales Construcción", date: "2023-05-12", status: "En camino", items: [{ productId: 5, quantity: 500 }, { productId: 6, quantity: 300 }] },
    { id: 3, supplier: "Pinturas y Más", date: "2023-05-14", status: "Pendiente", items: [{ productId: 11, quantity: 100 }] },
    { id: 4, supplier: "Herramientas Eléctricas", date: "2023-05-16", status: "En camino", items: [{ productId: 4, quantity: 20 }, { productId: 14, quantity: 15 }] },
    { id: 5, supplier: "Suministros Industriales", date: "2023-05-18", status: "Pendiente", items: [{ productId: 7, quantity: 30 }, { productId: 9, quantity: 25 }] },
    { id: 6, supplier: "Ferretería Mayorista", date: "2023-05-20", status: "Recibido", items: [{ productId: 3, quantity: 40 }, { productId: 8, quantity: 50 }] },
    { id: 7, supplier: "Distribuidora de Seguridad", date: "2023-05-22", status: "En camino", items: [{ productId: 10, quantity: 100 }, { productId: 12, quantity: 75 }] }
];

let suppliers = [
    { id: 1, name: "Herramientas S.A.", products: [1, 2, 3, 4] },
    { id: 2, name: "Materiales Construcción", products: [5, 6, 13] },
    { id: 3, name: "Pinturas y Más", products: [11, 15] },
    { id: 4, name: "Herramientas Eléctricas", products: [4, 12, 14] },
    { id: 5, name: "Suministros Industriales", products: [7, 8, 9, 10] },
    { id: 6, name: "Ferretería Mayorista", products: [1, 2, 3, 5, 6, 7, 8] },
    { id: 7, name: "Distribuidora de Seguridad", products: [10, 12, 13] }
];

let automationTasks = [
    { id: 1, name: "Pedido automático de clavos", type: "restock", product: 5, threshold: 50, quantity: 500, active: true },
    { id: 2, name: "Reporte semanal de ventas", type: "report", frequency: "weekly", day: "Monday", active: true },
    { id: 3, name: "Actualización de precios", type: "price_update", percentage: 5, frequency: "monthly", day: 1, active: false }
];

// Funciones de utilidad
function $(id) { return document.getElementById(id); }

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
    $(screenId).classList.remove('hidden');
    if (screenId === 'main-app') {
        loadSection('home');
        $('sidebar').style.display = 'block';
    } else {
        $('sidebar').style.display = 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    $('notification-container').appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Manejo de login
$('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = $('username').value;
    const password = $('password').value;
    if (username === 'admin' && password === 'admin') {
        showScreen('main-app');
        $('user-name').textContent = username;

    } else {
        $('login-error').textContent = 'Usuario o contraseña incorrectos';
    }
});

// Manejo de logout
$('logout-btn').addEventListener('click', function () {
    showScreen('login-screen');
    $('username').value = '';
    $('password').value = '';
    $('login-error').textContent = '';
});

// Navegación del sidebar
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        loadSection(this.dataset.section);
    });
});


// Carga de secciones
function loadSection(section) {
    const content = $('content');
    content.innerHTML = '';
    switch (section) {
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
        case 'suppliers':
            loadSuppliers();
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
    const activeAutomationTasks = automationTasks.filter(t => t.active).length;
    const totalProducts = products.length;
    const totalSuppliers = suppliers.length;
    const completedOrders = orders.filter(o => o.status === "Completado").length;

    $('content').innerHTML = `
        <h2>Bienvenido a Ferretería Industrial S.A.</h2>
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
            <div class="widget">
                <h3>Tareas de Automatización Activas</h3>
                <p>${activeAutomationTasks}</p>
            </div>
            <div class="widget">
                <h3>Total de Productos</h3>
                <p>${totalProducts}</p>
            </div>
            <div class="widget">
                <h3>Total de Proveedores</h3>
                <p>${totalSuppliers}</p>
            </div>
            <div class="widget">
                <h3>Pedidos Completados</h3>
                <p>${completedOrders}</p>
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
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="addOrderItem()"><i class="fas fa-plus"></i> Añadir Producto</button>
                    <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Crear Pedido</button>
                </div>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    orders.forEach(order => {
        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary" onclick="showOrderDetails(${order.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-primary" onclick="editOrder(${order.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="deleteOrder(${order.id})"><i class="fas fa-trash"></i></button>
                    </div>
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
    html += '</tbody></table></div>';
    $('content').innerHTML = html;

    $('orderForm').addEventListener('submit', handleOrderSubmit);
}

function loadProducts() {
    let html = `
        <h2>Gestión de Productos</h2>
        <div class="form-container">
            <h3>Nuevo Producto</h3>
            <form id="productForm">
                <input type="text" id="productName" placeholder="Nombre del producto" required>
                <input type="number" id="productStock" placeholder="Stock" required>
                <input type="number" id="productPrice" placeholder="Precio" step="0.01" required>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Crear Producto</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    products.forEach(product => {
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.stock}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-primary" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });
    html += '</tbody></table></div>';
    $('content').innerHTML = html;

    $('productForm').addEventListener('submit', handleProductSubmit);
}

function loadSupplierOrders() {
    let html = `
        <h2>Gestión de Pedidos a Proveedores</h2>
        <div class="form-container">
            <h3>Nuevo Pedido a Proveedor</h3>
            <form id="supplierOrderForm">
                <select id="supplierOrderSupplier" required>
                    <option value="">Seleccionar proveedor</option>
                    ${suppliers.map(supplier => `<option value="${supplier.id}">${supplier.name}</option>`).join('')}
                </select>
                <input type="date" id="supplierOrderDate" required>
                <select id="supplierOrderStatus">
                    <option value="Pendiente">Pendiente</option>
                    <option value="En camino">En camino</option>
                    <option value="Recibido">Recibido</option>
                </select>
                <div id="supplierOrderItems"></div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="addSupplierOrderItem()"><i class="fas fa-plus"></i> Añadir Producto</button>
                    <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Crear Pedido</button>
                </div>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Proveedor</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    supplierOrders.forEach(order => {
        html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.supplier}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary" onclick="showSupplierOrderDetails(${order.id})"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-primary" onclick="editSupplierOrder(${order.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="deleteSupplierOrder(${order.id})"><i class="fas fa-trash"></i></button>
                    </div>
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
    html += '</tbody></table></div>';
    $('content').innerHTML = html;

    $('supplierOrderForm').addEventListener('submit', handleSupplierOrderSubmit);
    $('supplierOrderSupplier').addEventListener('change', updateSupplierOrderProducts);
}

function loadSuppliers() {
    let html = `
        <h2>Gestión de Proveedores</h2>
        <div class="form-container">
            <h3>Nuevo Proveedor</h3>
            <form id="supplierForm">
                <input type="text" id="supplierName" placeholder="Nombre del proveedor" required>
                <div id="supplierProducts"></div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="addSupplierProduct()"><i class="fas fa-plus"></i> Añadir Producto</button>
                    <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Crear Proveedor</button>
                </div>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Productos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    suppliers.forEach(supplier => {
        html += `
            <tr>
                <td>${supplier.id}</td>
                <td>${supplier.name}</td>
                <td>${supplier.products.map(productId => products.find(p => p.id === productId).name).join(', ')}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-primary" onclick="editSupplier(${supplier.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="deleteSupplier(${supplier.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
    });
    html += '</tbody></table></div>';
    $('content').innerHTML = html;

    $('supplierForm').addEventListener('submit', handleSupplierSubmit);
}

function loadStats() {
    $('content').innerHTML = `
        <h2>Estadísticas y Reportes</h2>
        <div class="chart-container">
            <div class="chart">
                <h3>Ventas por Mes</h3>
                <canvas id="salesChart"></canvas>
            </div>
            <div class="chart">
                <h3>Productos más Vendidos</h3>
                <canvas id="productChart"></canvas>
            </div>
            <div class="chart">
                <h3>Pedidos a Proveedores</h3>
                <canvas id="supplierOrdersChart"></canvas>
            </div>
            <div class="chart">
                <h3>Niveles de Inventario</h3>
                <canvas id="inventoryChart"></canvas>
            </div>
        </div>
    `;

    // Gráfico de ventas por mes
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const productCtx = document.getElementById('productChart').getContext('2d');
    const supplierOrdersCtx = document.getElementById('supplierOrdersChart').getContext('2d');
    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    // Aplicar chartOptions a todos los gráficos
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
        options: chartOptions
    });

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
        options: chartOptions
    });

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
        options: chartOptions
    });

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
        options: chartOptions
    });
}

function loadAutomation() {
    let html = `
        <h2>Automatización de Procesos</h2>
        <div class="form-container">
            <h3>Nueva Tarea de Automatización</h3>
            <form id="automationForm">
                <input type="text" id="automationName" placeholder="Nombre de la tarea" required>
                <select id="automationType" required>
                    <option value="">Seleccionar tipo de tarea</option>
                    <option value="restock">Reabastecimiento automático</option>
                    <option value="report">Reporte automático</option>
                    <option value="price_update">Actualización de precios</option>
                </select>
                <div id="automationDetails"></div>
                <label>
                    <input type="checkbox" id="automationActive"> Activa
                </label>
                <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Crear Tarea</button>
            </form>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
    `;
    automationTasks.forEach(task => {
        html += `
            <tr>
                <td>${task.id}</td>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.active ? 'Activa' : 'Inactiva'}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-primary" onclick="editAutomationTask(${task.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger" onclick="deleteAutomationTask(${task.id})"><i class="fas fa-trash"></i></button>
                        <button class="btn btn-secondary" onclick="toggleAutomationTask(${task.id})">
                            <i class="fas ${task.active ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
    html += '</tbody></table></div>';
    $('content').innerHTML = html;

    $('automationForm').addEventListener('submit', handleAutomationSubmit);
    $('automationType').addEventListener('change', updateAutomationForm);
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
        $('productForm').onsubmit = function (e) {
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
        $('orderForm').onsubmit = function (e) {
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
    const supplierId = parseInt($('supplierOrderSupplier').value);
    const supplier = suppliers.find(s => s.id === supplierId);
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
        supplier: supplier.name,
        date,
        status,
        items
    };

    supplierOrders.push(newOrder);
    showNotification('Pedido a proveedor creado con éxito');
    loadSupplierOrders();
}

function addSupplierOrderItem() {
    const supplierId = parseInt($('supplierOrderSupplier').value);
    const supplier = suppliers.find(s => s.id === supplierId);
    if (!supplier) {
        showNotification('Por favor, seleccione un proveedorprimero');
        return;
    }

    const orderItems = $('supplierOrderItems');
    const newItem = document.createElement('div');
    newItem.className = 'supplier-order-item';
    newItem.innerHTML = `
        <select class="product-select">
            <option value="">Seleccionar producto</option>
            ${supplier.products.map(productId => {
        const product = products.find(p => p.id === productId);
        return `<option value="${product.id}">${product.name}</option>`;
    }).join('')}
        </select>
        <input type="number" class="quantity-input" placeholder="Cantidad" min="1">
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
    `;
    orderItems.appendChild(newItem);
}

function updateSupplierOrderProducts() {
    const supplierId = parseInt($('supplierOrderSupplier').value);
    const supplier = suppliers.find(s => s.id === supplierId);
    $('supplierOrderItems').innerHTML = '';
    if (supplier) {
        addSupplierOrderItem();
    }
}

function showSupplierOrderDetails(id) {
    const detailsRow = $(`supplierOrderDetails${id}`);
    detailsRow.style.display = detailsRow.style.display === 'none' ? 'table-row' : 'none';
}

function editSupplierOrder(id) {
    const order = supplierOrders.find(o => o.id === id);
    if (order) {
        const supplier = suppliers.find(s => s.name === order.supplier);
        $('supplierOrderSupplier').value = supplier.id;
        $('supplierOrderDate').value = order.date;
        $('supplierOrderStatus').value = order.status;
        $('supplierOrderItems').innerHTML = '';
        order.items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'supplier-order-item';
            newItem.innerHTML = `
                <select class="product-select">
                    <option value="">Seleccionar producto</option>
                    ${supplier.products.map(productId => {
                const product = products.find(p => p.id === productId);
                return `<option value="${product.id}" ${product.id === item.productId ? 'selected' : ''}>${product.name}</option>`;
            }).join('')}
                </select>
                <input type="number" class="quantity-input" placeholder="Cantidad" min="1" value="${item.quantity}">
                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
            `;
            $('supplierOrderItems').appendChild(newItem);
        });
        $('supplierOrderForm').onsubmit = function (e) {
            e.preventDefault();
            const newSupplierId = parseInt($('supplierOrderSupplier').value);
            const newSupplier = suppliers.find(s => s.id === newSupplierId);
            order.supplier = newSupplier.name;
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

function handleSupplierSubmit(e) {
    e.preventDefault();
    const name = $('supplierName').value;
    const productIds = [];

    document.querySelectorAll('.supplier-product').forEach(item => {
        const productId = parseInt(item.value);
        if (productId) {
            productIds.push(productId);
        }
    });

    const newSupplier = {
        id: suppliers.length + 1,
        name,
        products: productIds
    };

    suppliers.push(newSupplier);
    showNotification('Proveedor creado con éxito');
    loadSuppliers();
}

function addSupplierProduct() {
    const supplierProducts = $('supplierProducts');
    const newItem = document.createElement('div');
    newItem.className = 'supplier-product-item';
    newItem.innerHTML = `
        <select class="supplier-product">
            <option value="">Seleccionar producto</option>
            ${products.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
        </select>
        <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
    `;
    supplierProducts.appendChild(newItem);
}

function editSupplier(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        $('supplierName').value = supplier.name;
        $('supplierProducts').innerHTML = '';
        supplier.products.forEach(productId => {
            const newItem = document.createElement('div');
            newItem.innerHTML = `
                <select class="supplier-product">
                    <option value="">Seleccionar producto</option>
                    ${products.map(product => `<option value="${product.id}" ${product.id === productId ? 'selected' : ''}>${product.name}</option>`).join('')}
                </select>
                <button type="button" class="btn btn-danger" onclick="this.parentElement.remove()"><i class="fas fa-trash"></i></button>
            `;
            $('supplierProducts').appendChild(newItem);
        });
        $('supplierForm').onsubmit = function (e) {
            e.preventDefault();
            supplier.name = $('supplierName').value;
            supplier.products = [];
            document.querySelectorAll('.supplier-product').forEach(item => {
                const productId = parseInt(item.value);
                if (productId) {
                    supplier.products.push(productId);
                }
            });
            showNotification('Proveedor actualizado con éxito');
            loadSuppliers();
        };
    }
}

function deleteSupplier(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
        suppliers = suppliers.filter(s => s.id !== id);
        showNotification('Proveedor eliminado con éxito');
        loadSuppliers();
    }
}

function handleAutomationSubmit(e) {
    e.preventDefault();
    const name = $('automationName').value;
    const type = $('automationType').value;
    const active = $('automationActive').checked;

    let details = {};
    switch (type) {
        case 'restock':
            details = {
                product: parseInt($('automationProduct').value),
                threshold: parseInt($('automationThreshold').value),
                quantity: parseInt($('automationQuantity').value)
            };
            break;
        case 'report':
            details = {
                frequency: $('automationFrequency').value,
                day: $('automationDay').value
            };
            break;
        case 'price_update':
            details = {
                percentage: parseFloat($('automationPercentage').value),
                frequency: $('automationFrequency').value,
                day: parseInt($('automationDay').value)
            };
            break;
    }

    const newTask = {
        id: automationTasks.length + 1,
        name,
        type,
        active,
        ...details
    };

    automationTasks.push(newTask);
    showNotification('Tarea de automatización creada con éxito');
    loadAutomation();
}

function updateAutomationForm() {
    const type = $('automationType').value;
    let html = '';
    switch (type) {
        case 'restock':
            html = `
                <select id="automationProduct" required>
                    <option value="">Seleccionar producto</option>
                    ${products.map(product => `<option value="${product.id}">${product.name}</option>`).join('')}
                </select>
                <input type="number" id="automationThreshold" placeholder="Umbral de stock" required>
                <input type="number" id="automationQuantity" placeholder="Cantidad a pedir" required>
            `;
            break;
        case 'report':
            html = `
                <select id="automationFrequency" required>
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                </select>
                <input type="text" id="automationDay" placeholder="Día (lunes, 1, etc.)" required>
            `;
            break;
        case 'price_update':
            html = `
                <input type="number" id="automationPercentage" placeholder="Porcentaje de ajuste" step="0.01" required>
                <select id="automationFrequency" required>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                </select>
                <input type="number" id="automationDay" placeholder="Día del mes (1-31)" min="1" max="31" required>
            `;
            break;
    }
    $('automationDetails').innerHTML = html;
}

function editAutomationTask(id) {
    const task = automationTasks.find(t => t.id === id);
    if (task) {
        $('automationName').value = task.name;
        $('automationType').value = task.type;
        $('automationActive').checked = task.active;
        updateAutomationForm();
        switch (task.type) {
            case 'restock':
                $('automationProduct').value = task.product;
                $('automationThreshold').value = task.threshold;
                $('automationQuantity').value = task.quantity;
                break;
            case 'report':
                $('automationFrequency').value = task.frequency;
                $('automationDay').value = task.day;
                break;
            case 'price_update':
                $('automationPercentage').value = task.percentage;
                $('automationFrequency').value = task.frequency;
                $('automationDay').value = task.day;
                break;
        }
        $('automationForm').onsubmit = function (e) {
            e.preventDefault();
            task.name = $('automationName').value;
            task.type = $('automationType').value;
            task.active = $('automationActive').checked;
            switch (task.type) {
                case 'restock':
                    task.product = parseInt($('automationProduct').value);
                    task.threshold = parseInt($('automationThreshold').value);
                    task.quantity = parseInt($('automationQuantity').value);
                    break;
                case 'report':
                    task.frequency = $('automationFrequency').value;
                    task.day = $('automationDay').value;
                    break;
                case 'price_update':
                    task.percentage = parseFloat($('automationPercentage').value);
                    task.frequency = $('automationFrequency').value;
                    task.day = parseInt($('automationDay').value);
                    break;
            }
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
document.addEventListener('DOMContentLoaded', function () {
    showScreen('login-screen');
});