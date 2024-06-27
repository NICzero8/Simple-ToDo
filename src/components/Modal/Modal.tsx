import React, { ReactNode, useState } from "react";
import "./Modal.scss";

type ModalProps = {
  children: ReactNode,
  setAddisOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const Modal: React.FC<ModalProps> = ( {children, setAddisOpen} ) => {

  const [isClosing, setIsClosing] = useState<boolean>(false)

  function closeHandler () {
    setIsClosing(true)
    setTimeout(() => {
      setAddisOpen(false)
    }, 500)
  }
  
  return (
    <div className={isClosing ? "modal modal_close-animation" : "modal"}>
      <div className="modal_window">
        <button className="close-button" onClick={()=>closeHandler()}></button>
        {children}
      </div>
    </div>
  );
}

export default Modal
