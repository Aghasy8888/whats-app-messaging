import { useEffect } from 'react';

const useCloseModal = (
  modalIsOpen,
  setModalIsOpen,
  tag = 'dialog',
  ignoringElement
) => {
  const handleDocumentClick = (event) => {
    if (modalIsOpen && !event.target.closest(tag)) {
      
      if (
        event.target.closest(tag) ||
        (ignoringElement && event.target.closest(ignoringElement))
      ) {
        return;
      }

      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [modalIsOpen]);
};

export default useCloseModal;
