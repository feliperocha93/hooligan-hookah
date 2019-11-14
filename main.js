"use strict";

{
  var round = function round(x) {
    return Math.round(x * 10) / 10;
  };

  var deg2rad = function deg2rad(deg) {
    var rad = deg * Math.PI / 180;
    return rad;
  }; // Cálculo de distância (fórmula retirada do google)


  var CalcRadiusDistance = function CalcRadiusDistance(lat1, lon1, lat2, lon2) {
    // const RADIUSMILES = 3961;
    var RADIUSKILOMETERS = 6373;
    var latR1 = deg2rad(lat1);
    var lonR1 = deg2rad(lon1);
    var latR2 = deg2rad(lat2);
    var lonR2 = deg2rad(lon2);
    var latDifference = latR2 - latR1;
    var lonDifference = lonR2 - lonR1;
    var a = Math.pow(Math.sin(latDifference / 2), 2) + Math.cos(latR1) * Math.cos(latR2) * Math.pow(Math.sin(lonDifference / 2), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // const dm = c * RADIUSMILES;

    var dk = c * RADIUSKILOMETERS; // const mi = round(dm);

    var km = round(dk);
    return km;
  }; // Obtém as coordenadas


  var showPosition = function showPosition(position) {
    // const latitude = position.coords.latitude;
    var _position$coords = position.coords,
        latitude = _position$coords.latitude,
        longitude = _position$coords.longitude;
    var shorterDistance = 100000;
    var closest; // Chama a função que calcula distancia e compara a do navegador com as do JSON

    locations.forEach(function (location) {
      var distance = CalcRadiusDistance(latitude, longitude, location.lat, location["long"]);

      if (distance < shorterDistance) {
        closest = location.name;
        shorterDistance = distance;
      }
    }); // Exibe mensagem de sucesso e o nome (atribuido no json) do local mais próximo e esconde o btn

    var closestElement = document.getElementById(closest);
    window.scrollTo(0, closestElement.offsetTop);
    closestElement.classList.add('active');
  }; // Verifica e utiliza a API de geolocation do navegador


  var getLocation = function getLocation(e) {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      // eslint-disable-next-line no-alert
      alert('Você precisa permitir');
    }
  }; // Escutar eventos de click


  var geoloBtn = document.getElementById('geolo-btn');
  var locations = [];

  if (geoloBtn) {
    geoloBtn.addEventListener('click', getLocation); // Preencher array de localizações

    fetch('/script/api/distribuidores.json').then(function (response) {
      return response.json();
    }).then(function (json) {
      json.locations.forEach(function (element) {
        return locations.push(element);
      });
    });
  }
}
{
  var mySiema = new Siema({
    perPage: {
      1024: 1
    }
  });
}
{
  var removeActiveClass = function removeActiveClass() {
    mainMenu.classList.remove(activeClass); // eslint-disable-next-line no-use-before-define

    events.forEach(function (event) {
      return document.removeEventListener(event, outsideClick);
    });
  };

  var outsideClick = function outsideClick(e) {
    if (e.touches) {
      if (e.touches[0].clientX > mainMenu.getBoundingClientRect().width) {
        removeActiveClass();
      }
    } else if (!e.touches) {
      if (e.clientX > mainMenu.getBoundingClientRect().width) {
        removeActiveClass();
      }
    }
  };

  var menuButtonClick = function menuButtonClick() {
    mainMenu.classList.add(activeClass);
    events.forEach(function (event) {
      return document.addEventListener(event, outsideClick);
    });
  };

  var menuButton = document.querySelector('.top-header > i');
  var mainMenu = document.querySelector('.main-menu');
  var events = ['click', 'touchstart'];
  var activeClass = 'active';
  events.forEach(function (event) {
    return menuButton.addEventListener(event, menuButtonClick);
  });
}