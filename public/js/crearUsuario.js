// Obtener los roles del servidor
fetch('/roles')
    .then(response => response.json())
    .then(data => {
        // Obtener el Select del DOM
        const select = document.getElementById('selectRoles');

        // Iterar sobre los roles y crear las opciones del Select
        data.forEach(role => {
            const option = document.createElement('option');
            option.value = role.id;
            option.text = role.name;
            select.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al obtener los roles:', error);
    });