const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const cercaButton = document.getElementById('cerca');
const risultatiDiv = document.getElementById('risultati');

input2.addEventListener('input', () => {
    let value = input2.value.replace(/\./g, '');
    if (!isNaN(parseFloat(value))) {
        input2.value = formatNumber(value);
    } else if (input2.value !== '') {
        input2.value = '';
    }
});

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function ricercaLineare(righe, codiceInterno) {
    for (let i = 1; i < righe.length; i++) {
        const colonne = righe[i].split(';');
        if (colonne[0] === codiceInterno) {
            return colonne;
        }
    }
    return null;
}

cercaButton.addEventListener('click', () => {
    const codiceInterno = input1.value;
    const lunghezza = parseFloat(input2.value.replace(/\./g, '')) || 0;

    fetch('cavi.csv')
        .then(response => response.text())
        .then(data => {
            const righe = data.split('\n');
            const risultato = ricercaLineare(righe, codiceInterno);

            if (risultato) {
                const peso1000m = parseFloat(risultato[4]);
                const pesoMetro = peso1000m / 1000;
                const pesoTotale = Math.round(pesoMetro * lunghezza);

                risultatiDiv.innerHTML = `
                    <p>Formato: ${risultato[6]}</p>
                    <p>Marca: ${risultato[1]}</p>
                    <p>Articolo: ${risultato[2]}</p>
                    <p>Peso appr. (kg/1000m): ${formatNumber(peso1000m)}</p>
                    <p><strong>Diametro appr. (mm): ${risultato[3]}</strong></p>
                    <p><strong>Peso totale (kg): ${formatNumber(pesoTotale)}</strong></p>
                `;
            } else {
                risultatiDiv.innerHTML = '<p>Cavo non trovato.</p>';
            }
        });
});