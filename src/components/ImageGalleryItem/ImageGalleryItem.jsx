import PropTypes from "prop-types";
import { useState } from "react";
import { Modal } from "../Modal/Modal";
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const onToggleModal = () => {
    setShowModal((isModalOpen) => !isModalOpen);
  };

  return (
    <li className={css.galleryItem} onClick={onToggleModal}>
      <img className={css.image} src={webformatURL} alt="" />
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={onToggleModal} />
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onToggleModal: PropTypes.func,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
