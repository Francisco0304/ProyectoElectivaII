console.log("holaa")

async function registrar() {
    try {
        console.log("aqui estoy 1")
        // Obtener los valores del formulario
        const year = document.getElementById("yearInput").value;
        const name = document.getElementById("titleInput").value;
        const pages = document.getElementById("pagesInput").value;
        const author = document.getElementById("authorInput").value;
        
        console.log(year);
        // Crear el objeto de datos del libro
        const data = {
            year: parseInt(year),
            name: name,
            pages: parseInt(pages),
            author: author,
            status: "available" // Por defecto, establecer el estado como disponible
        };

        // Realizar la solicitud POST
        const response = await fetch("https://localhost:3000/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verificar si la respuesta fue exitosa
        if (response.ok) {
            // Si la respuesta es exitosa, mostrar mensaje de éxito
            console.log('Libro guardado exitosamente');
            alert('¡Libro guardado exitosamente!');
            window.location.href = "https://frontluis.vercel.app/"
        } else {
            // Si la respuesta no es exitosa, mostrar mensaje de error
            console.error('Hubo un error al guardar el libro:', response.status);
            alert('Hubo un error al guardar el libro. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        // Si hay algún error en la solicitud, mostrar mensaje de error
        console.error('Error al enviar la solicitud:', error);
        alert('Error al guardar el libro. Por favor, inténtalo de nuevo.');
    }

    // Asignar evento de clic al botón guardar
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('saveButton').addEventListener('click', registrar);
    });
}    
