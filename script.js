class Animal {
  constructor(species, name, age, features) {
    this.species = species;
    this.name = name;
    this.age = age;
    this.features = features;
  }

  update(species, name, age, features) {
    this.species = species;
    this.name = name;
    this.age = age;
    this.features = features;
  }
}

class AnimalManager {
  constructor() {
    this.animals = [];
    this.currentEditIndex = null;
  }

  addAnimal(species, name, age, features) {
    const newAnimal = new Animal(species, name, age, features);
    this.animals.push(newAnimal);
    this.displayAnimals();
  }

  editAnimal(index) {
    const animal = this.animals[index];
    document.getElementById("species").value = animal.species;
    document.getElementById("name").value = animal.name;
    document.getElementById("age").value = animal.age.toString();
    document.getElementById("features").value = animal.features;
    this.currentEditIndex = index;
  }

  updateAnimal(species, name, age, features) {
    if (this.currentEditIndex !== null) {
      this.animals[this.currentEditIndex].update(species, name, age, features);
      this.currentEditIndex = null;
    }
    this.displayAnimals();
  }

  deleteAnimal(index) {
    this.animals.splice(index, 1);
    this.displayAnimals();
  }

  displayAnimals() {
    const animalList = document.getElementById("animal-list");
    animalList.innerHTML = this.animals.map((animal, index) => `
      <div class="animal-item col-12 col-md-6 col-lg-4 p-3 mb-3 border rounded bg-white">
        <div class="d-flex flex-column justify-content-between h-100">
          <div>
            <p><strong>Вид животного:</strong> ${animal.species}</p>
            <p><strong>Имя:</strong> ${animal.name}</p>
            <p><strong>Возраст:</strong> ${animal.age} года(лет)</p>
            <p><strong>Особенности:</strong> ${animal.features}</p>
          </div>
          <div>
            <button class="edit-btn btn btn-info btn-sm" data-index="${index}" onclick="manager.editAnimal(${index})">Изменить</button>
            <button class="delete-btn btn btn-danger btn-sm" data-index="${index}" onclick="manager.deleteAnimal(${index})">Удалить</button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

const manager = new AnimalManager();

document.addEventListener("DOMContentLoaded", function() {
  const animalForm = document.getElementById("animal-form");

  animalForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const species = document.getElementById("species").value;
    const name = document.getElementById("name").value;
    const age = parseFloat(document.getElementById("age").value);
    const features = document.getElementById("features").value;

    if (!species || !name || isNaN(age) || !features) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    if (manager.currentEditIndex === null) {
      manager.addAnimal(species, name, age, features);
    } else {
      manager.updateAnimal(species, name, age, features);
    }

    animalForm.reset();
  });

  const ageInput = document.getElementById("age");
  ageInput.addEventListener("input", function(event) {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, '');
    const firstDecimalIndex = value.indexOf('.');
    if (firstDecimalIndex !== -1) {
      value = value.substring(0, firstDecimalIndex + 1) + value.substring(firstDecimalIndex + 1).replace(/\./g, '');
    }
    event.target.value = value;
  });
});
