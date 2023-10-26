
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
        let givenDateTime = new Date(dateTimeString)
        givenDateTime = this.convertUTCtoLocal(givenDateTime);
        const currentDateTime = new Date();
       // console.log("no servera: " + givenDateTime);
       // console.log("tagad ir: " +  currentDateTime);
        const timeDifference = Math.floor((currentDateTime - givenDateTime) / 1000); // Convert to seconds
        //console.log("seconds: " + timeDifference);
        if (timeDifference < 60) {
          return timeDifference + " seconds ago";
        } else if (timeDifference < 3600) {
          const minutes = Math.floor(timeDifference / 60);
          return minutes + " minutes ago";
        } else if (timeDifference < 86400) {
          const hours = Math.floor(timeDifference / 3600);
          return hours + " hours ago";
        } else {
          const days = Math.floor(timeDifference / 86400);
          return days + " days ago";
        }
    }
    

}