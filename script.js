const persons = [];

const inputs = document.getElementsByTagName('input');
const addPersonBtn = document.getElementById('addPerson');
const getStatsBtn = document.getElementById('calcStats');

addPersonBtn.onclick = () => {

    if (!isAllInputsFilled()) {
        return;
    }

    if (!isPersonExists(personId.value)) {
        const p = new Person(personId.value, firstName.value, lastName.value, birthDate.value);
        persons.push(p);
        appendPerson(p);
        printStats();
        clearAllInputs();
    } else {
        alert(`Person with ID = ${personId.value} is already exists. Please check information`);
    }

};

getStatsBtn.onclick = () => printStats();


function Person(id, firstName, lastName, birthDate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = new Date(birthDate);
    this.getAge = function () {
        return Math.abs(new Date((Date.now() - this.birthDate.getTime())).getUTCFullYear() - 1970);
    };
    this.toString = function () {
        return `ID: ${this.id}, First name: ${this.firstName}, Last name: ${this.lastName}, Age: ${this.getAge()}`
    };


}

function isPersonExists(searchingId) {
    return persons.filter(p => p.id === searchingId).length > 0;
}

function clearAllInputs() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function appendPerson(person) {
    const li = document.createElement('li');
    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'X';
    removeBtn.setAttribute('data-remove-id', person.id);
    removeBtn.onclick = (e) => {
        removePersonFromArrayById(e.target.getAttribute('data-remove-id'));
        e.target.parentElement.remove();
        printStats();
    }
    li.textContent = person.toString();
    li.appendChild(removeBtn)
    personsList.appendChild(li);
}

function calculateStats() {
    if (persons.length > 0) {
        const ages = persons.map(p => p.getAge());
        const avgAge = createP("Average age is " + persons.reduce((accum, p) => accum + p.getAge(), 0) / persons.length);
        const maxAge = createP("Maximum age is " + Math.max(...ages));
        const minAge = createP("Minimum age is " + Math.min(...ages));
        return [avgAge, maxAge, minAge];
    }
}

function printStats() {
    clearStats();
    if (persons.length > 0) {
        const arrStats = calculateStats();
        stats.append(...arrStats);
    } else {
        alert(`There is no data for calculate statistics`);
    }
}

function createP(text) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}

function isAllInputsFilled() {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim().length === 0) {
            const atrName = inputs[i].getAttribute('data-name');
            alert(`The field "${atrName}" is required`);
            return false;
        }
    }
    return true;
}

function clearStats() {
    if (stats.firstElementChild.nextElementSibling) {
        while (stats.firstElementChild.nextElementSibling) {
            stats.firstElementChild.nextElementSibling.remove()
        }
    }
}


function removePersonFromArrayById(id) {
    let index;
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === id) {
            index = i;
        }
    }

    persons.splice(index, 1);
}