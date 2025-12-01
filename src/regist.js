async function POST(url, data) {
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const {name} = data;
const raw = JSON.stringify(data);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

try {
  const response = await fetch(url, requestOptions);
  const result = await response.text();
  console.log(response.body)
  console.log(result)
  if (response.ok) {
        sessionStorage.setItem("username", name)
        location.assign("index")
  }
} catch (error) {
  console.error(error);
};
}

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
                POST(url, user)

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

export function bejelentkezes() {
        event.preventDefault()
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
                        sessionStorage.setItem("username", username)
                        location.assign("index")
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