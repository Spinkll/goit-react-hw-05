import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ items, onImageClick }) => (
  <ul className={css.gallery}>
    {items.map((image) => (
      <li key={image.id} className={css.item}>
        <ImageCard image={image} onClick={onImageClick} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
