/** 27.10.2019  Created by Mariana Manova**/

function myFunction() {
  alert("It works");
}

function updateMsg(){
  document.getElementById("fname").style.color = "grey";
  document.getElementById("fname").innerText = "Read file."
}

function readFile(){
  var file, input, fr, projArr;
  input = document.getElementById("f");

  if (!input.files[0]) {
    //alert("Your selection is empty. Please retry selecting a file!");
    document.getElementById("fname").style.color = "red";
    document.getElementById("fname").innerText = "No file selected."
  }
  else {
    document.getElementById("fname").style.color = "blue";
    document.getElementById("fname").innerText = input.files[0].name;

    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);
  }

  function receivedText(e) {
    let lines = e.target.result;
    projArr = JSON.parse(lines); 
    populateData();   
  }

  function populateData(){
    //Display number of projects found in file
    document.getElementById("projNum").innerText = projArr.projects.length;
    document.getElementById("projNum").style.color = "blue";
    
    //alert(Object.keys(projArr.projects[0]).length);
    //alert(projArr.projects[0].id);
    //alert(projArr.projects.length);

    var row;
    var cellArr = []
    var textNodeArr = [];

    // Fill table body with data
    if (!document.getElementsByTagName) return;
    tblBody = document.getElementsByTagName("tbody").item(0);
    tblBody.style.height = "1000px";

    for(var i=0; i<projArr.projects.length; i++){
      row = document.createElement("tr");

      for(var j=0; j<Object.keys(projArr.projects[0]).length; j++){      
        cellArr[j] = document.createElement("td");
        //Collapsible buttons
        if(j==Object.keys(projArr.projects[0]).length-1){
          var btn = document.createElement("BUTTON");  
          btn.innerHTML = "Details" ;    
          btn.className = "collapsible";

          var par = document.createElement("p");  
          par.className = "content";
          textNodeArr[j] =document.createTextNode(Object.values(projArr.projects[i])[j]);
          par.appendChild(textNodeArr[j]);

          cellArr[j].appendChild(btn);
          cellArr[j].appendChild(par);
        }
        else{
          textNodeArr[j] =document.createTextNode(Object.values(projArr.projects[i])[j]);
          cellArr[j].appendChild(textNodeArr[j]);
        }
        row.appendChild(cellArr[j]);   
      }
      
      tblBody.appendChild(row);   
    }

    //Collapsible implementation
    var coll = document.getElementsByClassName("collapsible");
   
    for(var m=0; m<coll.length; m++) {
      coll[m].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }
 
}