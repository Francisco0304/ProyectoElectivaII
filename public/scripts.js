async function loadData() {
    console.log("Cargando datos...");
    try {
        const result = await fetch("https://backluis.vercel.app/books");
        if (!result.ok) {
            throw new Error(`¡Error HTTP! Estado: ${result.status}`);
        }
        return result.json(); // Devolver los datos como JSON
    } catch (err) {
        console.error('Error al obtener datos:', err);
        return null;
    }
}

function renderTableData(data) {
    const tBody = document.querySelector("#tBody");
    tBody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos

    if (!data || !data.data || data.data.length === 0) {
        tBody.innerHTML = "<tr><td colspan='4'>No hay datos disponibles</td></tr>";
        return;
    }

    data.data.forEach(book => {
        const row = document.createElement('tr');

        const colYear = document.createElement('td');
        colYear.textContent = book.year;
        row.appendChild(colYear);

        const colName = document.createElement('td');
        colName.textContent = book.name;
        row.appendChild(colName);

        const colPages = document.createElement('td');
        colPages.textContent = book.pages;
        row.appendChild(colPages);

        const colAuthor = document.createElement('td');
        colAuthor.textContent = book.author;
        row.appendChild(colAuthor);

        tBody.appendChild(row);
    });
}

loadData()
    .then(data => {
        renderTableData(data);
    })
    .catch(err => console.error('Error al procesar datos:', err));
