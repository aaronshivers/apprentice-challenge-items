const itemForm = document.querySelector('#item-form');
const itemsList = document.querySelector('#items-list');

const addItemToStorage = (itemToAdd) => {
  const items = JSON.parse(window.localStorage.getItem('items'));
  items.unshift(itemToAdd);
  window.localStorage.setItem('items', JSON.stringify(items));
};

const removeItemFromStorage = (itemToDelete) => {
  const items = JSON.parse(window.localStorage.getItem('items'));

  const updatedItems = items.filter((currentItem) => currentItem !== itemToDelete);
  window.localStorage.setItem('items', JSON.stringify(updatedItems));
};

const addItemToList = (item) => {
  const label = document.createElement('label');
  label.id = item;

  const input = document.createElement('input');
  input.disabled = true;
  input.value = item;

  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.classList.add('btn-delete')

  button.addEventListener('click', () => {
    removeItemFromStorage(item);
    const itemElement = document.querySelector(`#${item}`);
    itemElement.remove();
  });

  label.appendChild(input);
  label.appendChild(button);

  itemsList.insertBefore(label, itemsList.firstChild);
};

itemForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newItem = event.target.item.value.trim();

  const items = JSON.parse(window.localStorage.getItem('items'));

  if (!items.includes(newItem)) {
    event.target.item.value = ''
    addItemToStorage(newItem);
    addItemToList(newItem);
  }
});

const initializeItemsList = () => {
  const items = JSON.parse(window.localStorage.getItem('items')) || [];

  items.reverse().forEach((item) => {
    addItemToList(item);
  });
};

initializeItemsList();

