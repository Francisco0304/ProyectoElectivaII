async function loadData() {
    console.log("Aquí estoy 1");
    try {
        const result = await fetch("https://luisgbackend.vercel.app/books");
        if (!result.ok) {
            throw new Error(`¡Error HTTP! Estado: ${result.status}`);
        }
        return result.json(); // Devolver los datos como JSON
    } catch (err) {
        console.error('Error al obtener datos:', err);
        return null;
    }
}

loadData()
    .then(data => {
        if (!data || !data.data) return; // Salir si no hay datos o no hay un array en data.data
        console.log(data);  // Verifica la estructura de los datos
        const bookCount = document.querySelector("#tbody");
        if (bookCount) {
            bookCount.textContent = data.data.length;  // Actualiza el número de libros
            console.log(bookCount.textContent);
        } else {
            console.error('Elemento #book-count no encontrado');
        }

        const tBody = document.querySelector("#tBody");  // Si tienes una tabla para mostrar los libros
        data.data.forEach(book => {
            const row = document.createElement('tr');

            const colYear = document.createElement('td');
            colYear.appendChild(document.createTextNode(book.year));
            row.append(colYear);

            const colName = document.createElement('td');
            colName.appendChild(document.createTextNode(book.name));
            row.append(colName);

            const colPages = document.createElement('td');
            colPages.appendChild(document.createTextNode(book.pages));
            row.append(colPages);

            const colAuthor = document.createElement('td');
            colAuthor.appendChild(document.createTextNode(book.author));
            row.append(colAuthor);

            tBody.appendChild(row);
        });
    })
    .catch(err => console.error('Error al procesar datos:', err));
