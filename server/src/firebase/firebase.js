import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain:process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{firebase, database, googleAuthProvider};



/*
firebase.database().ref().set({
    name: "testName"
});



firebase.database().ref('location').set('barcelona');

firebase.database().ref('ocupation').set('student');

setTimeout(()=>{
    firebase.database().ref('ocupation').remove()
    .then(()=>{
        console.log('dta was removed');
    })
    .catch((e)=>{
        console.log('there was an error');
    });

    firebase.database().ref().update({
        location: 'madrid'
    })
},3000);



let loc = firebase.database().ref('location')
.once('value')
.then((snapshot)=>{
    console.log(snapshot.val());
})
.catch((e)=>console.log(e));

firebase.database().ref('name')
.on('value',(data)=>{
    console.log(data.val());
});


firebase.database().ref().update({name:'Alex'});

firebase.database().ref('name').off();

firebase.database().ref().update({name:'No longer Alex'});*/