import { IAction, IGlobalState } from "../utils/types";
import { ACTIONS } from "./actions";

const reducers = (state: IGlobalState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return {
        ...state,
        user: action.payload,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.LOGINMODAL:
      return {
        ...state,
        login: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
