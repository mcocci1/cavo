function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

document.addEventListener('DOMContentLoaded', function() {
    const inputContainer = document.getElementById('input-container');
    const calcolaButton = document.getElementById('calcola');
    const pulisciButton = document.getElementById('pulisci');
    const output1 = document.getElementById('output1');
    const output2 = document.getElementById('output2');
    const output3 = document.getElementById('output3');
    const tabellaRisultatiDiv = document.getElementById('tabella-risultati');
    const primaCasella = document.getElementById('n_spezzoni_A');
    const marcaMetricaInizialeInput = document.getElementById('marca_metrica_iniziale');

    primaCasella.focus();

    marcaMetricaInizialeInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value) {
            this.value = formatNumber(parseInt(value));
        }
    });

    calcolaButton.addEventListener('click', function() {
        const sequenze = ['A', 'B', 'C', 'D', 'E'];
        let marcaMetrica = parseInt(marcaMetricaInizialeInput.value.replace(/\./g, '')) || 0;
        const direzione = document.querySelector('input[name="direzione"]:checked').value;
        let totaleLunghezza = 0;
        let totaleSpezzoni = 0;

        tabellaRisultatiDiv.innerHTML = '';

        const tabella = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const headers = ['Seq.', 'Spezz.', 'L','Inizio', 'Fine']; // Aggiunta di 'Lungh.'
        headers.forEach(headerText => {
            const header = document.createElement('th');
            header.textContent = headerText;
            headerRow.appendChild(header);
        });
        thead.appendChild(headerRow);
        tabella.appendChild(thead);

        sequenze.forEach(seq => {
            const nSpezzoni = parseInt(document.getElementById(`n_spezzoni_${seq}`).value) || 0;
            const lunghSpezzone = parseInt(document.getElementById(`lungh_spezzone_${seq}`).value) || 0;// Ottieni la lunghezza dello spezzone

            for (let i = 1; i <= nSpezzoni; i++) {
                let inizio = formatNumber(marcaMetrica);
                let fine = formatNumber(direzione === 'sale' ? marcaMetrica + lunghSpezzone : marcaMetrica - lunghSpezzone);
                totaleLunghezza += lunghSpezzone;
                totaleSpezzoni++;

                const row = document.createElement('tr');
                const cells = [seq,  i, lunghSpezzone, inizio, fine]; // Aggiunta di 'lunghSpezzone'
                cells.forEach(cellText => {
                    const cell = document.createElement('td');
                    cell.textContent = cellText;
                    row.appendChild(cell);
                });
                tbody.appendChild(row);

                marcaMetrica = direzione === 'sale' ? marcaMetrica + lunghSpezzone : marcaMetrica - lunghSpezzone;
            }
        });

        tabella.appendChild(tbody);
        tabellaRisultatiDiv.appendChild(tabella);

        output1.innerHTML = `<strong>Totale lunghezza cavo m. ${formatNumber(totaleLunghezza)}</strong>`;
        output2.innerHTML = `<strong>Totale spezzoni: ${totaleSpezzoni}</strong>`;
        output3.innerHTML = `<strong>Marca metrica finale: ${formatNumber(marcaMetrica)}</strong>`;

        tabellaRisultatiDiv.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                row.classList.toggle('tagliato');
            });
        });
    });

    pulisciButton.addEventListener('click', function() {
        const inputs = inputContainer.querySelectorAll('input[type="text"]');
        inputs.forEach(input => input.value = '');
        tabellaRisultatiDiv.innerHTML = ''; // Pulisce la tabella
        output1.innerHTML = '<strong>Totale lunghezza cavo m. 0</strong>';
        output2.innerHTML = '<strong>Totale spezzoni: 0</strong>';
        output3.innerHTML = '<strong>Marca metrica finale: 0</strong>';

        primaCasella.focus();
    });
});