if(localStorage.getItem("userid") == null) {    // Sets up the current user. This will allow it to save the current user
    localStorage.setItem("userid", "none")
}

let usersList = []
function typeList(array) {  // Call back function for getting the user list
    usersList = []
    for(let x = 0; x < array.length; x++) {
        usersList.push(array[x])
    }
    document.getElementById("accountslist").innerHTML = `Account id's that have been logged in on this device: [${usersList}]`
}

function displayPassword(password) {    // Callback function for getting the current user password
    document.getElementById('passworddisplay').innerHTML = "Current User Password: "+password
}

document.getElementById("currentid").innerHTML = "Currently logged in: "+localStorage.getItem("userid")
if(document.readyState === 'ready' || document.readyState === 'complete') {     // Waits for the page to load before trying to get the user list
    setTimeout(() => {
        getUser(typeList);
    }, 1000);
  } else {
    document.onreadystatechange = function () {
      if (document.readyState == "complete") {
        setTimeout(() => {
            getUser(typeList);
        }, 1000);
      }
    }
  }

let money = encode(5)   // Setting the money value to 5
let on = true
let safe = true
document.getElementById("togglemoney").addEventListener("click", (e) => {   // When you click it will just not encode the value of money 
    on = !on
    if(on == true) {
        money = encode(money)
        document.getElementById("togglemoney").innerHTML = "Click to turn off"
    } else {
        money = parseInt(decode(money))
        document.getElementById("togglemoney").innerHTML = "Click to turn on"
    }
});

document.getElementById("togglesafeinput").addEventListener("click", (e) => {   // Turns on/off safe input to make sure whether it checks or not
    safe = !safe
    if(safe == true) {
        document.getElementById("togglesafeinput").innerHTML = "Click to turn off"
    } else {
        document.getElementById("togglesafeinput").innerHTML = "Click to turn on"
    }
});

document.getElementById("moneyClick").addEventListener("click", (e) => {    // Adds to the money
    if(on == true) {
        money = parseInt(decode(money)) + 1
        if(isNaN(money)) {
            alert("Money variable was changed")
        }
        document.getElementById("moneyDisplay").innerHTML = `Money on your account: $${money}`
        money = encode(money)
    } else {
        
        money += 1  // Doesn't decode the money value, this means that it can be edited
        document.getElementById("moneyDisplay").innerHTML = `Money on your account: $${money}`
    }
});
document.getElementById("submitBtn").addEventListener("click", (e) => {     // Whenever a new user is submitted 
    if(safe == true) {
        if(safeInput(document.getElementById("usernameinput"))[0] && safeInput(document.getElementById("passwordinput"))[0]) {
            alert("Safe Input")
            localStorage.setItem("userid", document.getElementById("usernameinput").value)
            document.getElementById("currentid").innerHTML = "Currently logged in: "+localStorage.getItem("userid")
            addUser(document.getElementById("usernameinput").value, document.getElementById("passwordinput").value)
            usersList.push(document.getElementById("usernameinput").value)
            document.getElementById("accountslist").innerHTML = `Account id's that have been logged in on this device: [${usersList}]`
        } else {
            alert(`Username: ${safeInput(document.getElementById("usernameinput"))[1]}, Password: ${safeInput(document.getElementById("passwordinput"))[1]}`)
        }
    } else {
        localStorage.setItem("userid", document.getElementById("usernameinput").value)
        document.getElementById("currentid").innerHTML = "Currently logged in: "+localStorage.getItem("userid")
        addUser(document.getElementById("usernameinput").value, document.getElementById("passwordinput").value)
        usersList.push(document.getElementById("usernameinput").value)
        document.getElementById("accountslist").innerHTML = `Account id's that have been logged in on this device: [${usersList}]`
    }
});
document.getElementById("showpassword").addEventListener("click", (e) => {
    getPassword(localStorage.getItem("userid"), displayPassword)
});