import propTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

export const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = (event) => {
    event.stopPropagation();
    if (event.currentTarget === event.target) onClose();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdrop}>
      <div className={css.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    document.querySelector("#portal")
  );
};

Modal.propTypes = {
  handleBackdrop: propTypes.func,
  largeImageURL: propTypes.string.isRequired,
};