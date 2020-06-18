const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./houserentalsystem-93ea1-firebase-adminsdk-nwudh-80997c06e0.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://houserentalsystem-93ea1.firebaseio.com"
});

const db = admin.database();
const firestore = admin.firestore();
/* const galleryBucket = admin.storage.bucket('gallery'); */

const collection = {
    house: firestore.collection('house'),
    user: firestore.collection('user')
};

// init admin accounts claim
admin.auth().setCustomUserClaims('w6pofzwmgnffXqfMjiFQOslLqS92', { admin: true })
    .then(() => {
        console.log('Admin claims initialized');
    });

// check admin
exports.admin = functions.https.onRequest(async (req, res) => {
    /* if (res.method !== 'GET') {
        return res.json({ message: 'please request using GET method' });
    } */
    console.log(req.method);
    

    const { query: { uid } } = req;

    const user = await admin.auth().getUser(uid);
   /*  const claims = await admin.auth().verifyIdToken(user.getIdToken()); */

    return res.json({ user }).status(200);
});
/* 
// search house


// create house
exports.createHouse = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.json({ message: 'please request using POST method' });
    }

    const { body: { ownerRef, address, details, rate, gallery } } = req;
    const result = await collection.house.add({ ownerRef, address, details, rate, gallery });

    return res.json({ result }).status(200);
});

// get 1 house
exports.getHouseById = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'GET') {
        return res.json({ message: 'please request using GET method' });
    }

    const { query: { id } } = req;

    const house = await collection.house.doc(id).get();

    return res.json({ house }).status(200);
});

// book house

// update house
exports.updateHouse = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.json({ message: 'please request using POST method' });
    }

    const { body: { id, address, details, rate, gallery } } = req;

    // [client-side] delete old gallery and push new one
    
    const result = await collection.house.doc(id).update({
        address, details, rate, gallery
    });

    return res.json({ result }).status(200);
});

// delete house
exports.deleteHouse = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.json({ message: 'please request using POST method' });
    }

    const { body: { id } } = req;

    const result = await collection.house.doc(id).delete();

    return res.json({ result }).status(200);
});


// create user account
exports.deleteHouse = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        return res.json({ message: 'please request using POST method' });
    }

    const { body: { id } } = req;

    const result = await collection.house.doc(id).delete();

    return res.json({ result }).status(200);
});

// get 1 user account


// search user account


// update user account


// delete user account



exports.test = functions.https.onRequest(async (req, res) => {
    const { query: { val } } = req;

    const root = store.collection('test')
    const q = await root.get();

    let result = [];
    q.forEach(s => {
        result.push(s.data());
    });

    res.json({ result }).status(200);
}); */