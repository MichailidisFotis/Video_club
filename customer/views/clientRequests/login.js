
document.getElementById("submitButton").addEventListener("click", () => {
    execute();

});

document.addEventListener("keypress" , (event)=>{

if(event.key ==="Enter")
 execute();
})




function execute(){


const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const responseLabel =  document.getElementById("Response");
const messageBox = document.getElementById("message")



const url = "/users/login";

const data = {
username: username,
user_password: password
};

fetch(url, {
method: "POST",
headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify(data)
})
.then((response) => {

  if (response.redirected) {
    window.location.href=response.url
  }
  else
    return response.json();
})
.then((data) => {

    if(!data.login){
        
        const message =  data.message
        messageBox.style.display="block"
        responseLabel.style.color = "#aa0436"
        responseLabel.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i>  '+message
        
    }
})
.catch((error) => {

    console.log(error)

});



}