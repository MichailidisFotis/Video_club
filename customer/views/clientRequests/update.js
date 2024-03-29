const responseLabel = document.getElementById("Response");
const messageBox = document.getElementById("message");

document.getElementById("update_button").addEventListener("click",()=>{

   

    
    var url
    var data

    



        


    
    

        const username = document.getElementById("username-input").value
        const mobile_number = document.getElementById("mobile-number-input").value
        const password =  document.getElementById("password-input").value

        url = "/customers/update-customer-information"
        data = {
                username:username,
                mobile_number:mobile_number,
                password:password
        }

        
    

    fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

        })
        .then((response) =>{
            return response.json()
        })
        .then((data) =>{
            if (!data.update) {
                const message = data.message;
                messageBox.style.display = "block";
                responseLabel.style.color = "#aa0436";
                responseLabel.innerHTML =
                  '<i class="fa-solid fa-triangle-exclamation"></i>  ' + message;

              } 
              else {
                const message = data.message;
                messageBox.style.display = "block";
                responseLabel.style.color = "#04aa6d"
                responseLabel.innerHTML='<i class="fa-regular fa-circle-check"></i>  '+message

                
                    username_span.innerHTML = data.new_username
                    username_input.value =  data.new_username

                


              }
            

        })


    







})