const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const output1 = document.getElementById('output1'); 
const output2 = document.getElementById('output2');
const calcolaButton = document.getElementById('calcola');
const pulisciButton = document.getElementById('pulisci');
const tabellaRisultati = document.getElementById('tabella-risultati');

// Imposta il focus sulla casella input1 all'apertura della pagina
input1.focus();

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

calcolaButton.addEventListener('click', () => {
    let num1 = parseFloat(input1.value.replace(/\./g, '')) || 0;
    let num2 = parseFloat(input2.value.replace(/\./g, '')) || 0;
    let num3 = parseFloat(input3.value.replace(/\./g, '')) || 0;
    const direction = document.querySelector('input[name="direction"]:checked').value;
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        alert("Inserisci solo valori numerici.");
        return;
    }

    // inserire algoritmo di calcolo
	const cavoTagliato = num1*num2;
	let mm_finale;

    if (direction === 'sale') {
        mm_finale = num3 + cavoTagliato;
    } else {
        mm_finale = num3 - cavoTagliato;
    }
	

    output1.innerHTML = `<strong>Totale lunghezza cavo m. ${formatNumber(cavoTagliato)}</strong>`;
    output2.innerHTML =`<strong>Marca metrica finale: ${formatNumber(mm_finale)}</strong>`;
	
	    // Genera la tabella
    let tabellaHTML = '<table><thead><tr><th>N. Spezzone</th><th>Inizio</th><th>Fine</th></tr></thead><tbody>';
    let marcaIniziale = num3;
    for (let i = 1; i <= num1; i++) {
        let marcaFinale;
        if (direction === 'sale') {
            marcaFinale = marcaIniziale + num2;
        } else {
            marcaFinale = marcaIniziale - num2;
        }
        tabellaHTML += `<tr><td>${i}</td><td>${formatNumber(marcaIniziale)}</td><td>${formatNumber(marcaFinale)}</td></tr>`;
        marcaIniziale = marcaFinale;
    }
    tabellaHTML += '</tbody></table>';
    tabellaRisultati.innerHTML = tabellaHTML;
	tabellaRisultati.querySelectorAll('tbody tr').forEach(row => {
        row.addEventListener('click', () => {
            row.classList.toggle('tagliato');
        });
    });
});

pulisciButton.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    input3.value = '';
    output1.innerHTML = '<strong>Totale lunghezza cavo m. 0</strong>';
	output2.innerHTML = '<strong>Marca metrica finale: 0</strong>';
	tabellaRisultati.innerHTML = ''; // Pulisce la tabella
    input1.focus();
});


input1.addEventListener('input', () => {
    let value = input1.value.replace(/\./g, '');
    if (!isNaN(parseFloat(value))) {
        input1.value = formatNumber(value);
    } else if (input1.value !== '') {
        input1.value = '';
    }
});

input2.addEventListener('input', () => {
    let value = input2.value.replace(/\./g, '');
    if (!isNaN(parseFloat(value))) {
        input2.value = formatNumber(value);
    } else if (input2.value !== '') {
        input2.value = '';
    }
});

input3.addEventListener('input', () => {
    let value = input3.value.replace(/\./g, '');
    if (!isNaN(parseFloat(value))) {
        input3.value = formatNumber(value);
    } else if (input3.value !== '') {
        input3.value = '';
    }
});