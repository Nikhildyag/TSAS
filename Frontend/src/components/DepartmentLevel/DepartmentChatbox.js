// DepartmentChatbox.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import DepartmentHeader from "./DepartmentHeader.js";
import DepartmentSidebar from "./DepartmentSidebar.js";
import ScrollableFeed from "react-scrollable-feed";
import { FaPaperPlane } from "react-icons/fa";
let socket;

const ENDPOINT = "http://localhost:1024"; // Adjust this to your server endpoint
// socket = io(ENDPOINT);

const DepartmentChatbox = () => {
  const userInfo = JSON.parse(localStorage.getItem("department"));
  // console.log(userInfo);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    const response = await fetch(
      "http://localhost:1024/api/v1/messages/get/departmentMessage",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    // console.log("fetched messages", data);
    setMessages(data.messages);
    socket.emit("join chat", userInfo.department + userInfo.committee_name);
  };

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", userInfo.department + userInfo.committee_name);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 1000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit(
          "stop typing",
          userInfo.department + userInfo.committee_name
        );
        setTyping(false);
      }
    }, timerLength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageDetails = {
      message: currentMessage,
    };
    setCurrentMessage("");
    const data = JSON.stringify(messageDetails);

    try {
      const response = await fetch(
        "http://localhost:1024/api/v1/messages/send/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Sending message failed");
      }

      const responseData = await response.json();
      //console.log(responseData);
      const newMessage = responseData.newMessage;

      socket.emit("sendMessage", newMessage);
      setMessages([...messages, newMessage]);

      // setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" && currentMessage) {
      e.preventDefault(); // Prevent default Enter key action
      handleSubmit(e);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
    return () => {
      socket.disconnect(); // Disconnect in cleanup function
    };
  }, []);

  // useEffect(() => {
  //   console.log("count");
  //   console.log(userInfo);

  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    fetchMessages();
  }, [userInfo.department + userInfo.committee_name]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      // console.log(messages);
      setMessages([...messages, newMessageRecieved]);
    });
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    // Extract hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Determine AM/PM
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format hours as "hh"
    const formattedHours = String(hours).padStart(2, "0");

    // Format the time as "hh:mm:ss AM/PM"
    return `${formattedHours}:${minutes}${ampm}`;
  };

  return (
    <div className="max-w-[100%] h-screen overflow-x-hidden text-wrap">
      <DepartmentHeader />
      <div className="flex w-full h-[88%]">
        <DepartmentSidebar />
        <div className=" md:ml-[18%] sm:ml-[0%] sm:h-full overflow-y-hidden relative top-20 flex w-full">
          <div className="flex flex-col p-4 mx-auto lg:w-[100%] sm:h-full md:max-w-full items-center ">
            <div className="flex flex-col lg:w-[90%] lg:h-[100%] md:w-[77%] sm:w-full md:h-[30em] overflow-y-scroll border border-gray-300 rounded-lg p-4 mb-4 bg-gray-100">
              <ScrollableFeed>
                <div className="flex flex-col space-y-4">
                  {messages.length > 0 &&
                    messages.map((m, index) => (
                      <div
                        className={`flex ${
                          m.sender_id !== userInfo._id
                            ? "justify-start"
                            : "justify-end"
                        }`}
                        key={index}
                      >
                        <div
                          className={`flex flex-col space-x-2 ${
                            m.sender_id !== userInfo._id
                              ? "bg-white text-gray-800"
                              : "bg-blue-500 text-white"
                          } max-w-xs md:max-w-md px-3 rounded-lg shadow`}
                        >
                          {m.user && (
                            <p
                              style={{ fontSize: "0.5rem" }}
                              className={` text-green-400 ${
                                m.sender_id == userInfo._id ? "hidden" : "block"
                              }`}
                            >
                              {m.user.Id_number}
                            </p>
                          )}
                          <p className="break-words">{m.message}</p>
                          <div className="flex justify-between gap-1">
                            <p style={{ fontSize: "0.5rem" }}>
                              {formatDate(m.createdAt)}
                            </p>
                            <p style={{ fontSize: "0.5rem" }}>
                              {formatTime(m.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {isTyping && (
                    <div className="text-green-500 font-bold text-sm">
                      typing...
                    </div>
                  )}
                </div>
              </ScrollableFeed>
            </div>
            <div className="flex w-full md:w-[90%] lg:w-[90%]">
              <input
                type="text"
                placeholder="Type a message"
                value={currentMessage}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
              >
                <FaPaperPlane className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChatbox;
