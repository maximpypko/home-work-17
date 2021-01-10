class List {
  archive = []
  name = ''
  constructor(name) {
    this.name = name;
  }

  //метод добавления 
  add(text, id) {
    const newRecord = {
      id: id,
      text: text,
    }
    this.archive.push(newRecord);
    this.recordInLocalStorage()
  }

  //метод удаления
  delete(id) {
    const index = this.getId(id);
    this.archive.splice(index, 1);
    this.recordInLocalStorage();
  }

  //метод редактирования
  update(text, id) { 
    const index = this.getId(id);
    this.archive[index].text = text;
    this.recordInLocalStorage();
  }
  
  //метод нахождения элемента
  getId(id) {
    return this.archive.findIndex((item) => item.id === id);
  }

  //метод записи в LS
  recordInLocalStorage() {
    return localStorage.setItem(this.name, JSON.stringify(this.archive));
  }

  //метод для чтения из LS
  getLocalStorageContent() {
    
    if (JSON.parse(localStorage.getItem(this.name))) {
      this.archive = JSON.parse(localStorage.getItem(this.name));
    } 
    return this.archive;
  }
}

const list = new List('list');
list.getLocalStorageContent();

list.add('Какая-то запись', 14);
list.add('Какая-то запись чтобы не забыть', 12);
list.update('Поменял на эту запись', 14);
list.delete(12);
console.log(list);


////////////////////////////////////////////////////////////
class TodoList extends List {
  constructor(name) {
    super(name);
  }

  //наследуемый метод добавления заметок
  add(text, id) {
    const newTask = {
        text: text,
        complitte: false, 
        id: id,
    }
    this.archive.push(newTask);
    this.recordInLocalStorage();
  }

  //помечает заметки как выполненные
  isComplitte(id) {
    const index = this.getId(id);
    this.archive[index].complitte = true;
    this.recordInLocalStorage();
  }

  //показывает сколько заметок и сколько заметок выполненно
  getStatistic() {
    const numberOfNotes = this.archive.length;
    const numberOfCompletedNotes = this.archive.filter((item) => item.complitte === true);

    return `Заметок ${numberOfNotes}, выполненных ${numberOfCompletedNotes.length}`;
  }
}

const newTodoList = new TodoList('New todo list');
newTodoList.getLocalStorageContent();

newTodoList.add('Посадить почки', 5);
newTodoList.add('Посадить траву', 6);
newTodoList.add('Посадить дерево', 7);

newTodoList.update('Сходить в магазин', 6)

newTodoList.isComplitte(6);

console.log(newTodoList.getStatistic());

newTodoList.delete(5);

console.log(newTodoList);



/////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
class ContactList extends List {
  constructor(name) {
    super(name);
  }

  //наследуемый метод добавления контактов
  add(nameContact, surnameContact, address, phone, id) {
    const newContact = {
      name: nameContact,
      surname: surnameContact,
      address: address,
      phone: phone,
      id: id,
    }
    this.archive.push(newContact);
    this.recordInLocalStorage();
  }

  //наследуемый метод редактирования
  update(id, phone) {
    const index = this.getId(id);
    this.archive[index].phone = phone;
    this.recordInLocalStorage();
  } 
  
  //метод для поиска контакта
  getContact(name, surname) {
    return this.archive.find((item) => item.name === name && item.surname === surname);
  }
}

const newContactList = new ContactList('New contact list');
newContactList.getLocalStorageContent();

newContactList.add('Ivan', 'Ivanov', 'Malinovskogo str. 123', '234-444-55-55', 1);
newContactList.add('Nikolay', 'Sidorov', 'Malinovskogo str. 123', '123-23-34-45', 2);
newContactList.add('Anna', 'Petrova', 'Malinovskogo str. 123', '098-234-76-33', 3);

newContactList.update(3, '050-123-45-67');

console.log(newContactList.getContact('Anna', 'Petrova'));

newContactList.delete(2);

console.log(newContactList);