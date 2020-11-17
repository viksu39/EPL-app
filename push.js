var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKGnm7pf-SoyXvHvqPX4ZTB-8pbCruxaodyYd9mhPlFw4rLwOboPCF7irjD8lLquNgTBE46GPGr7oqL8_GJj9zM",
   "privateKey": "5fMcfFriS76tX4K5Piq8C3DS2AZ6nHjDbGPezytHAIg"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dZHRvjfxNUc:APA91bHkvY6LbZrPWEdddtJN9l0YQ3tuvI7LUxBGT4dOKsAWzQHRNCn63oFxvEr2TG8LecbG7qnBihds0ccDjso8KUp2nqPPGYaLfobMoS4xdyL_3GHD1wJBaJYv5jhH1gMBLTmeE595",
   "keys": {
       "p256dh": "BMfxOLj3A0PL2yNccWDy8JVY42p3avXAQSxtzflnOyuRDwdys+Vn64qMy41WwK1LQLAZw1d66L7jmQFuA3pMK1U=",
       "auth": "/KcN23t7UWXcArb70/jX6g=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '244055363310',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);