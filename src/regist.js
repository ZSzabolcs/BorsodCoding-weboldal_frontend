import axios from "axios";

async function POSTToMainPage(url, data) {
    try{
    const response = await axios.post(url, data)
    alert(response.data.message)
    sessionStorage.setItem("username", response.data.value.name)
    location.assign("/fooldal")
    }
    catch(error){
        alert(error.response.data.message)
    }


}
export async function regisztracio() {
        event.preventDefault()
        const url = "http://localhost:5233/api/User/Registration"
        const username = document.getElementById("userName").value
        const email =  document.getElementById("userEmail").value
        const password = document.getElementById("userPassword").value
        const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        let siker = false;
            
        
        if (email.search(typeEmail) > -1) {
                siker = true
        }
        

        if (siker) {
            console.log(password.search(/[\s]/))
            if (password.search(/[\s]/) == -1) {
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

export async function bejelentkezes() {
        event.preventDefault()
        const url = "http://localhost:5233/api/User/Login"
        const username = document.getElementById("userName").value
        const email = document.getElementById("userEmail").value
        const password = document.getElementById("userPassword").value
        const typeEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
        let siker = false;
            
        
        if (email.search(typeEmail) > -1) {
            siker = true
        }
        if (siker || document.getElementById("userEmail").disabled) {
            console.log(password.search(/[\s]/))
            if (password.search(/[\s]/) == -1) {
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
    
}
