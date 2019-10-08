const   geoloBtn = document.getElementById('geolo-btn');
let     locations = [], messageError, messageSuccess;

//Listar localizações e definir mensagens
fetch('./distribuidores.json')
.then(response => response.json())
.then(json => {
    messageError = json.messages.error;
    messageSuccess = json.messages.success;
    json.locations.forEach(element => locations.push(element)
)})
.then(() => {
    locations.forEach(location => {
        let li = document.createElement("li");
        let liContent = document.createTextNode(location.name);
        li.appendChild(liContent);
        geoloList.appendChild(li); 
    })
})

//Escutar eventos de click
geoloBtn.addEventListener('click', getLocation);

//Verifica e utiliza a API de geolocation do navegador
function getLocation(e) {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        geoloP.innerHTML = messageError;
    }
}
//Obtém as coordenadas
function showPosition(position) {
    const   latitude = position.coords.latitude, 
            longitude = position.coords.longitude;
    let     shorterDistance = 100000,
            closest;
    //Chama a função que calcula distancia e compara a do navegador com as do JSON
    locations.forEach((location) => {
        var distance = CalcRadiusDistance(latitude, longitude, location.lat, location.long);
        if (distance < shorterDistance) {
            closest = location.name;
            shorterDistance = distance;
        }
    });

    //VAMOS MEXER AQUI PARA DAR O SCROLL

    //Exibe a mensagem de sucesso e o nome (atribuido no json) do local mais próximo e esconde o btn
    geoloP.innerText = `${messageSuccess} ${closest}`;
    geoloBtn.style.display = "none";
}
//Cálculo de distância (fórmula retirada do google)
function CalcRadiusDistance(lat1, lon1, lat2, lon2) {
    var RADIUSMILES = 3961,
        RADIUSKILOMETERS = 6373,
        latR1 = this.deg2rad(lat1),
        lonR1 = this.deg2rad(lon1),
        latR2 = this.deg2rad(lat2),
        lonR2 = this.deg2rad(lon2),
        latDifference = latR2 - latR1,
        lonDifference = lonR2 - lonR1,
        a  = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2),
        c  = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        dm = c * RADIUSMILES,
        dk = c * RADIUSKILOMETERS;
        this.mi = this.round(dm);
        this.km = this.round(dk);
        return km;
}
function deg2rad (deg) {
    const rad = deg * Math.PI / 180;
    return rad;
};
function round (x) {
    return Math.round(x * 10) / 10;
};