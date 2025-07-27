"use client";
import { useEffect, useState, useRef } from "react";
// import { formatDistanceToNow } from "date-fns"; // keep date commented as requested
import { createSocketConnection } from "@/utils/socket";
import { useAuth } from "@/context/authContext";

interface ChatPageProps {
  params: {
    id: string;
  };
}

interface Message {
  id: string | number;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  status?: "sent" | "delivered" | "seen";
}

const ChatPage = ({ params }: ChatPageProps) => {
  const { id: targetUserId } = params;
  const { user } = useAuth();
  const userId = user?._id || "";
  const name = user?.name || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socketRef = useRef<any>(null); // persist socket connection

  // Scroll to the bottom when new messages come in
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Show the message immediately in UI
    const tempMessage: Message = {
      id: Date.now(),
      text: newMessage,
      senderId: userId,
      senderName: name,
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, tempMessage]);

    // Emit message via the same socket instance
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", {
        name,
        userId,
        targetUserId,
        newMessage,
      });
    }

    setNewMessage("");
  };

  // Listen for incoming messages
  useEffect(() => {
    if (userId && targetUserId) {
      const socket = createSocketConnection();
      socketRef.current = socket;

      // Join chat room
      socket.emit("joinChat", { name, userId, targetUserId });

      // Listen for messages
      socket.on("messageReceived", ({ name: senderName, userId: senderId, newMessage }) => {
        // Don't show my own message again
        if (senderId === userId) return;

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: newMessage,
            senderId,
            senderName,
            timestamp: new Date(),
            status: "delivered",
          },
        ]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userId, targetUserId, name]);

  // Auto scroll down on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#E94057] text-white px-4 py-3 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold truncate">Chat with {params?.id}</h1>
        <button
          className="text-sm border border-white px-3 py-1 rounded-md hover:bg-white hover:text-[#E94057] transition"
          onClick={() => history.back()}
        >
          Back
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-4">Start the conversation...</p>
        )}

        {messages.map((msg) => {
          const isMine = msg.senderId === userId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm relative ${
                  isMine
                    ? "bg-[#E94057] text-white rounded-br-none"
                    : "bg-white text-gray-800 border rounded-bl-none"
                }`}
              >
                {/* Show sender name if not mine */}
                {!isMine && (
                  <span className="text-[11px] text-gray-500 block mb-1">
                    {msg.senderName}
                  </span>
                )}

                {/* Message text */}
                <span>{msg.text}</span>

                {/* Timestamp & Status (commented as requested) */}
                {/* <div
                  className={`text-[10px] absolute -bottom-4 ${
                    isMine ? "right-2 text-gray-200" : "left-2 text-gray-400"
                  }`}
                >
                  {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                  {isMine && (
                    <span className="ml-1">
                      {msg.status === "seen"
                        ? "✓✓"
                        : msg.status === "delivered"
                        ? "✓"
                        : "•"}
                    </span>
                  )}
                </div> */}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E94057]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#E94057] hover:bg-[#e2233d] text-white px-4 rounded-md transition"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default ChatPage;
