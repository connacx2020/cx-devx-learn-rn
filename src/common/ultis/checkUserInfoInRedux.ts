export const checkUserInfoInRedux = (reduxData: any, userID: String) => {
    let userInfoData = reduxData.filter((res: any) => res.id === userID);
    if(userInfoData.length > 0 ) {
        // console.log(true);
        return userInfoData;
    }else{
        // console.log(false);
        return false;
    }
}
