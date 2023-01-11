import propTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';


export const Modal = ({onClose, largeImageURL}) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)}, )

  const handleBackdrop = event => {
    event.stopPropagation();
    if (event.currentTarget === event.target) onClose();
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape') onClose();
  };

  // componentDidMount() {
  //   const { handleKeyDown } = this;
  //   window.addEventListener('keydown', handleKeyDown);
  // }

  // componentWillUnmount() {
  //   const { handleKeyDown } = this;
  //   window.removeEventListener('keydown', handleKeyDown);
  // }

    // const { handleBackdrop } = this;
    // const { largeImageURL } = this.props;

    return createPortal(
      <div className={css.overlay} onClick={handleBackdrop}>
        <div className={css.modal}>
          <img src={largeImageURL} alt=""/>
        </div>
      </div>,
      document.querySelector('#portal')
    );
  }


Modal.propTypes = {
  handleBackdrop: propTypes.func,
  largeImageURL: propTypes.string.isRequired,
};
