import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import {  Dropdown, Menu } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import medicines from "../../../../Assets/Images/medicines.png";
import fruits from "../../../../Assets/Images/fruits.png";
import appointment from "../../../../Assets/Images/appointment.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Instance } from "../../../../AxiosConfig";
import ReactPlayer from "react-player";
import AddVideo from "./AddVideo";
import EditVideo from "./EditVideo";
import { showDeleteMessage } from "../../../../globalConstant";
import {
  deleteHelloDoctorVideos,
  setHelloDoctorVideos,
} from "../../../../Features/HelloDoctorSlice";
import { useDispatch, useSelector } from "react-redux";

export const HelloDoctorList = () => {
  const [playingVideo] = useState(null);
  const [modals, setModals] = useState({
    event: false,
    video: false,
    edit: false,
  });
  const [, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.videos);
  useEffect(() => {
    console.log("Videos updated:", videos);
  }, [videos]);
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

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    toggleModal("edit");
  };

  const handleDeleteClick = (_id) => {
    showDeleteMessage({
      message: "",
      onDelete: async () => {
        try {
          const response = await Instance.delete(`/videos/${_id}`);
          if (response.status === 200 || response.status === 204) {
            dispatch(deleteHelloDoctorVideos(_id));
          }
        } catch (error) {
          console.error("Error deleting video:", error);
        }
      },
    });
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

  const sortMenu = (video) => (
    <Menu>
      <Menu.Item
        key="edit"
        className="filter-menu-item"
        onClick={() => handleEditClick(video)}
      >
        <BiEdit style={{ color: "var(--primary-green)", marginRight: "4px" }} />
        Edit
      </Menu.Item>
      <Menu.Item
        key="delete"
        className="filter-menu-item"
        onClick={() => handleDeleteClick(video._id)}
      >
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

  const renderRecommendVideo = (video) => {
    const isPlaying = playingVideo === video._id;

    return (
      <div className="col-lg-4 recommend-video-page" key={video._id}>
        <div className="action-icon-container">
          <Dropdown overlay={sortMenu(video)} trigger={["click"]}>
            <button className="action-icon-button">
              <BsThreeDotsVertical
                className="recommended-video-action-button"
                color="var(--black-color)"
              />
            </button>
          </Dropdown>
        </div>
        <div className=" p-1">
          <ReactPlayer
            url={video.url}
            controls={true}
            playing={isPlaying}
            width="100%"
            height="200px"
          />
        </div>
        <div className="video-details mt-2">
          <h4>{video.title}</h4>
          <p style={{ color: "var(--black-color)" }}>{`${
            video.likes
          } Likes | ${new Date(video.createdAt).toLocaleDateString()}`}</p>
        </div>
      </div>
    );
  };

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

  const fetchVideoList = async () => {
    try {
      const response = await Instance.get("/videos");
      setVideoList(response.data);
      dispatch(setHelloDoctorVideos(response.data));
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideoList();
  }, []);

  return (
    <div className="row mt-4">
      <div className="marketing-categories-section">
       
        <div className="row mt-4">
          <div className="d-flex justify-content-between">
            <h6>Hello Doctor</h6>
            <button
              className="rfh-basic-button"
              onClick={() => toggleModal("video")}
            >
              <GoPlus size={20} /> Add Video
            </button>
          </div>
          <div className="mt-4">
            <Slider {...sliderSettings}>
              {videos.length > 0 ? (
                videos.map((video) => renderRecommendVideo(video))
              ) : (
                <p>No videos available</p>
              )}
            </Slider>
          </div>
          <AddVideo
            open={modals.video}
            handleCancel={() => toggleModal("video")}
            refreshList={fetchVideoList}
          />
          <EditVideo
            open={modals.edit}
            handleCancel={() => toggleModal("edit")}
            videoData={selectedVideo}
            refreshList={fetchVideoList}
          />
        </div>
      </div>
    </div>
  );
};

export default HelloDoctorList;