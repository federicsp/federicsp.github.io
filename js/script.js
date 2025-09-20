const csvPath = 'playlists.csv';

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines.shift().split(',');
    return lines.map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((h, i) => obj[h.trim()] = values[i].trim());
        return obj;
    });
}

fetch(csvPath)
.then(res => res.text())
.then(text => {
    const data = parseCSV(text);
    const tablesDiv = document.getElementById('tables');
    const sections = [...new Set(data.map(d => d.Section))];

    sections.forEach(sec => {
        const sectionData = data.filter(d => d.Section === sec);
        const table = document.createElement('table');

        const thead = document.createElement('thead');
        thead.innerHTML = `<tr><th>Title</th><th>Videos</th><th>Link</th></tr>`;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        sectionData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.Title}</td><td>${row.Videos}</td><td><a href="${row.Link}" target="_blank">Watch</a></td>`;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        tablesDiv.appendChild(document.createElement('h3')).innerText = sec;
        tablesDiv.appendChild(table);
    });
});
