var state = {
  items: []
};


var itemTemplate = (
  '<li>' +
    '<span class="shopping-item js-shopping-item"></span>' +
    '<div class="shopping-item-controls">' +
     '<button class="js-shopping-item-toggle">' +
       '<span class="button-label">check</span>' +
     '</button>' +
     '<button class="js-shopping-item-delete">' +
       '<span class="button-label">delete</span>' +
       '</button>' +
       '</div>' +
    '</li>'
  );

function addItem(state, item) {
  state.items.push({
    itemName: item,
    checkBox: false
  });
}

function deleteItem(state, index) {
  state.items.splice(index, 1);
}

function getItem(state, index) {
  return state.items[index];
}

function modifyItem(state, index, newState) {
  state.items[index] = newState;
}



function renderItem(item, itemId, itemTemplate, itemData) {
  var element = $(itemTemplate);
  element.find('.js-shopping-item').text(item.itemName);
  if (item.checkBox) {
    element.find('.js-shopping-item').addClass('shopping-item_checked');
  }

  element.find('.js-shopping-item-toggle')
  element.attr(itemData, itemId);
  return element;
}

function renderList(listElement, state, itemData) {
  var listItems = state.items.map(
    function(item, index) {
      return renderItem(item, index, itemTemplate, itemData);
    });
  listItem.html(listItems);
}

function handleAdd(formId, newItemId, itemData, listElement, state) {
  formId.on('submit', function(event){
    event.preventDefault();
    var newItem = formId.find(newItemId).val();
    addItem(state, newItem);
    renderList(listElement, state, itemData);
  })
}


function handleDeletes(formId, removeId, itemData, state, listElement) {
  listElement.on("click", removeId, function(event){
    var itemIndex = $(this).closest('li').attr(itemData));
    deleteItem(state, itemIndex);
    renderList(listElement, state, itemData);
  })
}


function itemUpdate(listElement, toggleId, state, itemData){
  listElement.on('click', toggleId, function(event){
    var itemId = $(this).closest('li').attr(itemData);
    var oldItem = getItem(state, itemId);
    modifyItem(state, itemId, {
      checkBox: !oldItem.checkBox
    });
    renderList(listElement, itemData, state)
  });
}

$(function(){
  var formId = $('#js-shopping-list-form');
  var listElement = $('.js-shopping-list');
  var newItemId = $('#js-new-item');
  var removeId = '.js-shopping-item-delete';
  var itemData = 'data-list-item-id';
  var toggleId = '.js-shopping-item-toggle';

  handleAdd(formId, newItemId, itemData, listElement, state);
  handleDeletes(formId, removeId, itemData, state, listElement);
  itemUpdate(listElement, toggleId, state, itemData);
});
