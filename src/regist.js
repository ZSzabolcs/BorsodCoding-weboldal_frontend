import axios from "axios";

async function POSTToMainPage(url, data) {
    try{
    const response = await axios.post(url, data)
    alert(response.data.message)
    
    if (response.status == 200 || response.status == 201) {
        sessionStorage.setItem("username", response.data.value)
        localStorage.setItem("jwt", response.data.token)
        location.assign("/fooldal")
    }

    }
    catch(error){
        alert(error)
    }


}

const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/

export async function regisztracio() {
        event.preventDefault()
        const url = "https://localhost:7159/auth/register"
        const username = document.getElementById("userName").value
        const email =  document.getElementById("userEmail").value
        const password = document.getElementById("userPassword").value

        let siker = false;
            
        
        if (email.search(typeEmail) > -1) {
                siker = true
        }
        

        if (siker) {
            console.log(password.search(/[\s]/))
            if (password.search(/[\s]/) == -1) {
                const user = {
                "userName" : username,
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

export async function bejelentkezes() {
        event.preventDefault()
        const url = "https://localhost:7159/auth/login"
        const username = document.getElementById("userName").value
        const email = document.getElementById("userEmail").value
        const password = document.getElementById("userPassword").value
        let siker = false;
            
        
        if (email.search(typeEmail) > -1) {
            siker = true
        }
        if (siker || document.getElementById("userEmail").disabled) {
            console.log(password.search(/[\s]/))
            if (password.search(/[\s]/) == -1) {
                const user = {
                    "userName": username,
                    "password" : password
                }
                await POSTToMainPage(url, user)

            } else {
                console.error("Hiba: Password")
            }
        } else{
            console.error("Hiba: Email")
        }
    
}
