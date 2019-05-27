const requestPromise = require('request-promise');
const {dialogflow} = require ('actions-on-google');
const functions = require('firebase-functions');

                    const request = require('request');

const app = dialogflow({debug:true})

app.intent('City', (conv,{geocity}) => {
    const options = {
        url:`http://api.openweathermap.org/data/2.5/weather?q=${geocity}&appid=2821ebdd7d165f1f55f927b10ebea94a`,
        header: {
            'User-Agent' : 'Request-Promise'
        },
        json : true
    }
    return requestPromise.get(options).then((res) => {
        conv.ask(`<speak> Here is the weather of ${geocity} </speak>`);
        conv.ask(`<speak> Temperature is ${Math.floor(res.main.temp - 273)} degree celsius,
        <break time = "2000ms"/> ${res.weather[0].main} in ${geocity} </speak>`);
   
   
    }).catch((err) => {
        conv.close(`<speak> API server aint working </speak>`)

    })
})


exports.dialoglowFirebaseFulfillment = functions.https.onRequest(app);

// Key	Name	8c01c2c5a9cb00b10c124d709d2cdb1f











// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
