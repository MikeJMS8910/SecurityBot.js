if(localStorage.getItem("userid") == null) {
    localStorage.setItem("userid", "none")
}

let usersList = []
function typeList(array) {
    usersList = []
    for(let x = 0; x < array.length; x++) {
        usersList.push(array[x].username)
    }
    document.getElementById("accountslist").innerHTML = `Account id's that have been logged in on this device: [${usersList}]`
}

document.getElementById("currentid").innerHTML = "Currently logged in: "+localStorage.getItem("userid")
if (document. readyState === 'complete') {
    getUser(typeList);
}

let money = encode(5)
let on = true
document.getElementById("togglemoney").addEventListener("click", (e) => {
    on = !on
    if(on == true) {
        money = encode(money)
        document.getElementById("togglemoney").innerHTML = "Click to turn off"
    } else {
        money = parseInt(decode(money))
        document.getElementById("togglemoney").innerHTML = "Click to turn on"
    }
});

document.getElementById("moneyClick").addEventListener("click", (e) => {
    if(on == true) {
        money = parseInt(decode(money)) + 1
        if(isNaN(money)) {
            alert("Money variable was changed")
        }
        document.getElementById("moneyDisplay").innerHTML = `Money on your account: $${money}`
        money = encode(money)
    } else {
        
        money += 1
        document.getElementById("moneyDisplay").innerHTML = `Money on your account: $${money}`
    }
});
document.getElementById("submitBtn").addEventListener("click", (e) => {
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
});
document.getElementById("showpassword").addEventListener("click", (e) => {
    
});