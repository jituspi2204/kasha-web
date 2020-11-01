import axios from "axios";
const call = axios.create({
  baseURL: "https://immense-hollows-05754.herokuapp.com",
});
export default call;
