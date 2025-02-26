const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const output1 = document.getElementById('output1');
const output2 = document.getElementById('output2');
const calcolaButton = document.getElementById('calcola');
const pulisciButton = document.getElementById('pulisci');

input1.addEventListener('input', () => {
  input1.value = formatNumber(input1.value.replace(/\./g, ''));
});

input2.addEventListener('input', () => {
  input2.value = formatNumber(input2.value.replace(/\./g, ''));
});

input3.addEventListener('input', () => {
  input3.value = formatNumber(input3.value.replace(/\./g, ''));
});

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

    output1.textContent = `Cavo tagliato: ${formatNumber(cavoTagliato)}`;
	output2.innerHTML = `<strong>Cavo rimasto: ${formatNumber(cavoRimasto)}</strong>`;
});

pulisciButton.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    input3.value = '';
    output1.textContent = 'Cavo tagliato: 0';
    output2.innerHTML = '<strong>Cavo rimasto: 0</strong>';
    input1.focus();
});

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}