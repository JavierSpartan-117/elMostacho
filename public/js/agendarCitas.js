function guardarDatos() {
    // Recoge los datos del formulario
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;

    // Envía los datos al servidor
    fetch('/elMostacho/agendarCita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, telefono}),
    })
    .then(response => response.json())
    .then(data => {
        // Procede a la siguiente etapa
        // Por ejemplo, ocultando el div de la etapa 1 y mostrando el de la etapa 2:
        document.getElementById('etapa1').style.display = 'none';
        document.getElementById('etapa2').style.display = 'block';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}