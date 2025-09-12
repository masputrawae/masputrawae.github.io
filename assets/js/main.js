import { linkPreviewHandler } from "./link-preview";
import { searchHandler } from "./search";

const main = () => {
  linkPreviewHandler();
  searchHandler();
};

document.addEventListener("DOMContentLoaded", main);
