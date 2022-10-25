import { disableScroll, enableScroll } from "../helpers/disableScroll";

export default () => {
  const btnOpen = document.querySelector(".header__mobile-menu");
  const btnClose = document.querySelector(".mobile-menu__close");
  const menu = document.querySelector(".mobile-menu");

  if (!btnOpen) return;

  btnOpen.addEventListener("click", () => {
    menu.classList.add("is-active");
    disableScroll();
  });

  btnClose.addEventListener("click", () => {
    menu.classList.remove("is-active");
    enableScroll();
  });
}
