
document.getElementById("change-password-button").addEventListener("click",()=>{
    
    const old_password =document.getElementById("old-password-input").value
    const new_password = document.getElementById("new-password-input").value
    const verify_new_password = document.getElementById("verify-new-password-input").value
    
    
    url = "/customers/change-password"
    data =  {
        old_password:old_password,
        new_password:new_password,
        verify_new_password:verify_new_password
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

                


                


              }
            

        })



})
