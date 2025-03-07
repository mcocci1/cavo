const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const output1 = document.getElementById('output1');
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
    let num3 = parseFloat(input3.value.replace(/\./g, '')) || 0;

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        alert("Inserisci solo valori numerici.");
        return;
    }

    const cavoTagliato = Math.abs(num2 - num3);
    const cavoRimasto = num1 - cavoTagliato;

    output1.textContent = `Cavo tagliato m. ${formatNumber(cavoTagliato)}`;
    output2.innerHTML = `<strong>Cavo rimasto m. ${formatNumber(cavoRimasto)}</strong>`;
});

pulisciButton.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    input3.value = '';
    output1.textContent = 'Cavo tagliato m. 0';
    output2.innerHTML = '<strong>Cavo rimasto m. 0</strong>';
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