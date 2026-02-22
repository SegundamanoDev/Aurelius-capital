import { io } from "socket.io-client";

// Use your backend URL.
const SOCKET_URL = "http://localhost:5000/api";
// "https://aurelius-backend-dsdm.onrender.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});
