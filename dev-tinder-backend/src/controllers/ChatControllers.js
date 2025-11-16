import ChatModel from "../models/ChatModel.js";

export const getChat = async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  let chat = await ChatModel.findOne({
    participants: { $all: [userId, targetUserId] },
  }).populate({
    path: "messages.senderId",
    select: "firstName lastName",
  });
  if (!chat) {
    chat = new ChatModel({
      participants: [userId, targetUserId],
      messages: [],
    });
    await chat.save();
  }
  res.json(chat);
};
