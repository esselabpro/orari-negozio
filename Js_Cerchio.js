// Ottenere il canvas e il contesto
let mioCanvas = document.getElementById("canvas1");
let context = mioCanvas.getContext("2d");

// Posizione iniziale e velocità separate per asse
let x = 150; 
let y = 100; 
let raggio = 50; 

// Gestendo le velocità separatamente hai il controllo totale del movimento diagonale
let velocitaX = 4;   
let velocitaY = 3; // Corrisponde al tuo "velocità / 2"

function aggiorna() {
    // Cancellare il canvas
    context.clearRect(0, 0, mioCanvas.width, mioCanvas.height);

    // Disegno del cerchio
    context.beginPath();
    context.fillStyle = "rgba(0, 250, 0, 0.8)";  // Verde trasparente
    context.arc(x, y, raggio, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.closePath();

    // Aggiorniamo le posizioni
    x += velocitaX;
    y += velocitaY;

    // --- GESTIONE RIMBALZI CORRETTA ---

    // Rimbalzo sui muri DESTRO e SINISTRO (Larghezza -> width)
    if (x + raggio >= mioCanvas.width || x - raggio <= 0) {
        velocitaX = -velocitaX; // Inverte solo il movimento orizzontale
    }

    // Rimbalzo sui muri SUPERIORE e INFERIORE (Altezza -> height)
    if (y + raggio >= mioCanvas.height || y - raggio <= 0) {
        velocitaY = -velocitaY; // Inverte solo il movimento verticale
    }

    // Ripetere l'animazione
    requestAnimationFrame(aggiorna);
}

// Avviare l'animazione
aggiorna();