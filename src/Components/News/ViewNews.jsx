import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import DOMPurify from "dompurify";

const ViewNews = ({ open, handleCancel, newsData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [heading, setHeading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#1677ff");

  useEffect(() => {
    if (newsData) {
      setHeading(newsData.heading || "");
      setSubheading(newsData.subheading || "");
      setAbout(newsData.about || "");
      setContent(DOMPurify.sanitize(newsData.content || ""));
      setBackgroundColor(newsData.backgroundColor || "#1677ff");
      setUploadedImage(newsData.image || null);
    }
  }, [newsData]);

  return (
    <Modal
      visible={open}
      title={null}
      onCancel={handleCancel}
      className="view-news-modal"
      width={680}
      footer={[
        <Button
          key="back"
          onClick={handleCancel}
          className="create-campaign-cancel-button me-4"
        >
          Back
        </Button>,
      ]}
    >
      <div className="news-modal-container">
        <div
          className="news-modal-header d-flex justify-content-between align-items-center"
          style={{
            background: `linear-gradient(${backgroundColor},white )`,
          }}
        >
          <h2 className="news-heading">{heading}</h2>
          <div className="news-modal-image">
            {uploadedImage ? (
              <img src={uploadedImage} alt="News" className="news-image" />
            ) : (
              <div className="news-placeholder">No Image</div>
            )}
          </div>
        </div>
        <div className="news-modal-content">
          <h4 className="news-subheading">{subheading}</h4>
          <p className="news-about">{about}</p>
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewNews;