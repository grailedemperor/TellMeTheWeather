var today = moment();
$("#TodaysDate").text(today.format("(M/d/YYYY)")



function displayFormData(){
    var cityValue = document.getElementById("city");
    var cityInput = document.getElementById("cityInputBtn");
    
    if(cityInput.clicked == true){
        var cityInputresult = cityValue.value;
        document.getElementById("SelectedCity").textContent=cityInputresult;
    }

}

function displayButtonText2(){
    var buttonPull = document.querySelector(".btn");


}