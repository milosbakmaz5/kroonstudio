import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import "./ImagePreview.css";

const ImagePreview = ({ src, alt, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, [onClose]);
  return ReactDOM.createPortal(
    <div className="image-preview__container">
      <img src={src} alt={alt} />
    </div>,
    document.getElementById("imagePreview-hook")
  );
};

export default ImagePreview;
