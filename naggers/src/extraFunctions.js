
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
    

}