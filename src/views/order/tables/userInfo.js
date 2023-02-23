export default {
    // 保存  用户信息
    setUserInfo(userInfo) { // userInfo 用户信息 {}
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        console.log(userInfo,'uuu');
    },
    // 获取用户信息
    getUserInfo() {
        return JSON.parse(window.localStorage.getItem("userInfo"));
    },
    // 清除用户信息
    clearUserInfo() {
        // window.sessionStorage.clear()
        window.localStorage.removeItem("userInfo")
    }
}