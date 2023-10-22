import axios from "axios";

export default axios.create({
  baseURL:
    `http://` +
    process.env.REACT_APP_API_BACKEND_URL +
    process.env.REACT_APP_API_BACKEND_PORT +
    `/api/`,
});
