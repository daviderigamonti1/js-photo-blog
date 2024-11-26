const baseUrl = "https://jsonplaceholder.typicode.com/"
const resource = "photos";

// Combinazione della base URL con la risorsa per ottenere l'endpoint completo
const endPoint = baseUrl + resource;
//Parametro per limitare il numero di foto
const params = { "_limit": 6 };

//Overlay
const overlay = document.getElementById("overlay");
const overlayBtn = overlay.querySelector("button");
const overlayImg = overlay.querySelector("#overlay img");

//Contenitore in cui saranno aggiunte le foto
const container = document.getElementById("cardsContainer");

// Effettuo una richiesta GET all'API con i parametri definiti
axios.get(baseUrl + resource, { params })

    //Quando la risposta è ricevuta correttamente richiamo le funzioni
    .then((res) => {
        drawCards(res);
        getFigures(res)
    })

    //In caso di errore nella richiesta
    .catch((error) => {
        console.log(error)
    });

//Funzione per creare tutte le cards ed aggiungerle nell'html
function drawCards(res) {

    //Ottengo i dati delle foto dalla risposta
    const photos = res.data;
    let template = "";

    //Ciclo su tutte le foto
    for (let i = 0; i < photos.length; i++) {
        template += `
            <div class="col">
                <div class="card">
                    <div class="card-image">
                        <img src="${photos[i].url}" alt="${photos[i].title}">
                    </div>
                    <div class="card-text">
                        <p>${photos[i].title}</p>
                    </div>
                    <img class="pin" src="img/pin.svg" alt="pin">
                </div>
            </div>
        `
    };
    container.innerHTML = template;
}

// Funzione per gestire l'overlay e la visualizzazione delle immagini ingrandite
function getFigures(res) {
    const photos = res.data;
    const images = document.querySelectorAll(".card-image img");

    //Ciclo su tutte le immagini
    images.forEach((image, index) => {

        //Evento al click sulle immagini
        image.addEventListener("click", function () {

            //Ottengo la foto selezionata in base all'indice
            const selectedPhoto = photos[index];

            // Imposto l'URL dell'immagine nell'overlay
            overlayImg.src = selectedPhoto.url;

            //Imposto il titolo dell'immagine nell'overlay
            overlayImg.alt = selectedPhoto.title;
            overlay.classList.remove("d-none");
        })

        // Evento per il bottone di chiusura dell'overlay
        overlayBtn.addEventListener("click", function () {
            overlay.classList.add("d-none");
        })
    });
}