import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { GoPlus } from "react-icons/go";
import { Button, Dropdown, Menu, Space } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import medicines from "../../../../Assets/Images/medicines.png";
import fruits from "../../../../Assets/Images/fruits.png";
import appointment from "../../../../Assets/Images/appointment.png";
import UpcomingEvents from "./UpcomingEvents";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";

export const UpcomingEventList = () => {
  const [modals, setModals] = useState({
    event: false,
    video: false,
    edit: false,
  });

  const toggleModal = (modalType) =>
    setModals((prev) => ({ ...prev, [modalType]: !prev[modalType] }));

  const items = [
    { label: "Upcoming Events", key: "1" },
    { label: "Recomended", key: "2" },
    { label: "Featured Programs", key: "3" },
    { label: "Latest Camps", key: "4" },
    { label: "Outstation Clinic", key: "5" },
  ];
  const handleMenuClick = ({ key }) => {};

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  const eventData = [
    {
      img: medicines,
      title: "Medicines",
      date: "Nov 25",
      description: "Order your medicines quickly and easily",
      department: "Gastroscience Department",
    },
    {
      img: appointment,
      title: "Appointments",
      date: "Nov 26",
      description: "Book your appointments without hassle",
      department: "Healthcare Services",
    },
    {
      img: fruits,
      title: "Fruits",
      date: "Nov 27",
      description: "Get fresh fruits delivered to your home",
      department: "Nutrition Department",
    },
  ];

  const filterMenu = (
    <Menu>
      <Menu.Item key="edit" className="filter-menu-item">
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item key="delete" className="filter-menu-item">
        <RiDeleteBin7Line
          style={{ color: "var(--red-color)", marginRight: "4px" }}
        />
        Delete
      </Menu.Item>
    </Menu>
  );

 const renderEventCard = (event) => (
    <div className="col-lg-4" key={event.title}>
      <div className="upcoming-event-card p-3">
        <div className="action-icon-container">
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical />
            </button>
          </Dropdown>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <img src={event.img} alt={event.title} />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-2">
            <h4>{event.title}</h4>
            <span>{event.date}</span>
          </div>
          <p>{event.description}</p>
          <ul>
            <li>{event.department}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <div>&#8592;</div>,
    nextArrow: <div>&#8594;</div>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
        <div className="d-flex flex-lg-row flex-xl-row flex-column justify-content-between align-items-center">
          <h4>Marketing Categories</h4>
          <div className="d-flex gap-3 align-items-center">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search anything here"
                className="search-input-table"
              />
            </div>
            <Dropdown menu={menuProps} overlayClassName="dropdown-hover-color">
              <Button>
                <Space>
                  <VscSettings />
                  Filter
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>

        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Upcoming Events</h6>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("event")}
            >
              <GoPlus size={20} /> Add Events
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {eventData.map((event) => renderEventCard(event))}
            </Slider>
          </div>
          <UpcomingEvents
            open={modals.event}
            handleCancel={() => toggleModal("event")}
          />
        </div>

        
      </div>
    </div>
  );
};

export default UpcomingEventList;