import gsap from "gsap";
import {
  ScrollToPlugin
} from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default () => {
  const map = document.querySelector(".contacts__map");
  const btns = Array.from(document.querySelectorAll(".contacts__btn"));
  const contents = Array.from(document.querySelectorAll(".contacts__content-item"));
  const mapBtns = document.querySelectorAll(".contacts__table-btn");
  const header = document.querySelector('.header');

  const mapCoords = [];

  let contactsMap;

  if (!map) return;
  const mapMarker = document.querySelector(".contacts__map").dataset.icon;

  function init() {
    let zoom = 16;
    let center = mapCoords[0].coords.split(',');

    contactsMap = new ymaps.Map(
      map, {
      center: center,
      zoom: zoom,
      controls: [],
    }, {
      searchControlProvider: "yandex#search",
    }
    )

    let housesCollection = new ymaps.GeoObjectCollection(null, {
      hideIconOnBalloonOpen: false,
    });

    // contactsMap.behaviors.disable('scrollZoom');
    // contactsMap.behaviors.disable('drag');

    // проходимся по бз и подставляем иконки на карту
    mapCoords.forEach(({coords, adress}) => {
      const marker = new ymaps.Placemark(coords.split(','), {
        balloonContent: adress
      }, {
        iconLayout: 'default#image',
        iconImageHref: mapMarker,
        iconImageSize: [58, 58],
        iconImageOffset: [-29, -29],
      });

      contactsMap.geoObjects.add(marker);
    });

    contactsMap.geoObjects.add(housesCollection);

    contactsMap.setCenter(center);
  };

  ymaps.ready(init);

  btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.add("button--secondary"));
      contents.forEach(c => c.classList.remove("is-active"));

      btn.classList.remove("button--secondary");

      contents[i].classList.add("is-active");

      gsap.to(window, {
        scrollTo: {
          y: ".contacts__heading-row",
          offsetY: 50,
        },
      });
    });
  });

  mapBtns.forEach(btn => {
    const mapcoord = btn.dataset.coords;
    const adrs = btn.dataset.adres;

    mapCoords.push({
      coords: mapcoord,
      adress: adrs
    });

    btn.addEventListener("click", () => {
      const mapCenter = btn.dataset.coords;
      contents.forEach(c => c.classList.remove("is-active"));
      btns.forEach(b => b.classList.add("button--secondary"));

      btns[0].classList.remove("button--secondary");

      contents[0].classList.add("is-active");

      contactsMap.setCenter(mapCenter.split(","));

      gsap.to(window, {
        scrollTo: {
          y: ".contacts__heading-row",
          offsetY: 50,
        },
      });
    });
  });
};
