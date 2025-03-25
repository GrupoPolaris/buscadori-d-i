// Inicializar el mapa con Leaflet
var map = L.map('map').setView([40.0, -3.5], 6); // Centrado en España

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Diccionario con las coordenadas de las ciudades (como ejemplo)
var citiesCoordinates = {
    "Madrid": [40.4168, -3.7038],
    "Barcelona": [41.3851, 2.1734],
    "Valencia": [39.4699, -0.3763],
    "Sevilla": [37.3886, -5.9823],
    "Zaragoza": [41.6488, -0.8891]
    // Añadir más ciudades según sea necesario
};

// Array de proyectos (simulando los proyectos que tienes)
var projects = [
    {
        "id": 0,
        "nombre": "TECNICAS AVANZADAS DE INTELIGENCIA ARTIFICIAL",
        "IP": "Juan Ignacio Rivas Sánchez",
        "universidad": "Universidad de Valladolid",
        "comunidad": "Castilla y León",
        "financiacion": "87.782 €",
        "ciudad": "Valladolid"
    },
    {
        "id": 1,
        "nombre": "DESARROLLO DE MODELOS DE COMPORTAMIENTO DE USUARIOS",
        "IP": "Francisco Javier Páez Ayuso",
        "universidad": "Universidad Politécnica de Madrid",
        "comunidad": "Madrid",
        "financiacion": "169.400 €",
        "ciudad": "Madrid"
    },
    // Añadir más proyectos según sea necesario
];

// Crear un array para almacenar los marcadores del mapa
var markers = [];

// Función para actualizar el mapa según los filtros
function filterProjects() {
    var titleFilter = document.getElementById('searchTitle').value.toLowerCase();
    var universityFilter = document.getElementById('searchUniversity').value.toLowerCase();
    var communityFilter = document.getElementById('searchCommunity').value.toLowerCase();
    var ipFilter = document.getElementById('searchIP').value.toLowerCase();
    var financingFilter = document.getElementById('searchFinancing').value.toLowerCase();

    // Limpiar los marcadores actuales
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];

    // Filtrar proyectos
    var filteredProjects = projects.filter(project => {
        return (
            project.nombre.toLowerCase().includes(titleFilter) &&
            project.universidad.toLowerCase().includes(universityFilter) &&
            project.comunidad.toLowerCase().includes(communityFilter) &&
            project.IP.toLowerCase().includes(ipFilter) &&
            project.financiacion.toLowerCase().includes(financingFilter)
        );
    });

    // Agregar marcadores para los proyectos filtrados
    filteredProjects.forEach(project => {
        var coordinates = citiesCoordinates[project.ciudad];
        if (coordinates) {
            var marker = L.marker(coordinates)
                .addTo(map)
                .bindPopup(`
                    <b>${project.nombre}</b><br>
                    Universidad: ${project.universidad}<br>
                    IP: ${project.IP}<br>
                    Financiación: ${project.financiacion}
                `);
            markers.push(marker);
        }
    });
}

// Conectar la función de filtro con el formulario de búsqueda
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    filterProjects(); // Llamamos a la función de filtro
});
