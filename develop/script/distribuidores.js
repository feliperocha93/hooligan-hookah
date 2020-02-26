{
  const geoloBtn = document.getElementById('geolo-btn');
  const locations = [];

  function round(x) {
    return Math.round(x * 10) / 10;
  }

  function deg2rad(deg) {
    const rad = (deg * Math.PI) / 180;
    return rad;
  }

  // Cálculo de distância (fórmula retirada do google)
  function CalcRadiusDistance(lat1, lon1, lat2, lon2) {
    console.log("Chamando CalcRadiusDistance");
    // const RADIUSMILES = 3961;
    const RADIUSKILOMETERS = 6373;
    const latR1 = deg2rad(lat1);
    const lonR1 = deg2rad(lon1);
    const latR2 = deg2rad(lat2);
    const lonR2 = deg2rad(lon2);
    const latDifference = latR2 - latR1;
    const lonDifference = lonR2 - lonR1;
    const a = (Math.sin(latDifference / 2) ** 2) + Math.cos(latR1)
    * Math.cos(latR2)
    * (Math.sin(lonDifference / 2) ** 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const dm = c * RADIUSMILES;
    const dk = c * RADIUSKILOMETERS;
    // const mi = round(dm);
    const km = round(dk);
    return km;
  }

  // Obtém as coordenadas
  function showPosition(position) {
    console.log("showPosition");
    console.log(position);
    // const latitude = position.coords.latitude;
    const { coords: { latitude, longitude } } = position;
    let shorterDistance = 100000;
    let closest;
    // Chama a função que calcula distancia e compara a do navegador com as do JSON
    locations.forEach((location) => {
      const distance = CalcRadiusDistance(latitude, longitude, location.lat, location.long);
      if (distance < shorterDistance) {
        closest = location.name;
        shorterDistance = distance;
      }
    });
    // Exibe mensagem de sucesso e o nome (atribuido no json) do local mais próximo e esconde o btn
    const closestElement = document.getElementById(closest);
    window.scrollTo(0, closestElement.offsetTop);
    closestElement.classList.add('active');
  }

  // Verifica e utiliza a API de geolocation do navegador
  function getLocation(e) {
    console.log("getLocation");
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // eslint-disable-next-line no-alert
      alert('Você precisa permitir');
    }
  }

  // Escutar eventos de click
  if (geoloBtn) {
    geoloBtn.addEventListener('click', getLocation);
    // Preencher array de localizações
    fetch('./json/distribuidores.json')
      .then((response) => response.json())
      .then((json) => {
        json.locations.forEach((element) => locations.push(element));
      });
  }
}
