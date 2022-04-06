import { getUser } from "../../api/index";
import { setUser, resetUser } from "../actions/user";
interface DataType {
  error_message: string,
  user: object,
  token: string
}
interface ResponseType {
  data: DataType
}
export const attemptGetUser = (token: string) => (dispatch: any) =>
  getUser(token)
    .then((reponse:ResponseType) => {
      console.log(reponse.data.user, "get user data");
      if (reponse.data.user) {
        dispatch(setUser(reponse.data.user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });
