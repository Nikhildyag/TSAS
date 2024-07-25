import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Header from "./Home/Header.js";
import CentralAuthoritySidebar from "./Home/CentralAuthoritySidebar.js";
let socket, selectedChatCompare;

const ENDPOINT = "http://localhost:1024";

const CentralMembersChatBox = ({ userId }) => {
  const userInfo = JSON.parse(localStorage.getItem("central"));
  // console.log(userInfo);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    const response = await fetch(
      "http://localhost:1024/api/v1/messages/get/centralMessage",
      // http://localhost:1024/api/v1/messages/send/messageForCentral
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    console.log("fetched messages", data);
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
    var timerLength = 2000;
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
    const data = JSON.stringify(messageDetails);

    try {
      const response = await fetch(
        "http://localhost:1024/api/v1/messages/send/messageForCentral",
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

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => {
      setIsTyping(false);
      console.log("fghjk");
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
    selectedChatCompare = userInfo.department + userInfo.committee_name;
  }, [userInfo.department + userInfo.committee_name]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      console.log(messages);
      setMessages([...messages, newMessageRecieved]);
    });
  });

  return (
    <div className="max-w-[100%] h-screen overflow-x-hidden text-wrap">
      <Header />
      <div className="flex w-full">
        <CentralAuthoritySidebar />
        <div className="w-full md:ml-[18%] sm:ml-[0%] relative top-20 flex items-center">
          <div className="flex flex-col p-5 mx-auto max-w-3xl">
            <div className="flex flex-col md:w-[50vw] sm:w-[80vw] md:h-[30em] sm:h-[40em] overflow-y-scroll border border-gray-300 p-4 mb-4">
              {messages.length > 0 &&
                messages.map((m, index) => (
                  <p
                    className={
                      m.sender_id !== userInfo._id ? "text-left" : "text-right"
                    }
                    key={index}
                  >
                    {m.message}
                  </p>
                ))}
              {isTyping ? <div>Loading...</div> : <></>}
            </div>
            <div className="flex w-[50vw]">
              <input
                type="text"
                placeholder="Type a message"
                value={currentMessage}
                onChange={handleChange}
                className="flex-1 p-3 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
              >
                Send1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CentralMembersChatBox;
