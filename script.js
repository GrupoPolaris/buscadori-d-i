// Esperar a que la página cargue
document.addEventListener("DOMContentLoaded", function () {
    const proyectosContainer = document.getElementById("proyectos-lista");
    const inputBusqueda = document.getElementById("buscador");
    const filtros = {
        titulo: document.getElementById("filtro-titulo"),
        ip: document.getElementById("filtro-ip"),
        universidad: document.getElementById("filtro-universidad"),
        comunidad: document.getElementById("filtro-comunidad"),
        financiacion: document.getElementById("filtro-financiacion")
    };
    
    let proyectos = [];

    // Cargar proyectos desde el JSON
    fetch("proyectos.json")
        .then(response => response.json())
        .then(data => {
            proyectos = data;
            mostrarProyectos(proyectos);
        })
        .catch(error => console.error("Error cargando proyectos:", error));

    // Función para mostrar proyectos en la lista
    function mostrarProyectos(lista) {
        proyectosContainer.innerHTML = "";
        if (lista.length === 0) {
            proyectosContainer.innerHTML = "<p>No se encontraron proyectos.</p>";
            return;
        }
        lista.forEach(proyecto => {
            const div = document.createElement("div");
            div.classList.add("proyecto");
            div.innerHTML = `
                <h3>${proyecto.nombre}</h3>
                <p><strong>IP:</strong> ${proyecto.IP}</p>
                <p><strong>Universidad:</strong> ${proyecto.universidad}</p>
                <p><strong>Comunidad:</strong> ${proyecto.comunidad}</p>
                <p><strong>Financiación:</strong> ${proyecto.financiacion}</p>
                <a href="resumen.html?id=${proyecto.id}" target="_blank">Ver resumen</a>
            `;
            proyectosContainer.appendChild(div);
        });
    }

    // Función para filtrar los proyectos
    function filtrarProyectos() {
        let textoBusqueda = inputBusqueda.value.toLowerCase();
        let proyectosFiltrados = proyectos.filter(proyecto =>
            (filtros.titulo.value === "" || proyecto.nombre.toLowerCase().includes(filtros.titulo.value.toLowerCase())) &&
            (filtros.ip.value === "" || proyecto.IP.toLowerCase().includes(filtros.ip.value.toLowerCase())) &&
            (filtros.universidad.value === "" || proyecto.universidad.toLowerCase().includes(filtros.universidad.value.toLowerCase())) &&
            (filtros.comunidad.value === "" || proyecto.comunidad.toLowerCase().includes(filtros.comunidad.value.toLowerCase())) &&
            (filtros.financiacion.value === "" || proyecto.financiacion.includes(filtros.financiacion.value)) &&
            (textoBusqueda === "" || proyecto.nombre.toLowerCase().includes(textoBusqueda))
        );
        mostrarProyectos(proyectosFiltrados);
    }

    // Escuchar cambios en los filtros
    inputBusqueda.addEventListener("input", filtrarProyectos);
    Object.values(filtros).forEach(filtro => filtro.addEventListener("input", filtrarProyectos));
});
