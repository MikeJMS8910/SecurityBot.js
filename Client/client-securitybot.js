// Machine Id's

let ipcode = null
var ipcode_cached=ipcode;

fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=900a501113984f96a55df3e0f2a75e99') // This returns information on the client
  .then(response => response.json())
  .then(data => {
    ipcode = data.ip_address.replace(".", "").replace(".", "").replace(".", "")
    fetch("http://localhost:8000/users")
        .then(getResponse => getResponse.json())
        .then(getData => {
            console.log(JSON.stringify(getData).search(ipcode))
            if(JSON.stringify(getData).search(ipcode) == -1) {
                console.log("is a new user")
                newMachine = true
                const Http = new XMLHttpRequest();
                const url=`http://localhost:8000/pageactivated?ip=${JSON.stringify(data.ip_address)}&ipcode=${ipcode}`;
                localStorage.setItem("machine-id", ipcode)
                Http.open("POST", url);
                Http.send();
            } else {

            }
        })
  });

function addUser(username, password) {
    const Http = new XMLHttpRequest();
    const url=`http://localhost:8000/adduser?username=${username}&password=${password}&ipcode=${ipcode}`;
    localStorage.setItem("current-user", username)
    Http.open("POST", url);
    Http.send();
}

function getUser(callback) {
    console.log(ipcode)
    if(ipcode===ipcode_cached) {
        setTimeout(getUser(typeList), 100)
        return
    }
    fetch(`http://localhost:8000/getipaccount?ipcode=${ipcode}`)
        .then(getResponse => getResponse.json())
        .then(data => {
            console.log("data: "+JSON.stringify(data))
            callback(data)
        })
}




// Safe inputs, SQL and XSS prevention        
function safeInput(input) {
    let userinput = input.value
    if(userinput.includes(";") || userinput.includes("SELECT") || userinput.includes("FROM") || userinput.includes("WHERE")) { // Checks if any of these words or symbols were used inside of the input
        return [false, "SQL"]
    } else if(userinput.includes("<") || userinput.includes(">")) {
        return [false, "XSS"]
    } else {
        return [true, "Safe"]
    }
}




// Secure variables on the front end
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let AllChars = []; // Setting up an array of all the character
for (var i=32; i<127; i++)
    AllChars.push(String.fromCharCode(i));

let newDecodeKey = []

for(x = 0; x < 95; x++) { // Goes through all the possibke characters, picks a random one, adds it to the new array and takes it away from the old
    let current = getRandomInt(95 - x)
    newDecodeKey.push(AllChars[current])
    AllChars.splice(current, 1)
}

AllChars = []; // Setting up an array of all the charactres
for (var i=32; i<127; i++)
    AllChars.push(String.fromCharCode(i));


function getPosition(letter, way) { // Function for finding the position of a character inside of one of the key arrays
    if(way == "en") { // For encoding
        for(x = 0; x < newDecodeKey.length; x++) { // Cycles through all of the characters in an array and checks if it is the needed value
            if(newDecodeKey[x] == letter) {
                return x
            }
        }
    } else if(way == "de") { // For decoding
        for(x = 0; x < AllChars.length; x++) {
            if(AllChars[x] == letter) {
                return x
            }
        }
    }
}

function encode(value) {  // Function for encoding, takes in value and returns a value that is non understandable
    let final = ""
    let splitValues = value.toString().split("") // Splits the value into an array of characters
    for(let x = 0; x < splitValues.length; x += 1) { // Goes through each of the letters and gets the position of that letter in the decrypted key
        final += AllChars[getPosition(splitValues[x], "en")] // Adds the decrypted key value to the final string
    }
    return final
}

function decode(value) { // Function for decoding, takes in a value that is already secure and returns the previous value
    let final = ""
    let splitValues = value.toString().split("")
    for(let x = 0; x < splitValues.length; x += 1) {
        final += newDecodeKey[getPosition(splitValues[x], "de")] // Similar to the encode function but looks at the opposite dataset
    }
    return final
}