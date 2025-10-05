function regisztracio(event) {
        event.preventDefault()
        const form = event.target.elements
        const username = form.userName.value
        const email = form.userEmail.value
        const password = form.userPassword.value
        const typeEmails = [
            {
                expression : /.@/
            },
            {
                expression : /@./
            },
            {
                expression : /(\.hu|\.com)/
            }];
        let siker = 0;
    if (username.search(/[0-9]/) == -1) {
            
        for (let i = 0; i < typeEmails.length; i++) {
            if (email.search(typeEmails[i].expression) > -1) {
                siker++;
            }
        }

        if (siker == typeEmails.length) {
            console.log("Az email cím helyes");
            
            if (password.search(/./) > -1) {
                const user = {
                username : username,
                email : email,
                password : password
            }
                if(localStorage.getItem("users") == null){
                    localStorage.setItem("users", JSON.stringify(user))
                } else {
                    let users = JSON.parse(localStorage.getItem("users"))
                    let vane = false;
                    let i = 0;
                    while (users.length > i && !vane) {
                        if (users[i].username === username) {
                            vane = true
                        }
                        i++;
                    }
                    if (vane) {
                        console.log("Már van ilyen felhasználó")
                    }
                    else {
                        users.push(user)
                        localStorage.setItem("users", JSON.stringify(users))
                        location.assign("index.html")
                    }
                }
            } else {
                console.error("Hiba")
            }
        }
        else{
            console.error("Hiba")
        }
    }
    else {
        console.error("Hiba")
    }
}

function bejelentkezes(event) {
     event.preventDefault()
        const form = event.target.elements
        const username = form.userName.value
        const email = form.userEmail.value
        const password = form.userPassword.value
        const typeEmails = [
            {
                expression : /.@/
            },
            {
                expression : /@./
            },
            {
                expression : /(\.hu|\.com)/
            }];
        let siker = 0;
    if (username.search(/[0-9]/) == -1) {
            
        for (let i = 0; i < typeEmails.length; i++) {
            if (email.search(typeEmails[i].expression) > -1) {
                siker++;
            }
        }

        if (siker == typeEmails.length) {
            console.log("Az email cím helyes");
            
            if (password.search(/./) > -1) {
                
                if(localStorage.getItem("users") == null){
                    console.error("Nincsen adat")
                } else {
                    let users = JSON.parse(localStorage.getItem("users"))
                    let vane = false;
                    let i = 0;
                    while (users.length > i && !vane) {
                        if (users[i].username === username && users[i].email === email && users[i].password === password) {
                            vane = true
                        }
                        i++;
                    }
                    if (vane) {
                        location.assign("index.html")
                    }
                   
                }
            } else {
                console.error("Hiba")
            }
        } else{
            console.error("Hiba")
        }
    } else {
        console.error("Hiba")
    }
}

document.getElementById("form").addEventListener("submit", regisztracio);

document.getElementById("bejelentkezes").addEventListener("click", (event) => {
    if (document.title == "Regisztráció") {
        document.title = "Bejelentkezés"
        document.getElementById("gomb").firstChild.textContent = "Bejelentkezés"
        document.getElementById("form").addEventListener("submit", bejelentkezes)
        event.target.firstChild.textContent = "Még nincs fiókod?"
        
    }
    else{
        document.title = "Regisztráció"
        document.getElementById("gomb").firstChild.textContent = "Regisztráció"
        document.getElementById("form").addEventListener("submit", regisztracio)
        event.target.firstChild.textContent = "Már van fiókod?"
    }
    
    

})