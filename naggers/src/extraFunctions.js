
export class ExtraFunctions {
    static isUserLoggedIn() {
        return ((localStorage.getItem("JWT") != "") && (localStorage.getItem("JWT") != null));
    }
}