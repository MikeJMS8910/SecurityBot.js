import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import express from 'express'
const app = express();
import cors from 'cors'
import { async } from '@firebase/util';

const secret_key = "abc123"  //change to whatever you want

const firebaseConfig = {
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

app.get('/', (req, res) => {
    res.json("Welcome, this is a test api.");
});

app.get("/users", async (req, res) => {
    const userCol = collection(db, 'users');
    const userSnapshot = await getDocs(userCol);
    const userList = userSnapshot.docs.map(doc => doc.data());
    res.json(userList)
});

app.get("/getpassword", (req, res) => {
    
});

app.post("/pageactivated", async (req, res) => {
    await setDoc(doc(db, "users", req.query.ipcode.toString()), {
        ip: req.query.ip.toString(),
        users: []
    });      
    res.json("Successfully created a new document")
});

app.post("/adduser", async (req, res) => {

    console.log("changing something with the user")

    const docRef = doc(db, "users", req.query.ipcode.toString());
    const docSnap = await getDoc(docRef);

    let userip = null
    let usersaccount = null

    if (docSnap.exists()) {
        userip = docSnap.data().ip,
        usersaccount = docSnap.data().users
    }

    usersaccount.push({username: req.query.username, password: req.query.password})

    await setDoc(doc(db, "users", req.query.ipcode.toString()), {
        ip: userip,
        users: usersaccount
    });      
    res.json("Successfully added user to machine")
});

app.get("/getipaccount", async(req, res) => {
    const docRef = doc(db, "users", req.query.ipcode);
    const docSnap = await getDoc(docRef);

    let accounts = docSnap.data().users

    res.send(accounts)
});