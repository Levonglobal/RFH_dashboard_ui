import React, { useEffect, useMemo, useState } from "react";
import { Table, Dropdown, Button, Space } from "antd";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { BiSortAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import Empty_survey_image from "../../../../Assets/Icons/Notification.png";
import { showDeleteMessage } from "../../../../globalConstant";
import { GoPlus } from "react-icons/go";
import { Instance } from "../../../../AxiosConfig";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../Loader";
import DOMPurify from "dompurify";

import AddEventsList from "./AddEventsList";
import EditEventsList from "./EditEventsList";
import ViewEventList from "./ViewEventList";
import { setEvent } from "../../../../Features/DiscoverEventsCard";

const TableEventsList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventsData = useSelector((state) => state.discoverevent.events);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const itemsPerPage = 10;

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);
  const showEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);
  const showViewModal = (event) => {
    setSelectedEvent(event);
    setIsViewModalOpen(true);
  };
  const handleViewCancel = () => setIsViewModalOpen(false);

  const truncateText = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const fetchEventInfo = async (page) => {
    setIsLoading(true);
    try {
      const response = await Instance.get(`/discover/card`, {
        params: { page, limit: itemsPerPage },
      });
      dispatch(setEvent(response.data));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventInfo(currentPage);
  }, [currentPage]);

  const dataSource = useMemo(() => {
    if (!searchText.trim())
      return eventsData.map((event, index) => ({ ...event, key: index }));
    return eventsData
      .filter((event) =>
        `${event.title} ${event.description}`
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
      .map((event, index) => ({ ...event, key: index }));
  }, [searchText, eventsData]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => truncateText(text),
    },
    {
		title: "Order",
		dataIndex: "order",
		key: "order",
	  },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="campaign-performance-table-action-icons">
          <div
            className="campaign-performance-table-eye-icon"
            onClick={() => showViewModal(record)}
          >
            <FiEye />
          </div>
          <div
            className="campaign-performance-table-edit-icon"
            onClick={() => showEditModal(record)}
          >
            <FiEdit />
          </div>

          <div
            className="campaign-performance-table-delete-icon"
            // onClick={() => handleDeleteNews(record._id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ),
      className: "campaign-performance-table-column",
    },
  ];
  const items = [
    {
      label: "Last Day",
      key: "1",
    },
    {
      label: "Last week",
      key: "2",
    },
    {
      label: "Last Month",
      key: "3",
    },
  ];

  const handleMenuClick = ({ key }) => {};
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="container mt-1">
      {isLoading ? (
        <Loader />
      ) : dataSource.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Event List</h3>

            <div className="d-flex align-items-center gap-3">
              <button
                className="d-flex gap-2 align-items-center rfh-basic-button"
                onClick={showModal}
              >
                <GoPlus />
                Add Event
              </button>
            </div>
          </div>
          <div className="campaign-performance-table-head mt-4">
            <div className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-end">
              <div className="search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search anything here"
                  className="search-input-table"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2">
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      Sort By
                      <BiSortAlt2 />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div className="mt-3">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  current: currentPage,
                  pageSize: itemsPerPage,
                  total: eventsData.length,
                  onChange: setCurrentPage,
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="no-data-container">
          <img src={Empty_survey_image} alt="No events" />
          <h4>No Events Found</h4>
          <p>Try adding an event or check back later.</p>
          <Button onClick={showModal}>
            <FaPlus /> Add Event
          </Button>
        </div>
      )}
      <AddEventsList open={isModalOpen} handleCancel={handleCancel} />
      <EditEventsList
        open={isEditModalOpen}
        handleCancel={handleEditCancel}
        eventsData={selectedEvent}
      />
      <ViewEventList
        open={isViewModalOpen}
        handleCancel={handleViewCancel}
        eventsData={selectedEvent}
      />
    </div>
  );
};

export default TableEventsList;