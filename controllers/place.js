const express = require("express");
const router = express.Router();
let data = require("../data/place.json");

router.get("/", (req, res) => {
  res.render("place", {
    title: "Place page",
    data: data.places,
    google_src: `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJod7tSseifDUR9hXHLFNGMIs&key=${process.env.Google}`,
    google_api: process.env.Google,
  });
});

// place Map API

/*
function setEventListener(places) {
  places.map((place) => {
    const place_name = document.querySelector(`.${place.name}`);
    if (place_name) {
      place_name.addEventListener("click", () => {
        const new_map = new google.maps.Map(document.querySelector(".map"), {
          center: { lat: place.lat, lng: place.lng },
          zoom: 15,
        });
        const loaction = new google.maps.Marker({
          position: { lat: place.lat, lng: place.lng },
          map: new_map,
        });
      });
    }
  });
}

function loadPlace() {
  return fetch("../data/place.json")
    .then((res) => res.json())
    .then((json) => json.places);
}

function display(places) {
  const container = document.querySelector(".places");
  container.innerHTML = places.map((place) => getHtmlstring(place)).join("");
}

function getHtmlstring(place) {
  return `
        
            <div class="place">
              <div class="${place.name}" title="click">
                <img src="${place.img}" alt="${place.name}"><br>
                <span class="place_name">${place.name}</span><br>
                <span class="place_des">${place.description}</span>
              </div>
            </div>
            
    `;
}

function changeSlide() {
  const prev = document.querySelector(".slide_two>.prev");
  const next = document.querySelector(".slide_one>.next");
  const slide1 = document.querySelector(".slide_one");
  const slide2 = document.querySelector(".slide_two");

  next.addEventListener("click", () => {
    slide2.style.display = "flex";
    slide1.style.display = "none";
  });

  prev.addEventListener("click", () => {
    slide2.style.display = "none";
    slide1.style.display = "flex";
  });
}

loadPlace()
  .then((places) => {
    console.log(places);
    display(places);
    initiateMap(places);
    setEventListener(places);
    changeSlide();
  })
  .catch(console.log);*/

module.exports = router;
