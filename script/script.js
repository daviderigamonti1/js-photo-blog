/*

*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
*Bonus*
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata

https://jsonplaceholder.typicode.com/
Font: Edu Tas Beginner

*/

const baseUrl = "https://jsonplaceholder.typicode.com/"
const resource = "photos";

const endPoint = baseUrl + resource;
const params = { "_limit": 6 };

const container = document.getElementById("cardsContainer");
axios.get(baseUrl + resource, { params }).then((res) => {
    drawCard(res);
});
function drawCard(res) {
    const photos = res.data;
    let template = "";
    for (let i = 0; i < photos.length; i++) {
        template += `
            <div class="col debug">
                <div class="card">
                    <div class="card-image">
                        <img src="${photos[i].url}" alt="">
                    </div>
                    <div class="card-text">
                        <p>${photos[i].title}</p>
                    </div>
                </div>
            </div>
        `
        container.innerHTML = template;
    };
}