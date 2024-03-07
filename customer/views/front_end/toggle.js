
document
  .getElementById("flexSwitchCheckChecked" )
  .addEventListener("click", () => {

    const checked = document.getElementById("flexSwitchCheckChecked").checked;

    if (checked) {
      document.getElementById("update_user_inputs").style.display = "none";
      document.getElementById("passwords").style.display = "block";

      const button =  document.getElementById("update_button")

      button.innerText = "Change Password"
      
    } 
    else {
      document.getElementById("update_user_inputs").style.display = "block";
      document.getElementById("passwords").style.display = "none";

      const button =  document.getElementById("update_button")
      button.innerText = "Update Profile"

      



    


    }
  });
