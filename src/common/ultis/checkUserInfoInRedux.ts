import { User } from "src/models";

export const checkUserInfoInRedux = (reduxData: User[], userID: string): User | null => {
    const userInfoData: User[] = reduxData.filter((res: User) => res.id === userID);
    if (userInfoData.length > 0) {
        return userInfoData[0];
    }
    return null;
};
