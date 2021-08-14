import React, { useState } from "react";
import ImagePreview from "../../../shared/components/ImagePreview/ImagePreview";
import "./UserItem.css";

const UserItem = ({ id, profileImage, fileName, clicked, onItemClick }) => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const itemClickedHandler = () => {
    setShowImagePreview(true);
    onItemClick(id);
  };

  const imagePreviewClosedHandler = () => {
    setShowImagePreview(false);
  };

  return (
    <React.Fragment>
      {showImagePreview && (
        <ImagePreview
          src={profileImage}
          alt={fileName}
          onClose={imagePreviewClosedHandler}
        />
      )}
      <li className="user-item__container" onClick={itemClickedHandler}>
        <div
          className={`user-item__image ${
            clicked ? "user-item__image-clicked" : ""
          }`}
        >
          <img
            src={profileImage}
            alt={fileName}
            style={{ height: "100px", width: "100px" }}
          />
        </div>
        <p
          className={`user-item__filename ${
            clicked ? "user-item__filename-clicked" : ""
          }`}
        >
          {fileName}
        </p>
      </li>
    </React.Fragment>
  );
};

export default React.memo(UserItem);
