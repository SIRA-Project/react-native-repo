import Axios from "axios"
import { Path } from "./Path"

export const postImageAPI = data => {
  const fd = new FormData();
  fd.append("img", data);
  return Axios.post(`${Path}/post/post-img.php`, data);
}