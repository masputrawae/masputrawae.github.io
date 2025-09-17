import { linkPreviewHandler } from "./link-preview";
import { searchHandler } from "./search";

const main = () => {
  searchHandler();
  linkPreviewHandler();
};

document.addEventListener("DOMContentLoaded", main);
