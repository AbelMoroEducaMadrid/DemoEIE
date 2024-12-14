// dashboard.js

document.querySelectorAll('.tab').forEach(button => {
    button.addEventListener('click', function () {
        // Limpiar el contenido de las secciones actuales
        document.querySelectorAll('section').forEach(sec => sec.innerHTML = '');
        document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active-tab'));

        // Cambiar la clase activa en el botón seleccionado
        this.classList.add('active-tab');

        // Cargar la sección correspondiente
        const section = this.dataset.section;
        loadSection(section);
    });
});

function loadSection(section) {
    const sectionElement = document.getElementById(section);

    if (section === 'pedidos') {
        fetch('secciones/pedidos.html')
            .then(response => response.text())
            .then(data => {
                sectionElement.innerHTML = data;
                import('./secciones/pedidos.js').then(module => {
                    module.mostrarPedidos();
                });
            });
    }

    if (section === 'productos') {
        fetch('secciones/productos.html')
            .then(response => response.text())
            .then(data => {
                sectionElement.innerHTML = data;
                import('./secciones/productos.js').then(module => {
                    module.mostrarProductos();
                });
            });
    }
}
