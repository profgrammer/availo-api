const express = require('express');
const router = express.Router();
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const token = require('../json/token');
const credentials = require('../json/credentials');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];


router.post('/', (req, res) => {
  authorize(credentials, (auth, email = req.body.email) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: email,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, result) => {
      if (err) console.log(err);
      const events = result.data.items;
      if (events.length) {
        var ans = [];
        events.map((event, i) => {
          ans.push({
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
            summary: event.summary
          });
        });
        res.status(200).json(ans);
      } else {
        res.status(404).json({message: 'not found'});
      }
    });
  });
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

// function listEvents(auth) {
//   const calendar = google.calendar({version: 'v3', auth});
//   calendar.events.list({
//     calendarId: 'kchinmay08.kc@gmail.com',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const events = res.data.items;
//     if (events.length) {
//       console.log('Upcoming 10 events:');
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date;
//         //console.log(`${start} - ${event.summary}`);
//         const end = event.end.dateTime || event.end.date;
//         console.log(`${start} to ${end} - ${event.summary}`);
//       });
//     } else {
//       console.log('No upcoming events found.');
//     }
//   });
// }

module.exports = router;
