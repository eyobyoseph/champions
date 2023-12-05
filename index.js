import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: "https://ground-play-6c584-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorseInDatabase = ref(database, "endorsement");


const inputFieldEl = document.getElementById("input-field");
const inputPublish = document.getElementById("input-publish");
const addPEl = document.getElementById("add");


inputPublish.addEventListener("click", function() {
  let inputValue = inputFieldEl.value;
  clearInputFieldEl();
  // appendAddEl(inputValue);
  push(endorseInDatabase, inputValue);
});

onValue(endorseInDatabase, function(snapshot) {
  clearAddEl();
  let itemsArray = Object.entries(snapshot.val());
  for (let i = 0; i < itemsArray.length; i++) {
    let currentItem = itemsArray[i];
    let currentItemID = currentItem[0];
    let currentItemValue = currentItem[1];
    appendAddEl(currentItemValue);
  }
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearAddEl() {
  addPEl.textContent = "";
}

// function appendAddEl(itemID, itemValue) {
//   const newParagraph = document.createElement("p");  
//   newParagraph.textContent = `${itemID}: ${itemValue}`;
//   addPEl.appendChild(newParagraph);

//   newParagraph.addEventListener("click", function() {
//     let exactLocationOfEndoreseInDB = ref(database, `endorsement/${itemID}`);
//     console.log(exactLocationOfEndoreseInDB);
//     remove(exactLocationOfEndoreseInDB);
//   });
// }
function appendAddEl(itemID, itemValue) {
  const newParagraph = document.createElement("p");  
  newParagraph.textContent = `${itemID}: ${itemValue}`;
  addPEl.appendChild(newParagraph);

  // Add a unique identifier to the paragraph for the event listener
  newParagraph.setAttribute("data-item-id", itemID);

  newParagraph.addEventListener("click", function() {
    // Retrieve the item ID from the data attribute
    let clickedItemID = this.getAttribute("data-item-id");

    // Construct the reference to the exact location in the database
    let exactLocationOfEndorseInDB = ref(database, `endorsement/${clickedItemID}`);
    
    // Remove the item from the database
    remove(exactLocationOfEndorseInDB);
  });
}
























