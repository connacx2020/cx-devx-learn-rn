import { User } from "../../models";
import { checkUserInfoInRedux } from "./checkUserInfoInRedux";
import { store } from "../redux";
import { getUserInfoByIDApi } from "../../common";
import { saveUserInfo } from "../redux";

export async function getCheckedUserInfo(userID: string) {
    const userInfoFromRedux: User[] = await store.getState().userInfo.userInfoData;
    let result = checkUserInfoInRedux(userInfoFromRedux, userID);

    if (result) {
        return result[0]
    } else {
        let result: any = await getUserInfoByIDApi(userID);
        store.dispatch(saveUserInfo(result.data.getUserInfoByID))
        return result.data.getUserInfoByID;
    }
}




