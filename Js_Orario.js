// ATTENZIONE PROPRIETA' PRIVATA SFRISO PAOLO //

function calcolaStato() {
    const oraSolare = new Date();
    const giorno = oraSolare.getDay();
    const h = oraSolare.getHours();
    const m = oraSolare.getMinutes();

    const adesso = (h * 60) + m;

    const apriMattina = (7 * 60) + 30;
    const chiudiMattina = (12 * 60) + 50;
    const apriPome = 16 * 60;
    const chiudiPome = (19 * 60) + 30;

    const banner = document.getElementById('statusBanner');
    const testoStato = document.getElementById('statusText');
    const testoContoRovescio = document.getElementById('countdownText');

    banner.className = 'status-banner';
    document.querySelectorAll('.day-block').forEach(riga => riga.classList.remove('today-highlight'));

    const rigaOggi = document.getElementById(`day-${giorno}`);
    if (rigaOggi) rigaOggi.classList.add('today-highlight');

    if (giorno === 0) {
        impostaNegozioChiuso(banner, testoStato, testoContoRovescio, "Ci vediamo Lunedì alle 07:30");
    }
    else if (giorno === 6) {
        if (adesso >= apriMattina && adesso < chiudiMattina) {
            impostaNegozioAperto(banner, testoStato, testoContoRovescio, chiudiMattina - adesso);
        } else {
            impostaNegozioChiuso(banner, testoStato, testoContoRovescio, "Ci vediamo Lunedì alle 07:30");
        }
    }
    else {
        if (adesso >= apriMattina && adesso < chiudiMattina) {
            impostaNegozioAperto(banner, testoStato, testoContoRovescio, chiudiMattina - adesso);
        }
        else if (adesso >= chiudiMattina && adesso < apriPome) {
            const attesa = apriPome - adesso;
            impostaNegozioChiuso(banner, testoStato, testoContoRovescio, `Al pomeriggio apriamo tra ${formattaTempo(attesa)}`);
        }
        else if (adesso >= apriPome && adesso < chiudiPome) {
            impostaNegozioAperto(banner, testoStato, testoContoRovescio, chiudiPome - adesso);
        }
        else {
            impostaNegozioChiuso(banner, testoStato, testoContoRovescio, "Adesso siamo chiusi. A domani!");
        }
    }
}

function impostaNegozioAperto(banner, titolo, sottoTitolo, minutiMancanti) {
    banner.classList.add('aperto');
    titolo.textContent = "● APERTO ORA";
    sottoTitolo.textContent = `Chiudiamo tra ${formattaTempo(minutiMancanti)}`;
}

function impostaNegozioChiuso(banner, titolo, sottoTitolo, testo) {
    banner.classList.add('chiuso');
    titolo.textContent = "○ CHIUSO ORA";
    sottoTitolo.textContent = testo;
}

function formattaTempo(minutiTotali) {
    const ore = Math.floor(minutiTotali / 60);
    const minuti = minutiTotali % 60;
    if (ore === 0) return `${minuti} min`;
    return `${ore} h e ${minuti} min`;
}

calcolaStato();
setInterval(calcolaStato, 15000);
