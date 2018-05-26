# Platzi Note PWA

WPA application of CURD of notes with Angular 6 and firebase using firesotre and sending of notification notification

## Install

- Download or clone
- Run `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Send messages

With this command you can test the sending and receiving of messages:

```
curl https://fcm.googleapis.com/fcm/send \
-H"Content-Type: application/json" \
-H"Authorization: key=AAAAcZjdlJk:APA91bGUL5xtX_hAEkeUPb_-6MFICBs9oFTtHsuebsubrOVDCU0GPMupq_YZ7yeju2J3lhBxwU-3EBazSmJN0YvrZU27QqHiLw0JfZQRbyRdmQftYpAmNbmUx_-zTrNcvsyzVk3YFhTb" \
-d '{ "notification": { "title": "New note!", "body": "A new note has been added","icon":"https://goo.gl/Gey7NW", "click_action": "https://pwa-platzi.firebaseapp.com/"}, "to" : "..."
}'
```

They must replace the contents of to: "..." by the hash that is displayed in the navigator browser development console
