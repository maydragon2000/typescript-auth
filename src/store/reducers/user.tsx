import { LOGIN_USER, LOGOUT_USER, SET_USER, RESET_USER, RESET_PASSWORD_VERIFY, SAVE_EMAIL } from "../actions/user";

interface ActionType {
  type: string,
  user: object,
  email:string
}

const initialState: {
  isAuth: boolean,
  user: null | object,
  isVerify: boolean,
  email: string
} = {
  isAuth: getIsAuth(),
  user: null,
  isVerify: false,
  email: ""
};
function getIsAuth() {
  try {
    const serialized = localStorage.getItem('token');
    if (serialized === null) {
      return false;
    }
    return true;
  }
  catch (err) {
    return false;
  }
}

export default function user(state = initialState, action:ActionType) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        user: action.user,
        isAuth: true,
        isVerify: true
      };
    case LOGOUT_USER:
      return {
        isAuth: false,
        user: null,
        isVerify: false
      };

    case SET_USER:
      return {
        user: action.user,
        isAuth: true,
        isVerify: false
      };
    case RESET_USER:
      return initialState;
    case RESET_PASSWORD_VERIFY:
      return {
        isAuth: false,
        user: null,
        isVerify: true,
        email: action.email
      };
    case SAVE_EMAIL:

      return {
        email: action.email
      }
    default:
      return state;
  }
}
