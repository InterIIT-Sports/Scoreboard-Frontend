import { io } from "socket.io-client";
import { ServerURL } from "./ApiEndpoints";

export const socket = io(ServerURL);
