import React from "react";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  // {
  //   id: 2,
  //   text: "about",
  //   url: "/about",
  // },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const products_url = "https://course-api.com/react-store-products";

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;

export const svgTrueIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="100"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
  </svg>
);

export function rgbToHex(rgb) {
  var c = rgb.match(/\d+(\.\d+)?%?/g);
  if (c) {
    c = c.slice(0, 3).map(function (next) {
      var itm = next;
      if (itm.indexOf("%") != -1) {
        itm = Math.round(parseFloat(itm) * 2.55);
      }
      if (itm < 0) itm = 0;
      if (itm > 255) itm = 255;
      itm = Math.round(itm).toString(16);
      if (itm.length == 1) itm = "0" + itm;
      return itm;
    });
    return "#" + c.join("").toLowerCase();
  }
  return "";
}
