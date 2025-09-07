import { linkPreviewHandler } from "./module_internal/preview-link";
import { searchHandler } from "./module_internal/search";
import { menuHandler } from "./module_internal/menu";

const main = () => {
  menuHandler();
  linkPreviewHandler();
  searchHandler();
};

document.addEventListener("DOMContentLoaded", main);
