import { $$, byId } from "js/helper";

export const menuHandler = () => {
  byId("menu-toggle").addEventListener("click", () => {
    byId("site-menu").classList.toggle("site-header__menu--is-active");
  });
};
