import { POSTToMainPage } from "./App.jsx"

export async function regisztracio() {
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
                await POSTToMainPage(url, user)
        
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

export async function bejelentkezes() {
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
                    "password" : password,
                    "email" : email
                }
                await POSTToMainPage(url, user)

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
