document.getElementById("logoutButton").addEventListener("click", () => {

 
    execute();
  

    
});


function execute() {
    
    const url = "/users/signout";

    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
        })
        .then((response) => {
          
          if (response.redirected) {
              window.location.href =  response.url
          }
        
        })
        .catch((error) => {
        
            console.log(error)
        
        });

}