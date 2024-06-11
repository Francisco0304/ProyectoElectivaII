async function loadData() {
    console.log("aqui estoy 1");
    try {
        const result = await fetch("http://localhost:3000/user");
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        return result.json(); // Devolver los datos como JSON
        
    } catch (err) {
        console.error('Error fetching data:', err);
        return null;
    }
    
}

loadData()
    .then(data => {
        if (!data || !data.data) return; // Salir si no hay datos o no hay un array en data.data
        console.log(data);  // Verifica la estructura de los datos
        const userCount = document.querySelector("#tboody");
        if (userCount) {
            userCount.textContent = data.data.length;  // Actualiza el número de usuarios
            console.log(userCount.textContent);
        } else {
            console.error('Element #user-count not found');
        }

        const tBody = document.querySelector("#tBody");  // Si tienes una tabla para mostrar los usuarios
        data.data.forEach(user => {
            const row = document.createElement('tr');

            const colName = document.createElement('td');
            colName.appendChild(document.createTextNode(user.name));
            row.append(colName);

            const colEmail = document.createElement('td');
            colEmail.appendChild(document.createTextNode(user.email));
            row.append(colEmail);

            const colNameBook = document.createElement('td');
            colNameBook.appendChild(document.createTextNode(user.book));
            row.append(colNameBook)
            
            const colUserId = document.createElement('td');
            colUserId.appendChild(document.createTextNode(user._id));
            row.append(colUserId)

            tBody.appendChild(row);
        });
    })
    .catch(err => console.error('Error processing data:', err));
