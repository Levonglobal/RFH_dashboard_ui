import React, { useState } from "react";
import { Form, Select } from "antd";
import lightmode from "../../Assets/Images/lightmode.png";
import darkmode from "../../Assets/Images/darkmode.png";
import customcolor from "../../Assets/Images/customcolor.png";

import "react-international-phone/style.css";

export const Preferences = () => {
  const [form] = Form.useForm();

  const [activeTheme, setActiveTheme] = useState("light");

  return (
    <div className="settings-personal-information">
      <div className="container">
        <h4 className="mt-4 mt-lg-0">Preferences</h4>
        <p>Customisation according to your preferences</p>
        <hr />
        <Form layout="vertical" form={form}>
          <h5>Select Theme</h5>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="settings-theme-image">
                <img src={lightmode} alt="" />
                <p className={activeTheme === "light" ? "active" : ""}>
                  Light Mode (Active)
                </p>
              </div>
            </div>
            <div className=" col-md-4">
              <div className="settings-theme-image">
                <img src={darkmode} alt="" />
                <p className={activeTheme === "dark" ? "active" : ""}>
                  Dark Mode
                </p>
              </div>
            </div>
            <div className=" col-md-4">
              <div className="settings-theme-image">
                <img src={customcolor} alt="" />
                <p className={activeTheme === "custom" ? "active" : ""}>
                  Custom Colour
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-4 mt-4 theme-select-option">
              <p>Time Zone</p>
            </div>
            <div className="col-lg-8 mt-4">
              <Form.Item>
                <Select
                  className="settings-input"
                  placeholder="Select a time zone"
                  defaultValue="(UTC -08:00) Pacific Time (Los Angeles)"
                >
                  <Select.Option value="UTC-12:00">
                    (UTC -12:00) International Date Line West
                  </Select.Option>
                  <Select.Option value="UTC+05:30">
                    (UTC +05:30) India Standard Time
                  </Select.Option>
                  <Select.Option value="UTC+08:00">
                    (UTC +08:00) China Standard Time
                  </Select.Option>
                  <Select.Option value="UTC+09:00">
                    (UTC +09:00) Japan Standard Time
                  </Select.Option>
                  <Select.Option value="UTC+10:00">
                    (UTC +10:00) Australian Eastern Time
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mt-4 theme-select-option">
              <p>Language</p>
            </div>
            <div className="col-lg-8 mt-4">
              <Form.Item>
                <Select
                  className="settings-input"
                  placeholder="Select a Language"
                  defaultValue="English (US)"
                >
                  <Select.Option value="en-us">English (US)</Select.Option>
                  <Select.Option value="en-uk">English (UK)</Select.Option>
                  <Select.Option value="de">Deutsch (German)</Select.Option>
                  <Select.Option value="zh">中文 (Chinese)</Select.Option>
                  <Select.Option value="ja">日本語 (Japanese)</Select.Option>
                  <Select.Option value="kn">ಕನ್ನಡ (Kannada)</Select.Option>
                  <Select.Option value="hi">हिन्दी (Hindi)</Select.Option>
                  <Select.Option value="ar">العربية (Arabic)</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="row mt-4">
            <div className="d-flex justify-content-end gap-2">
              <button className="settings-delete-button" type="button">
                Cancel
              </button>
              <button className="settings-edit-icon-button" type="submit">
                Save
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};