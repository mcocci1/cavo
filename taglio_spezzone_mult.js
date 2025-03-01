const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const radioButtons = document.querySelectorAll('input[name="direction"]');
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

    // inserire algoritmo di calcolo
	const cavoTagliato = num1*num2;

    output1.textContent = `Totale lunghezza cavo m. ${formatNumber(cavoTagliato)}`;

});

pulisciButton.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    input3.value = '';
    output1.textContent = 'Totale lunghezza cavo m. 0';
    input1.focus();
});


radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        // Esegui la logica di calcolo qui
        console.log("Selezione cambiata:", document.querySelector('input[name="direction"]:checked').value);
    });
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