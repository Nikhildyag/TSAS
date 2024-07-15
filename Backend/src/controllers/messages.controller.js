import { Central } from "../models/centralMember.model.js";
import { Department } from "../models/departmentCommittee.model.js";
import { Message } from "../models/messages.model.js";

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    if (!messages)
      return res.status(400).json({ message: "No messages found" });
    // console.log(messages);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    //console.log(message)
    if (!message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //console.log(req.member)
    const { _id, department, committee_name } = req.member;
    const newMessage = await Message.create({
      message,
      sender_id: _id,
      department,
      committee_name,
    });
    console.log(newMessage);
    if (!newMessage) {
      return res.status(500).json({ message: "unable to send message" });
    }
    return res.status(200).json({ newMessage });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getDepartmentMessages = async (req, res) => {
  try {
    //console.log(req);
    const { department, committee_name } = req.member;
    if (!department) {
      return res.status(400).json({ message: "you are not logged in" });
    }
    const messages = await Message.find({ department, committee_name });
    if (!messages)
      return res.status(400).json({ message: "Messages are not found" });
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getCentralMessages = async (req, res) => {
  try {
    const { committee_name } = req.member;
    const { department } = req.body;
    if (!department) {
      return res.status(400).json({ message: "department is required" });
    }
    const messages = await Message.find({ committee_name, department });
    if (!messages)
      return res.status(400).json({ message: "Messages are not found" });
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export {
  getMessages,
  createMessage,
  getDepartmentMessages,
  getCentralMessages,
};
