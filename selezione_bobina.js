const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const cercaButton = document.getElementById('cerca');
const risultatiDiv = document.getElementById('risultati');

const K = 1.10; // Costante per il coefficiente di correzione (+10%)

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
    const chiocciola = document.querySelector('input[name="chiocciola"]:checked').value;

    let fileBobine = 'bobine.csv';
    if (chiocciola === 'si') {
        fileBobine = 'bobine_chiocciola.csv';
    }

    fetch('cavi.csv')
        .then(response => response.text())
        .then(data => {
            const righeCavi = data.split('\n');
            const risultatoCavo = ricercaLineare(righeCavi, codiceInterno);

            if (risultatoCavo) {
                const diametroCavo = parseFloat(risultatoCavo[3].replace(',', '.'));  // corretta formula perchè il csv contiene i decimali con la virgola
                const peso1000m = parseFloat(risultatoCavo[4]);
                const pesoMetro = peso1000m / 1000;
                const pesoCavoTotale = Math.round(pesoMetro * lunghezza);

                // Calcolo del volume con sezione quadrata (corretto)
                const lunghezzaCorretta = lunghezza * K; // Aumenta la lunghezza utilizzando la costante K
                const volumeCavo = (diametroCavo / 100) ** 2 * (lunghezza * 10); // Volume in dmc (senza K)
                const volumeCavoConK = (diametroCavo / 100) ** 2 * (lunghezzaCorretta * 10); // Volume in dmc (con K)

                fetch(fileBobine)
                    .then(response => response.text())
                    .then(dataBobine => {
                        const righeBobine = dataBobine.split('\n');
                        let bobinaSelezionata = null;

                        for (let i = 1; i < righeBobine.length; i++) {
                            const colonneBobine = righeBobine[i].split(';');
                            const diametroBobina = parseInt(colonneBobine[0]);
                            const capacitaMassima = parseInt(colonneBobine[1]);
                            const portataMassima = parseInt(colonneBobine[2]);
                            const diametroMinimo = parseFloat(colonneBobine[3]);
                            const diametroMassimo = parseFloat(colonneBobine[4]);

                            if (diametroCavo >= diametroMinimo && diametroCavo <= diametroMassimo && volumeCavoConK <= capacitaMassima && pesoCavoTotale <= portataMassima) {
                                bobinaSelezionata = colonneBobine;
                                break;
                            }
                        }

                        if (bobinaSelezionata) {
                            const pesoBobina = parseInt(bobinaSelezionata[5]);
                            const pesoTotale = pesoCavoTotale + pesoBobina;
                            const percentualeVolumeUtilizzato = (volumeCavo / parseInt(bobinaSelezionata[1])) * 100;

                            risultatiDiv.innerHTML = `
                                <p>Formato: ${risultatoCavo[6]}</p>
                                <p>Marca: ${risultatoCavo[1]}</p>
                                <p>Articolo: ${risultatoCavo[2]}</p>
                                <p>Peso (kg/1000m): ${formatNumber(peso1000m)}</p>
                                <p><strong>Diametro (mm): ${risultatoCavo[3]}</strong></p>
                                <p><strong>Peso cavo (kg): ${formatNumber(pesoCavoTotale)}</strong></p>
                                <p><strong>Bobina cosigliata diam.: ${bobinaSelezionata[0]}</strong></p>
								<p><strong>Volume bobina utilizzato (%): ${percentualeVolumeUtilizzato.toFixed(2)}</strong></p>
                                <p><strong>Peso bobina (kg): ${formatNumber(pesoBobina)}</strong></p>
                                <p><strong>Peso totale (cavo + bobina) (kg): ${formatNumber(pesoTotale)}</strong></p>
                            `;
                        } else {
                            risultatiDiv.innerHTML = '<p>Nessuna bobina adatta trovata.</p>';
                        }
                    });
            } else {
                risultatiDiv.innerHTML = '<p>Cavo non trovato</p>';
            }
        });
});