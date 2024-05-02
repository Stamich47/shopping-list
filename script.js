// Variables

const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

// Functions

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });

  checkUI();
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  // Check for Edit Mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert(`${newItem} already exists.`);
      return;
    }
  }

  addItemToDOM(newItem);
  addItemtoStorage(newItem);

  checkUI();

  itemInput.value = "";
}

function addItemtoStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  const itemCap = item.charAt(0).toUpperCase() + item.slice(1);
  // Add new item to array
  itemsFromStorage.push(itemCap);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  const itemCap = item.charAt(0).toUpperCase() + item.slice(1);
  li.appendChild(document.createTextNode(itemCap));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  const itemCap = item.charAt(0).toUpperCase() + item.slice(1);
  return itemsFromStorage.includes(itemCap);
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm(`Are you sure you want to delete ${item.textContent}?`)) {
    // Remove item from DOM
    item.remove();

    // Remove item from Local Storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearAllItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear All from local storage
  localStorage.removeItem("items");

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = "<i class=fa-solid fa-plus></i> Add Item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
}

// Initialize App containing all event listeners
function init() {
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearAllItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();

// Can I create an alphabetical list button?

let list = getItemsFromStorage();
let capArr = [];

function listUpperCase() {
  let capArr = [];

  for (let i = 0; i < list.length; i++) {
    let capitalFirstLetter = list[i].charAt(0).toUpperCase();
    let capWord = capitalFirstLetter + list[i].slice(1);
    capArr.push(capWord);
  }
  return capArr;
}

const capItems = listUpperCase();
const alphaCapItems = capItems.sort();
console.log(alphaCapItems);
