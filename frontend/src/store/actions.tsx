import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/hardcoded";
import cookie from "js-cookie";
import { ResponseJSON } from "../utils/types";

export const ACTIONS = {
  AUTH: "AUTH",
  LOADING: "LOADING",
};

export const LoginReq = async (): Promise<AxiosResponse | ResponseJSON> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/v1/login`,
      //   data: payload,
    });
    return response.data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};

export const EmployeesFetchReq = async (): Promise<
  AxiosResponse | ResponseJSON
> => {
  try {
    const token: string | undefined = cookie.get("token");
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/v1/employee/get`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    return { success: false, message: err.response.data.message };
  }
};
