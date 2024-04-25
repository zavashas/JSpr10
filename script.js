const animals = [];

document.addEventListener("DOMContentLoaded", function() {
  const animalForm = document.getElementById("animal-form");
  const animalList = document.getElementById("animal-list");

  animalForm.addEventListener("submit", function(event) {
    event.preventDefault();
    addOrUpdateAnimal();
  });

  animalList.addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("edit-btn")) {
      editAnimal(target.dataset.index);
    } else if (target.classList.contains("delete-btn")) {
      deleteAnimal(target.dataset.index);
    }
  });

  function addOrUpdateAnimal() {
    const species = getValue("species");
    const name = getValue("name");
    const age = parseInt(getValue("age"));
    const features = getValue("features"); 
    if (!species || !name || !age || !features) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const animal = {
      species,
      name,
      age,
      features 
    };

    const index = animals.findIndex(ani => ani.name === name);
    if (index !== -1) {
      animals[index] = animal;
    } else {
      animals.push(animal);
    }

    displayAnimals();
    clearForm();
  }

  function displayAnimals() {
    animalList.innerHTML = animals.map((animal, index) => `
      <div class="animal-item">
        <p><strong>Вид животного:</strong> ${animal.species}</p>
        <p><strong>Имя:</strong> ${animal.name}</p>
        <p><strong>Возраст:</strong> ${animal.age} года(лет)</p>
        <p><strong>Особенности:</strong> ${animal.features}</p> 
        <button class="edit-btn" data-index="${index}">Изменить</button>
        <button class="delete-btn" data-index="${index}">Удалить</button>
      </div>
    `).join("");
  }


  function getValue(id) {
    return document.getElementById(id).value.trim();
  }


  function clearForm() {
    animalForm.reset();
  }

  function deleteAnimal(index) {
    animals.splice(index, 1);
    displayAnimals();
  }

  function editAnimal(index) {
    const animal = animals[index];
    setValue("species", animal.species);
    setValue("name", animal.name);
    setValue("age", animal.age);
    setValue("features", animal.features); 
  }

});

function setValue(id, value) {
  document.getElementById(id).value = value;
}
