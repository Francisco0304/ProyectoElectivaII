// Función para realizar la devolución del libro
async function realizarDevolucion() {
    try {
        // Obtener el ID del usuario desde el campo de texto
        const userID = document.getElementById("bookIDInput").value;
        console.log("ID del usuario:", userID);

        // Realizar la solicitud para obtener la información del usuario
        const userResponse = await fetch(`http://localhost:3000/user/${userID}`);
        if (!userResponse.ok) {
            throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        // Obtener la información del usuario
        const user = await userResponse.json();
        console.log(user);
        
        // Verificar si se encontró el usuario
        if (!user || !user.data) {
            throw new Error(`El usuario con ID ${userID} no se encontró.`);
        }

        // Obtener el ID del libro asociado al usuario
        const libroID = user.data.book;

        // Realizar la solicitud para obtener la información del libro
        const bookResponse = await fetch(`http://localhost:3000/books/${libroID}`);
        if (!bookResponse.ok) {
            throw new Error(`HTTP error! Status: ${bookResponse.status}`);
        }

        // Obtener la información del libro
        const libro = await bookResponse.json();

        // Verificar si se encontró el libro
        if (!libro) {
            throw new Error(`El libro asociado al usuario con ID ${userID} no se encontró.`);
        }

        // Cambiar el estado del libro a "available"
        libro.status = "available";

        // Realizar una solicitud PUT para actualizar el libro
        const updateResponse = await fetch(`http://localhost:3000/books/${libroID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        });

        // Verificar si la actualización del libro fue exitosa
        if (!updateResponse.ok) {
            throw new Error(`Error actualizando libro! Status: ${updateResponse.status}`);
        }

        // Realizar la solicitud DELETE para eliminar al usuario
        const deleteResponse = await fetch(`http://localhost:3000/user/${userID}`, {
            method: 'DELETE'
        });

        // Verificar si la eliminación del usuario fue exitosa
        if (!deleteResponse.ok) {
            throw new Error(`Error eliminando usuario! Status: ${deleteResponse.status}`);
        }

        // Mostrar mensaje de éxito
        alert(`Devolución realizada para el libro con ID ${libroID}. Estado actualizado a "available".`);

        // Limpiar el campo de texto
        document.getElementById("bookIDInput").value = '';
        window.location.href = "http://localhost:3200";
    } catch (error) {
        // Manejar errores
        console.error('Error realizando devolución:', error);
        alert('Ocurrió un error al realizar la devolución del libro.');
    }
}

// Asignar el evento de clic al botón "Realizar devolución libro"
document.querySelector("#btnRealizarDevolucion").addEventListener("click", realizarDevolucion);
