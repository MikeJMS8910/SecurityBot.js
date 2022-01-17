import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import express from 'express'
const app = express();
import cors from 'cors'

const firebaseConfig = { // Setting up firebase
    apiKey: "AIzaSyAl7pQ65buMP-lmLgiBLwErIp-6HBL49Ac",
    authDomain: "cyber-security-api-1b9fe.firebaseapp.com",
    databaseURL: "https://cyber-security-api-1b9fe-default-rtdb.firebaseio.com",
    projectId: "cyber-security-api-1b9fe",
    storageBucket: "cyber-security-api-1b9fe.appspot.com",
    messagingSenderId: "150956671789",
    appId: "1:150956671789:web:2a5c59c73e22e5f6ca09a4"
  };

initializeApp(firebaseConfig);
const db = getFirestore();

app.listen(8000);
app.use(cors())

console.log("listening on port 8000")

app.get('/', (req, res) => {    // Home directory
    res.json("Welcome, this is a test api.");
});

app.get("/getpassword", async (req, res) => { 
    const docRef = doc(db, "users", req.query.ipcode.toString());
    const docSnap = await getDoc(docRef);

    res.json(docSnap.data().users[req.query.user][0])   // Returns the password of the account
});

app.post("/pageactivated", async (req, res) => {
    await setDoc(doc(db, "users", req.query.ipcode.toString()), {   // Sets up the new machine id if needed
        ip: req.query.ip.toString(),
        users: {}
    });
    res.json("Successfully created a new document")
});

app.post("/adduser", async (req, res) => {

    const docRef = doc(db, "users", req.query.ipcode.toString());
    const docSnap = await getDoc(docRef);

    let userip = null
    let usersaccount = null

    if (docSnap.exists()) {
        userip = docSnap.data().ip,
        usersaccount = docSnap.data().users
    }

    usersaccount[req.query.username] = [req.query.password, req.query.username]     // Adds a value to the object that holds an array of the password and the username

    await setDoc(doc(db, "users", req.query.ipcode.toString()), {   // Adds the new account to the machine
        ip: userip,
        users: usersaccount
    });      
    res.json("Successfully added user to machine")
});

app.get("/getipaccount", async(req, res) => {
    const docRef = doc(db, "users", req.query.ipcode);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {      
        let accounts = docSnap.data().users
        let final = []
    
        let valuesArray = Object.values(accounts);
  
        for (let value of valuesArray) {
            final.push(value[1]) 
        }

        res.send(final)
    } else {
        res.send([false])   // Returns false if there are no accounts existing on the machine
    }
});