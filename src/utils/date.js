"use strict";

export class Time {
   constructor(date) {
      Object.defineProperty(this, "past", {
         value: new Date(date),
         writable: false,
         enumerable: true,
         configurable: false,
      });

      Object.defineProperty(this, "now", {
         value: new Date().getTime(),
         writable: false,
         enumerable: true,
         configurable: false,
      });
   }

   // using number of day in javascript date method
   getNameOfDay(numberOfDay) {
      const days = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday",
      ];
      return days[numberOfDay];
   }

   // using number of month in javascript date method
   getNameOfMonth(numberOfMonth) {
      const months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ];
      return months[numberOfMonth];
   }

   /*
    * Levels :
    * hard => (Friday, April 6, 2020)
    * medium => (April 6, 2020)
    * easy => (April 2020)
    */
   format(level) {
      let date = this.past.getDate();
      let year = this.past.getFullYear();
      let day = this.getNameOfDay(this.past.getDay());
      let month = this.getNameOfMonth(this.past.getMonth());

      if (level === "easy") return `${month} ${year}`;
      if (level === "medium") return `${month} ${date}, ${year}`;
      if (level === "hard") return `${day}, ${month} ${date}, ${year}`;

      return new Error("Level Not Found");
   }

   fromNow() {
      let difference = this.now / 1000 - this.past / 1000;
      let hour = Math.floor(difference / 3600);
      let diff = difference - hour * 3600;
      let minute = Math.floor(diff / 60);

      let day = Math.floor(hour / 24);
      let week = Math.floor(day / 7);
      let month = Math.floor(week / 4.345);
      let year = Math.floor(month / 12);

      let result;

      if (year > 0)
         return (result = year === 1 ? "a year ago" : `${year} years ago`);
      if (month > 0)
         return (result = month === 1 ? "a month ago" : `${month} months ago`);
      if (week > 0)
         return (result = week === 1 ? "a week ago" : `${week} weeks ago`);
      if (day > 0)
         return (result = day === 1 ? "a day ago" : `${day} days ago`);
      if (hour > 0)
         return (result = hour === 1 ? "an hour ago" : `${hour} hours ago`);
      if (minute > 0)
         return (result =
            minute === 1 ? "a minute ago" : `${minute} minutes ago`);

      return "a few seconds ago";
   }
}
