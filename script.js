document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener los valores de los campos de búsqueda
    var titleFilter = document.getElementById('searchTitle').value.toLowerCase();
    var universityFilter = document.getElementById('searchUniversity').value.toLowerCase();
    var communityFilter = document.getElementById('searchCommunity').value.toLowerCase();
    var ipFilter = document.getElementById('searchIP').value.toLowerCase();
    var financingFilter = document.getElementById('searchFinancing').value.toLowerCase();

    // Filtrar los proyectos (supongo que tienes una lista de proyectos en tu HTML o JS)
    var filteredProjects = projects.filter(function(project) {
        return (
            project.nombre.toLowerCase().includes(titleFilter) &&
            project.universidad.toLowerCase().includes(universityFilter) &&
            project.comunidad.toLowerCase().includes(communityFilter) &&
            project.IP.toLowerCase().includes(ipFilter) &&
            project.financiacion.toLowerCase().includes(financingFilter)
        );
    });

    // Mostrar los resultados filtrados en el mapa
    // Esta parte la vamos a simular con un simple alert para mostrar la cantidad de proyectos encontrados
    alert("Proyectos encontrados: " + filteredProjects.length);

    // Aquí puedes agregar más lógica si necesitas manipular el mapa más directamente
    // por ejemplo, eliminando marcadores existentes, mostrando nuevos, etc.
});
