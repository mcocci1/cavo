const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const output2 = document.getElementById('output2');
const calcolaButton = document.getElementById('calcola');
const pulisciButton = document.getElementById('pulisci');

// Imposta il focus sulla casella input1 all'apertura della pagina
input1.focus();

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


calcolaButton.addEventListener('click', () => {
    let num1 = parseFloat(input1.value.replace(/\./g, '')) || 0;
    let num2 = parseFloat(input2.value.replace(/\./g, '')) || 0;

    if (isNaN(num1) || isNaN(num2)) {
        alert("Inserisci solo valori numerici.");
        return;
    }

    const cavoTagliato = Math.abs(num1 - num2);

    output2.innerHTML = `<strong>Lunghezza spezzone m. ${formatNumber(cavoTagliato)}</strong>`;
});

pulisciButton.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    output2.innerHTML = '<strong>Lunghezza spezzone m. 0</strong>';
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
