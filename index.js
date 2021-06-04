var visited = localStorage.getItem('visited');
if (!visited) {
  alert("HOW TO USE: Add all your friends to the list FIRST before you start using the application");
  localStorage.setItem('visited', true);
}

function newCard(){
  information = location.search; 
    if (information == "") {
        return alert("ERROR: PAGE NOT ACSESSED BY BOOKMARKLET")
    }
  
  let playerName = getName(information);
  let playerPic = getPic(information);
  


  let counters = localStorage.getItem("counters");
  if (counters == null) {
    var counterObj = [];
  } else {
    var counterObj = JSON.parse(counters);
  }
  let myObj = {
    pName : playerName,
    pPic : playerPic,
    pCount : 0
  }
  sessionStorage.setItem(myObj['pName'],myObj['pCount']);
  console.log("counterObj.length: ",counterObj[0]);
  for (let i=0; i < counterObj.length; i++){
    console.log(typeof(i))
    let currObj = counterObj[i];
    console.log("current Obj: ",currObj,typeof(currObj));
    console.log("GOING THRU ITERATION: ",i);
    console.log("CURRENT NAME: ", currObj["pName"], "MY OBJ: ",myObj["pName"]);

    let currName = currObj["pName"];
    let myName = myObj["pName"];

    console.log(currName == myName);
    if (currName == myName){
      return showCounters();
    }
  }
    counterObj.push(myObj);
    localStorage.setItem("counters", JSON.stringify(counterObj));
    playerName.value = "";
    playerPic.value = "";
    console.log("COUNTER OBJ", counterObj);
    showCounters();

  console.log("cool")
}

function showCounters(){
  console.log("RUNNING SHOW COUNTERS")
  let counter = localStorage.getItem("counters");
  if (counter == null) {
    counterObj = [];
  } else {
    counterObj = JSON.parse(counter);
  }
  let html = [];
  counterObj.forEach(function(element, index) {
    //check if element alr in website
    len = JSON.parse(localStorage.getItem("counters")).length;
    console.log("LEN:", JSON.parse(localStorage.getItem("counters")).length)
    console.log("INDEX:",index)
    if (index >= len){
      console.log(index);
    } else{
      html.push( `
          <div class="basic_block" id="${index}">
            <div class="pPic" style="position:right">
              <img src='https://maimaidx-eng.com/maimai-mobile/img/Icon/${element.pPic}' style='position:center; width:128px; height:128px;' onclick='addCount()' />
            </div>

            <div class="info" id="${index}">
              <div class="name_block t_l f_l f_14 underline">
                <p class= "pName">${decodeURIComponent(element.pName)}</p>
              </div>

              <div class="controls">
                <button id="${index}" onclick="increment(this.id)"><img style="width:75px" src="increment.png"></button>
                <button id="${index}" onclick="decrement(this.id)"><img style="width:75px" src="decrement.png"></button>
              </div>
            </div>
            <div class="count">
              <h1 id="currCount${index}" style="font-family:'tondubeta'; font-size: 40px;">${element.pCount}</h1>
            </div>

              `);
              console.log(html);
            }
    return;
  });
  let counterElm = document.getElementById("cards");
  if (counterObj.length != 0) {
    for (let i=0; i < JSON.parse(localStorage.getItem("counters")).length; i++)
      counterElm.innerHTML += html[i];
  } else {
    counterElm.innerHTML = `No counter Yet! Add a note using the form above.`;
  }
}

function getName(information){
  let name = ""
  len = information.length;
  for (i=1; i<len; i++){
    if (information[i] != "&") {
      name += information[i]
    } else{
      return name.replace("playerName=","");
    }

  }
}
function getPic(information){
  pic = information.substring(information.indexOf("playerPic="));
  return pic.replace("playerPic=","")
}

/* get player name
get count
increment or decrement */


function increment(clicked_id){
  clickedFrom = "currCount" + clicked_id;
  console.log(clickedFrom)
  let currentCount = document.getElementById(clickedFrom).innerText;
  document.getElementById(clickedFrom).innerText = parseInt(currentCount) + 1;
  //updateCount(clicked_id,currentCount)
  return;
}

function decrement(clicked_id){
  clickedFrom = "currCount" + clicked_id;
  let currentCount = parseInt(document.getElementById(clickedFrom).innerText);
  if (currentCount-1 < 0){
    document.getElementById(clickedFrom).innerText =  currentCount;
    return;
  }
  document.getElementById(clickedFrom).innerText =  currentCount - 1;
  return;
}
/*
function updateCount(clicked_id,currentCount){
  counterObj = JSON.parse(localStorage.getItem("counters"));
  counterObj.forEach(function(element, index) {
    if (index == clicked_id){
      sessionStorage.setItem(element.pName,parseInt(currentCount)+1)
      document.getElementById("currCount"+String(clicked_id)).innerHTML = parseInt(currentCount)+1
    }
  })
}

function updateCountDOWN(clicked_id,currentCount){
  counterObj = JSON.parse(localStorage.getItem("counters"));
  counterObj.forEach(function(element, index) {
    if (index == clicked_id){
      sessionStorage.setItem(element.pName,parseInt(currentCount)-1)
      document.getElementById("currCount"+String(clicked_id)).innerHTML = parseInt(currentCount)-1
    }
  })
}*/

function clearlocal(){
  localStorage.clear();
  location.replace('https://hzyazy.github.io');
  return;
}

newCard();