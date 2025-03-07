// Obtiene la lista de propiedades desde el servidor
function fetchProperties() {
    fetch('/properties')
        .then(response => response.json())
        .then(properties => {
            const propertyList = document.getElementById('propertyList');
            propertyList.innerHTML = ''; // Limpiar la lista antes de mostrarla

            properties.forEach(property => {
                const li = document.createElement('li');
                li.dataset.id = property.id; // Agregar el id a cada elemento de la lista
                li.innerHTML = `
                    <strong>ID:</strong> ${property.id} <br>
                    <strong>Dirección:</strong> ${property.address} <br>
                    <strong>Precio:</strong> ${property.price} <br>
                    <strong>Tamaño:</strong> ${property.size} <br>
                    <strong>Descripción:</strong> ${property.description} <br>
                    <button onclick="editProperty(${property.id})">Actualizar</button>
                    <button onclick="deleteProperty(${property.id})">Eliminar</button>
                    <hr>
                `;
                propertyList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching properties:', error));
}

// Agregar propiedad
function addProperty(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const address = document.getElementById('address').value;
    const price = parseFloat(document.getElementById('price').value);
    const size = parseInt(document.getElementById('size').value);
    const description = document.getElementById('description').value;

    const newProperty = {
        address: address,
        price: price,
        size: size,
        description: description
    };

    fetch('/properties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProperty)
    })
    .then(response => response.json())
    .then(() => {
        fetchProperties(); // Actualiza la lista después de agregar la propiedad
        document.getElementById('propertyForm').reset(); // Reinicia el formulario
    })
    .catch(error => console.error('Error adding property:', error));
}

// Editar propiedad
function editProperty(id) {
    // Obtener la propiedad específica desde el backend
    fetch(`/properties/${id}`)
        .then(response => response.json())
        .then(property => {
            // Rellena el formulario con los datos de la propiedad
            document.getElementById('address').value = property.address;
            document.getElementById('price').value = property.price;
            document.getElementById('size').value = property.size;
            document.getElementById('description').value = property.description;

            // Cambia el botón a "Actualizar" en lugar de "Agregar"
            const submitButton = document.querySelector('button[type="submit"]');
            submitButton.textContent = 'Actualizar';
            submitButton.onclick = function(event) {
                event.preventDefault(); // Prevenir el envío
                updateProperty(id); // Actualizar la propiedad con el id correspondiente
            };
        })
        .catch(error => console.error('Error fetching property for editing:', error));
}

// Actualizar propiedad
function updateProperty(id) {
    const address = document.getElementById('address').value;
    const price = parseFloat(document.getElementById('price').value);
    const size = parseInt(document.getElementById('size').value);
    const description = document.getElementById('description').value;

    const updatedProperty = {
        address: address,
        price: price,
        size: size,
        description: description
    };

    fetch(`/properties/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProperty)
    })
    .then(response => response.json())
    .then(() => {
        fetchProperties(); // Actualiza la lista después de actualizar la propiedad
        document.getElementById('propertyForm').reset(); // Reinicia el formulario
        // Restaurar el botón a su estado original
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.textContent = 'Agregar Propiedad';
        submitButton.onclick = addProperty; // Restaurar la acción de agregar
    })
    .catch(error => console.error('Error updating property:', error));
}

// Eliminar propiedad
function deleteProperty(id) {
    fetch(`/properties/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchProperties(); // Actualiza la lista después de eliminar la propiedad
    })
    .catch(error => console.error('Error deleting property:', error));
}

// Inicializa la lista de propiedades cuando la página cargue
document.addEventListener('DOMContentLoaded', fetchProperties);

// Establece el evento para el formulario
document.getElementById('propertyForm').addEventListener('submit', addProperty);
