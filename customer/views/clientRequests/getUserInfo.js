const email_span =  document.getElementById("email-span")
const username_span =  document.getElementById("username-span")
const username_input =  document.getElementById("username-input")
const telephone_input = document.getElementById("mobile-number-input")

function execute() {
    
    const url = "/users/get-user-information";

    fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
        })
        .then((response) => {
        
        
          return response.json();
        })
        .then((data) => {

            

            username_span.innerHTML = data.username
            email_span.innerHTML =  data.email
            username_input.value =  data.username

            if(data.telephone)
                telephone_input.value = data.telephone

          
        })
        .catch((error) => {
        
            console.log(error)
        
        });

}


execute()