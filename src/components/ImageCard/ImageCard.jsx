import React from "react";
import css from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => (
  <div className={css.card}>
    <img
      src={image.urls.small}
      alt={image.alt_description}
      className={css.image}
      onClick={() => onClick(image)}
    />
    <div className={css.info}>
      <p>{image.user.name}</p>
      <p>{image.likes} likes</p>
    </div>
  </div>
);

export default ImageCard;
