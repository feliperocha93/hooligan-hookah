"use strict";var round=function(t){return Math.round(10*t)/10},deg2rad=function(t){return t*Math.PI/180},CalcRadiusDistance=function(t,e,n,o){var i=deg2rad(t),a=deg2rad(e),c=deg2rad(n),r=c-i,s=deg2rad(o)-a,u=Math.pow(Math.sin(r/2),2)+Math.cos(i)*Math.cos(c)*Math.pow(Math.sin(s/2),2),d=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u));return round(6373*d)},showPosition=function(t){var n,e=t.coords,o=e.latitude,i=e.longitude,a=1e5;locations.forEach(function(t){var e=CalcRadiusDistance(o,i,t.lat,t.long);e<a&&(n=t.name,a=e)});var c=document.getElementById(n);window.scrollTo(0,c.offsetTop),c.classList.add("active")},getLocation=function(t){t.preventDefault(),navigator.geolocation?navigator.geolocation.getCurrentPosition(showPosition):alert("Você precisa permitir")},geoloBtn=document.getElementById("geolo-btn"),locations=[];geoloBtn&&(geoloBtn.addEventListener("click",getLocation),fetch("/script/api/distribuidores.json").then(function(t){return t.json()}).then(function(t){t.locations.forEach(function(t){return locations.push(t)})}));var mySiema=new Siema({perPage:{1024:1}}),removeActiveClass=function(){mainMenu.classList.remove(activeClass),events.forEach(function(t){return document.removeEventListener(t,outsideClick)})},outsideClick=function(t){t.touches?t.touches[0].clientX>mainMenu.getBoundingClientRect().width&&removeActiveClass():t.touches||t.clientX>mainMenu.getBoundingClientRect().width&&removeActiveClass()},menuButtonClick=function(){mainMenu.classList.add(activeClass),events.forEach(function(t){return document.addEventListener(t,outsideClick)})},menuButton=document.querySelector(".top-header > i"),mainMenu=document.querySelector(".main-menu"),events=["click","touchstart"],activeClass="active";events.forEach(function(t){return menuButton.addEventListener(t,menuButtonClick)});