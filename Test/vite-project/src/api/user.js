import request from "../server/index";

export const userLogin = ({ usrname, password }) => {
  return request.post("/user/sign_in", { usrname, password });
};
export const userReg = ({ usrname, password, retype }) => {
  return request.post("/user/sign_up", { usrname, password, retype });
};
export const userSignOut = () => {
  return request.post("/user/sign_out");
};
export const useservice = () => {
  return request.post("/service");
};
