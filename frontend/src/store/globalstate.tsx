import { createContext, useReducer, useEffect, PropsWithChildren } from "react";
import reducers from "./reducers";
import cookie from "js-cookie";
import axios from "axios";
import { ACTIONS } from "./actions";
import { notifications } from "@mantine/notifications";
import { BASE_URL } from "../utils/hardcoded";
import { IGlobalState } from "../utils/types";

export const DataContext = createContext<IGlobalState>({});

export const DataProvider = ({ children }: PropsWithChildren) => {
  let initialState: IGlobalState = {};
  const [state, dispatch] = useReducer(reducers, initialState);
  const validateSession = async () => {
    // alert("T");
    const token: string | undefined = cookie.get("token");
    if (token) {
      dispatch({ type: ACTIONS.LOADING, payload: true });
      try {
        const response = await axios({
          method: "GET",
          url: `${BASE_URL}/v1/user/session`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          dispatch({ type: ACTIONS.AUTH, payload: response.data.data });
        }
      } catch (err: any) {
        cookie.remove("token");
        notifications.show({
          title: "Oops",
          message: err.response.data.message,
          color: "violet",
        });
        dispatch({ type: ACTIONS.AUTH, payload: null });
      }
      dispatch({ type: ACTIONS.LOADING, payload: false });
    } else dispatch({ type: ACTIONS.AUTH, payload: null });
  };

  useEffect(() => {
    validateSession();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
