import io from "socket.io-client";

export const createSocketConnection = () => {
  return io(process.env.NEXT_PUBLIC_BASE_URL);
};