// Load JSON data
let films = [];

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        films = data;
        renderTable(films);
    })
    .catch(error => console.error('Error loading JSON:', error));

// Render table
function renderTable(data) {
    const tbody = document.querySelector('#filmTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    data.forEach(film => {
        const row = document.createElement('tr');

        // Title
        const titleCell = document.createElement('td');
        titleCell.textContent = film.title;
        row.appendChild(titleCell);

        // Release Year
        const yearCell = document.createElement('td');
        yearCell.textContent = film.release_year;
        row.appendChild(yearCell);

        // Directors
        const directorCell = document.createElement('td');
        film.director.split(';').forEach(director => {
            const label = document.createElement('span');
            label.className = 'label';
            label.textContent = director.trim();
            directorCell.appendChild(label);
        });
        row.appendChild(directorCell);

        // Box Office
        const boxOfficeCell = document.createElement('td');
        boxOfficeCell.textContent = `${film.box_office.toLocaleString()}`;
        row.appendChild(boxOfficeCell);

        // Countries
        const countryCell = document.createElement('td');
        film.country.split(';').forEach(country => {
            const label = document.createElement('span');
            label.className = 'label';
            label.textContent = country.trim();
            countryCell.appendChild(label);
        });
        row.appendChild(countryCell);

        tbody.appendChild(row);
    });
}

// Filter table by title
function filterTable() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm));
    renderTable(filteredFilms);
}

// Sort table
function sortTable() {
    const sortBy = document.getElementById('sort').value; // Get the field to sort by
    const sortOrder = document.getElementById('sort-order').value; // Get the sorting order (asc/desc)

    const sortedFilms = [...films].sort((a, b) => {
        let comparison = 0;

        // Compare based on the selected field
        if (sortBy === 'title') {
            comparison = a.title.localeCompare(b.title);
        } else if (sortBy === 'release_year') {
            comparison = a.release_year - b.release_year;
        } else if (sortBy === 'box_office') {
            comparison = a.box_office - b.box_office;
        }

        // Reverse the comparison for descending order
        if (sortOrder === 'desc') {
            comparison = -comparison;
        }

        return comparison;
    });

    renderTable(sortedFilms);
}

// Initial render
renderTable(films);