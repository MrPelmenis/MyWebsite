import configData from "./config.json";

export class ExtraFunctions {
    static isUserLoggedIn() {
        return ((localStorage.getItem("JWT") != "")
            && (localStorage.getItem("JWT") != null)
            && (localStorage.getItem("JWT") != undefined)
            && (localStorage.getItem("JWT") != "undefined")
            &&(localStorage.getItem("JWY") != "null")
            && (localStorage.getItem("JWT")));
    }

    static convertUTCtoLocal(utcDate) {
        var localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60 * 1000);
        return localDate;
      }
    

    static getTimeAgo(dateTimeString) {
        let givenDateTime = new Date(dateTimeString);
        givenDateTime = this.convertUTCtoLocal(givenDateTime);
        const currentDateTime = new Date();

        const timeDifference = Math.floor((currentDateTime - givenDateTime) / 1000);
        if (timeDifference < 60) {
            return timeDifference === 1 ? timeDifference + " second ago" : timeDifference + " seconds ago";
        } else if (timeDifference < 3600) {
            const minutes = Math.floor(timeDifference / 60);
            return minutes === 1 ? minutes + " minute ago" : minutes + " minutes ago";
        } else if (timeDifference < 86400) {
            const hours = Math.floor(timeDifference / 3600);
            return hours === 1 ? hours + " hour ago" : hours + " hours ago";
        } else {
            const days = Math.floor(timeDifference / 86400);
            return days === 1 ? days + " day ago" : days + " days ago";
        }
    }
    

    static googleLogin() {
        let url =
            `https://accounts.google.com/o/oauth2/v2/auth?` +
            `response_type=code&` +
            `client_id=${configData.CLIENT_ID}&` +
            `scope=openid%20email&` +
            `redirect_uri=${configData.REDIRECT_URL}&` +
            `nonce=0394852-3190485-2490358&`;
        window.location.href = url;
    }

}