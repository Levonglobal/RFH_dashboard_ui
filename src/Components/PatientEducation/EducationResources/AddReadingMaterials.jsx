import React from "react";
import { Button, Modal, Form, Input, Row, Col, DatePicker } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { IoCloudUploadOutline } from "react-icons/io5";


const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic"],
    ["link", "image"],
    ["clean"],
  ],
};

const AddReadingMaterials = ({ open, handleCancel }) => (
  <Modal
    open={open}
    title={<span className="create-campaign-modal-title">Create Campaign</span>}
    onCancel={handleCancel}
    width={680}
    footer={[
      <Button
        key="back"
        onClick={handleCancel}
        className="create-campaign-cancel-button"
      >
        Cancel
      </Button>,
      <Button
        key="save"
        onClick={handleCancel}
        className="create-campaign-save-button"
      >
        Save
      </Button>,
    ]}
  >
    <Form layout="vertical" className="mt-4">
    <Form.Item label="Upload image">
        <Upload listType="picture" className="create-campaign-upload">
          <p className="create-campaign-ant-upload-text">
            Drop files here or click to upload
          </p>
          <span className="create-campaign-ant-upload-drag-icon">
            <IoCloudUploadOutline />{" "}
            <span style={{ color: "#727880" }}>Upload image</span>
          </span>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Input className="create-camapign-input" defaultValue="Acidity" />
        <span className="create-campaign-input-span">Event Title</span>
      </Form.Item>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              className="create-camapign-input"
              defaultValue="Gastroscience Department"
            />
            <span className="create-campaign-input-span">Department</span>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <Form.Item>
              <DatePicker
                className="add-events-datepicker"
                placeholder="21/11/2024"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
              <span className="create-campaign-input-span">Event Date</span>
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <ReactQuill
          theme="snow"
          modules={modules}
          placeholder="Write text here"
        />
        <span className="create-campaign-input-span">Reading Materials</span>
      </Form.Item>
    </Form>
  </Modal>
);

export default AddReadingMaterials;
