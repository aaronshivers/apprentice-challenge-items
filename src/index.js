const itemForm = document.querySelector('#item-form');
const itemsList = document.querySelector('#items-list');

const items = JSON.parse(window.localStorage.getItem('items')) || [];

const addItemToStorage = (itemToAdd, storage) => {
  storage.unshift(itemToAdd);
  window.localStorage.setItem('items', JSON.stringify(storage));
};

const removeItemFromStorage = (itemToDelete, storage) => {
  const updatedItems = storage.filter((currentItem) => currentItem !== itemToDelete);
  window.localStorage.setItem('items', JSON.stringify(updatedItems));
};

const addItemToList = (item, storage) => {
  const label = document.createElement('label');
  label.id = item;

  const input = document.createElement('input');
  input.disabled = true;
  input.value = item;

  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.classList.add('btn-delete')

  button.addEventListener('click', () => {
    removeItemFromStorage(item, storage);
    const itemElement = document.querySelector(`#${item}`);
    itemElement.remove();
  });

  label.appendChild(input);
  label.appendChild(button);

  itemsList.insertBefore(label, itemsList.firstChild);
};

const initializeItemsList = (storage) => {
  storage.reverse().forEach((item) => {
    addItemToList(item, storage);
  });
};

if (items) {
  initializeItemsList(items);
}

itemForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newItem = event.target.item.value.trim();

  if (!items.includes(newItem)) {
    event.target.item.value = ''
    addItemToStorage(newItem, items);
    addItemToList(newItem, items);
  }
});
