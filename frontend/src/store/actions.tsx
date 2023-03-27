import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/hardcoded";
import cookie from "js-cookie";
import { IUser, ResponseJSON } from "../utils/types";

export const ACTIONS = {
  AUTH: "AUTH",
  LOADING: "LOADING",
  LOGINMODAL: "LOGINMODAL",
};

export const LoginReq = async (
  payload: IUser
): Promise<AxiosResponse | ResponseJSON> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/v1/user/login`,
      data: payload,
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
export const SignupReq = async (
  payload: IUser
): Promise<AxiosResponse | ResponseJSON> => {
  try {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/v1/user/signup`,
      data: payload,
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const GetAllBooks = async (): Promise<AxiosResponse | ResponseJSON> => {
  try {
    const token: string | undefined = cookie.get("token");
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/v1/book/get-all`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const GetFavourites = async (): Promise<
  AxiosResponse | ResponseJSON
> => {
  try {
    const token: string | undefined = cookie.get("token");
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/v1/book/favourite/get`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const GetSpecificBook = async (
  _id: string | undefined
): Promise<AxiosResponse | ResponseJSON> => {
  try {
    const token: string | undefined = cookie.get("token");
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/v1/book/get/${_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err: any) {
    return err.response;
  }
};
