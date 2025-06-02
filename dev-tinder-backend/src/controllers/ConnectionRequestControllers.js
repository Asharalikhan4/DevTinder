import printError from "../utils/printError.js";
import ConnectionRequestModel from "../models/ConnectionRequestModel.js";
import UserModel from "../models/UserModel.js";

export const sendConnectionRequest = async (req, res) => {
    // this api will send the connection request to the user or ignore the user
    try {
        const senderId = req?.user?._id;
        const { status, recieverId } = req?.params;

        const allowedStatus = ["ignored", "interested"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        };

        if(senderId?.equals(recieverId)) {
            return res.status(400).json({ message: "You can't send connection request to yourself"});
        };

        const recieverUserExists = await UserModel.findOne({ _id: recieverId });
        if (!recieverUserExists) {
            return res.status(400).json({ message: "User not found" });
        };

        // Below down we checking if there's any prior connection request is already sent or not between the sender and reciever
        const existingConnectionRequest = await ConnectionRequestModel.findOne({$or: [{ senderId, recieverId }, { senderId: recieverId, recieverId: senderId }]});
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection Request already exist" });
        };

        const connectionRequest = await ConnectionRequestModel.create({
            senderId,
            recieverId,
            status
        });

        const connectionRequestData = await connectionRequest.save();

        return res.status(200).json({ message: `${req?.user?.firstName} is ${status} in ${recieverUserExists?.firstName}`, data: connectionRequestData });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error sending connection request" });
    }
};

export const reviewConnectionRequest = async (req, res) => {
    // this api will accept or reject the connection request
    try {
        const loggedInUser = req?.user;
        const { status, requestId } = req?.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        };

        const connectionRequest = await ConnectionRequestModel.findOne({ _id: requestId, recieverId: loggedInUser?._id, status: "interested" });
        if (!connectionRequest) {
            return res.status(404).json({ message: "Connection Request not found" });
        };
        connectionRequest.status = status;
        const connectionRequestData = await connectionRequest?.save();
        
        return res.status(200).json({ message: `Connection request ${status}`, data: connectionRequestData });
    } catch (error) {
        printError(error);
        return res.status(400).json({ message: "Error reviewing connection request" });
    }
};