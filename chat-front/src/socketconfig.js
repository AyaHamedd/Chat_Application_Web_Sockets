import io from "socket.io-client";
const BASE_URL = "http://localhost:3001";
const socket = io(BASE_URL);
export default socket;