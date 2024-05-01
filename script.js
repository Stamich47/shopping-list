// Variables

const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');


// Functions

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function createButton(classes){
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;

}



function addItem(e){
  e.preventDefault();
  const newItem = itemInput.value;

  if(newItem === '') {
    alert('Please add an item');
    return;
  }

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);
  itemInput.value = '';
  

}



// Event Listeners

itemForm.addEventListener('submit', addItem)