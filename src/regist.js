import { POSTToMainPage } from "./App.jsx"

export function regisztracio() {
        event.preventDefault()
        const url = "http://localhost:5233/api/User/Registration"
        const username = document.getElementById("userName").value
        const email =  document.getElementById("userEmail").value
        const password = document.getElementById("userPassword").value
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
                "name" : username,
                "email" : email,
                "password" : password
                }
                POSTToMainPage(url, user)
        
            } else {
                console.error("Hiba: Password")
            }
        }
        else{
            console.error("Hiba: Email")
        }
    }
    else {
        console.error("Hiba: Username nem tartalmazhat számot")
    }
}

export function bejelentkezes() {
        event.preventDefault()
        const url = "http://localhost:5233/api/User/Login"
        const username = document.getElementById("userName").value
        const email = document.getElementById("userEmail").value
        const password = document.getElementById("userPassword").value
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

        if (siker == typeEmails.length || document.getElementById("userEmail").disabled) {
            console.log("Az email cím helyes");
            
            if (password.search(/./) > -1) {
                const user = {
                    "name": username,
                    "password" : password
                }
                POSTToMainPage(url, user)

            } else {
                console.error("Hiba: Password")
            }
        } else{
            console.error("Hiba: Email")
        }
    } else {
        console.error("Hiba: Username nem tartalmazhat számot")
    }
}
/*
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
*/