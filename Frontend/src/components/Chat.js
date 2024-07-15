import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DepartmentHeader from './DepartmentLevel/DepartmentHeader';
import DepartmentSidebar from './DepartmentLevel/DepartmentSidebar';

const socket = io('http://localhost:1024', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

const Discussion = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:1024/api/v1/messages/recive/messages', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = { message };

      try {
        // Emit the message to the server via socket.io
        socket.emit('sendMessage', newMessage);
         setMessage('');
        // Save the message to the backend
        const response = await fetch('http://localhost:1024/api/v1/messages/send/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMessage),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Update the local state
      //  setMessages((prevMessages) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="max-w-[100%] overflow-x-hidden text-wrap">
      <DepartmentHeader />
      <div className="flex w-full">
        <DepartmentSidebar />
        <div className=" w-full ml-[18%] relative top-20 h-screen flex items-center">
          <div className="flex flex-col p-5 mx-auto max-w-3xl">
            <div className="flex flex-col w-[50vw] h-96 overflow-y-scroll border border-gray-300 p-4 mb-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 my-2 rounded-lg ${
                    msg.senderId === userId ? 'bg-green-200 self-end' : 'bg-white self-start border border-gray-200'
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 p-3 border border-gray-300 rounded-l-lg"
              />
              <button
                onClick={sendMessage}
                className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
