import React from "react";
import { Form, Input, Row, Col, DatePicker, Select, Button } from "antd";
import { Option } from "antd/es/mentions";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Upload } from "antd";
import { useNavigate } from "react-router-dom";

const DoctorDetail = () => {
  const navigate = useNavigate();
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic"],
      ["link", "image"],
      ["clean"],
    ],
  };
  return (
    <div className="container">
      <div className="mt-4 campaign-performance-head">
        <h3>Doctor Detail</h3>
      </div>
      <div className="mt-3 doctor-detail-page-head">
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Patient Name"
                />
                <span className="create-campaign-input-span">First Name</span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Patient Name"
                />
                <span className="create-campaign-input-span">Last Name</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Mobile No"
                />
                <span className="create-campaign-input-span">Mobile No</span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Your Email ID"
                />
                <span className="create-campaign-input-span">Email ID</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <DatePicker
                  className="add-events-datepicker"
                  placeholder="Select Date"
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                />
                <span className="create-campaign-input-span">
                  Date Of Birth
                </span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select Gender"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">Male</Option>
                  <Option value="Medium">Female</Option>
                </Select>
                <span className="create-campaign-input-span">Gender</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Select Date"
                />
                <span className="create-campaign-input-span">Designation</span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select Department"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">Gastro</Option>
                  <Option value="Medium">Peptic Ulcers</Option>
                  <Option value="Medium">Stomach</Option>
                </Select>
                <span className="create-campaign-input-span">Department</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Your Address"
                />
                <span className="create-campaign-input-span">Address</span>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select City"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">Mumbai</Option>
                  <Option value="Medium">Bangalore</Option>
                </Select>
                <span className="create-campaign-input-span">City</span>
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select Country"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">India</Option>
                  <Option value="Medium">USA</Option>
                </Select>
                <span className="create-campaign-input-span">Country</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Select
                  className="create-camapign-input-select"
                  placeholder="Select State"
                  style={{ width: "100%" }}
                  dropdownClassName="create-campaign-dropdown"
                >
                  <Option value="Low">Mumbai</Option>
                  <Option value="Medium">Bangalore</Option>
                </Select>
                <span className="create-campaign-input-span">State</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Input
                  className="create-camapign-input"
                  placeholder="Enter Your code"
                />
                <span className="create-campaign-input-span">ZIP Code</span>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div className="d-flex gap-4 col-lg-12">
          <div className="col-lg-6">
            <Form.Item>
              <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Write text here"
              />
              <span className="create-campaign-input-span">
                Start Biography
              </span>
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <Form.Item>
              <Upload listType="picture" className="create-campaign-upload">
                <p className="create-campaign-ant-upload-text">
                  Drop image here
                </p>
                <span className="create-campaign-ant-upload-drag-icon">
                  <IoCloudUploadOutline color="var(--red-color)" size={20} />{" "}
                  <span className="create-campaign-input-span">
                    Upload Your Latest Photo
                  </span>
                </span>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-end gap-3">
        <Button
          key="back"
          className="create-campaign-cancel-button"
          onClick={() => navigate("/teleconsultation/virtual-management")}
        >
          Cancel
        </Button>
        <Button key="save" className="create-campaign-save-button">
          Save
        </Button>
      </div>
    </div>
  );
};

export default DoctorDetail;