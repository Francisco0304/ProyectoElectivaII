console.log("holaa");

async function registrar() {
    try {
        console.log("aqui estoy 1");
        // Obtener los valores del formulario
        const userName = document.getElementById("userInput").value;
        const userEmail = document.getElementById("mailInput").value;
        const bookName = document.getElementById("nameInput").value; // Agrega un campo para el nombre del libro

        console.log(bookName);
        // Realizar la solicitud GET para obtener el ID del libro
        const bookResponse = await fetch(`http://localhost:3000/books/search?name=${bookName}`);
        
        if (!bookResponse.ok) {
            throw new Error(`HTTP error! Status: ${bookResponse.status}`);
        }
        
        console.log("aqui estoy 2");
        const bookData = await bookResponse.json();
        console.log(bookData)
        
        if (!bookData.data || bookData.data.length === 0) {
            throw new Error(`No se encontró ningún libro con el nombre ${bookName}`);
        }
        
        const bookId = bookData.data[0]._id;

        console.log("aqui estoy 3");
        // Crear el objeto de datos del usuario
        const userData = {
            name: userName,
            email: userEmail
        };

        console.log("aqui estoy 4");
        // Verificar si el libro está disponible
        if (bookData.data[0].status !== 'available') {
            throw new Error(`El libro ${bookName} no está disponible para préstamo`);
        }

        // Realizar la solicitud POST para agregar al usuario al libro correspondiente
        const response = await fetch(`http://localhost:3000/user/${bookId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        console.log("aqui estoy 5");
        // Verificar si la respuesta fue exitosa
        if (response.ok) {
            // Actualizar el estado del libro a 'unavailable' usando PUT
            const updateResponse = await fetch(`http://localhost:3000/books/${bookId}`, {
                method: 'PUT', // Usar el método PUT para actualizar completamente el recurso
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...bookData.data[0], status: 'unavailable' }) // Actualizar el estado a 'unavailable'
            });

            if (updateResponse.ok) {
                // Si la actualización es exitosa, mostrar mensaje de éxito
                console.log('Préstamo realizado exitosamente y estado del libro actualizado');
                alert('¡Préstamo realizado exitosamente y estado del libro actualizado!');
                window.location.href = "http://localhost:3200/";
            } else {
                // Si la actualización no es exitosa, mostrar mensaje de error
                console.error('Hubo un error al actualizar el estado del libro:', updateResponse.status);
                alert('Préstamo realizado, pero hubo un error al actualizar el estado del libro. Por favor, inténtalo de nuevo.');
            }
        } else {
            // Si la respuesta no es exitosa, mostrar mensaje de error
            console.error('Hubo un error al realizar el préstamo:', response.status);
            alert('Hubo un error al realizar el préstamo. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        // Si hay algún error en la solicitud, mostrar mensaje de error
        console.error('Error al enviar la solicitud:', error);
        alert(error.message);
    }
}
