import cron from "node-cron";
import { endOfDay, startOfDay, subDays } from "date-fns";
import ConnectionRequestModel from "../models/ConnectionRequestModel.js";

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# *  *  *  * *  *


field	value
second	0-59
minute	0-59
hour	0-23
day of month	1-31
month	1-12 (or names)
day of week	0-7 (or names, 0 or 7 are sunday)

for getting the proper time you can use this -> https://crontab.guru/
*/

const cronJobs = () => {
  cron.schedule('* * */1 * * *', () => {
    // Send emails to all the people who got requests the previous day
    try {
      const yesterday = subDays(new Date(), 1);
      const yesterdayStart = startOfDay(yesterday);
      const yesterdayEnd = endOfDay(yesterday);
      
      const pendingRequests = ConnectionRequestModel.find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lt: yesterdayEnd
        }
      }).populate("senderId recieverId");
      
      const listOfEmails = [...new Set(pendingRequests?.map(requests => requests?.recieverId?.emailId))];
      for(const email in listOfEmails) {
        // funtion to send emails
      }
    } catch(error) {
      
    }
  });
}

export default cronJobs;