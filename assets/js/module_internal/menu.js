import { byId } from "js/helper";

export const menuHandler = () => {
  byId("menu-toggle").addEventListener("click", () => {
    byId("menu").classList.toggle("header__menu--is-active");
  });
};
