const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.notifyUser = functions.firestore
    .document('notes/{noteId}')
    .onCreate(event => {
        // Message details for end user
        const payload = {
            notification: {
                "title": "PLatzi Note PWA",
                "body": "Se agrego una nueva nota",
                "icon": "https://pwa-platzi.firebaseapp.com/assets/icons/icon-128x128.png",
                "click_action": "https://pwa-platzi.firebaseapp.com/"
            }
        }

        // ref to the parent document
        const db = admin.firestore()
        const userRef = db.collection('users')

        // get users tokens and send notifications
        return userRef.get()
            .then(snapshot => {
                var tokens = []
                snapshot.forEach(doc => {
                    tokens = doc.data().fcmTokens ? Object.keys(doc.data().fcmTokens) : []
                });
                if (!tokens.length) {
                    throw new Error('User does not have any tokens!')
                }
                return admin.messaging().sendToDevice(tokens, payload)
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    });