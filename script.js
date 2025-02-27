const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');
const calcolaButton = document.getElementById('calcola');
const pulisciButton = document.getElementById('pulisci');

// Imposta il focus sulla casella input1 all'apertura della pagina
input1.focus();

calcolaButton.addEventListener('click', () => {
    const num1 = parseFloat(input1.value) || 0;
    const num2 = parseFloat(input2.value) || 0;
    const num3 = parseFloat(input3.value) || 0;
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        alert("Inserisci solo valori numerici.");
        return;
    }
    const cavoTagliato = Math.abs(num2 - num3);
    const cavoRimasto = num1 - cavoTagliato;

    output1.textContent = `Cavo tagliato: ${cavoTagliato}`;
    output2.innerHTML = `<strong>Cavo rimasto: ${cavoRimasto}</strong>`;
});

pulisciButton.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    input3.value = '';
    output1.textContent = 'Cavo tagliato: 0';
    output2.innerHTML = '<strong>Cavo rimasto: 0</strong>';
    input1.focus();
});
