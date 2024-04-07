function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    var txtValue2 , txtValue3 , txtValue4 , txtValue5;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("styled-table");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
     var td2 = tr[i].getElementsByTagName("td")[2];
     var td3 = tr[i].getElementsByTagName("td")[3];
     var td4 = tr[i].getElementsByTagName("td")[4];
     var td5 = tr[i].getElementsByTagName("td")[5];



      if (td || td2 || td3 || td4 || td5) {
        txtValue = td.textContent || td.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3  = td3.textContent || td3.innerText;
        txtValue4 = td4.textContent || td4.innerText;
        txtValue5 = td5.textContent || td5.innerText;


        if (txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1 ||
        txtValue3.toUpperCase().indexOf(filter) > -1 ||
        txtValue4.toUpperCase().indexOf(filter) > -1 ||
        txtValue5.toUpperCase().indexOf(filter) > -1 
        ) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }