import axios from "axios";
import { ASSEMBLY_API_KEY } from "../config/config.js";

export const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: ASSEMBLY_API_KEY,
    "content-type": "application/json",
  },
});
