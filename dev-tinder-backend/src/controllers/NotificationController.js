import { sendNotification } from "../services/fcmService.js";

export const postNotification = async (req, res) => {
  const { token, title, body } = req.body;
  try {
    const result = await sendNotification(token, title, body);
    res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};