
export class ExtraFunctions {
    static isUserLoggedIn() {
        return ((localStorage.getItem("JWT") != "")
        && (localStorage.getItem("JWT") != null)
        && (localStorage.getItem("JWT") != undefined)
        && (localStorage.getItem("JWT") != "undefined") 
        && (localStorage.getItem("JWT")));
    }
}