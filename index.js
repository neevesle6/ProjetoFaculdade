function Person(height, weight) {
    if (typeof(height) !== 'number' || isNaN(height))
        throw Error('height not a number');

    if (typeof(weight) !== 'number' || isNaN(weight))
        throw Error('weight not a number');

    this.height = height;
    this.weight = weight;
}

function Dietician(height, weight, crn) {
    Person.call(this, height, weight);
    this.crn = crn;
    this.calculateImc = function() {
        return this.weight / Math.pow(this.height, 2);
    }
    console.log(this);
}
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function Athlete(height, weight, crn) {
    Dietician.call(this, height, weight, crn);
    this.calculateDiet = function() {
        var imc = this.calculateImc();
        if (imc < 18.5) {
            return "Magreza";
        } else if (imc >= 18.5 && imc <= 24.9) {
            return "Normal";
        }else if (imc >= 24.9 && imc <= 30) {
            return "Sobrepeso";
        }else{
            return "Obesidade";
    }
    }
}
Athlete.prototype = Object.create(Dietician);
Athlete.prototype.constructor = Athlete;


function calculateImc() {

    var alturaEl = document.querySelector('#altura');
    var pesoEl = document.querySelector('#peso');

    return function (){
    var height = parseFloat(alturaEl.value);
    var weight = parseFloat(pesoEl.value);
    document.querySelector('#imc').innerHTML = new Dietician(height, weight, 1234).calculateImc();
    document.querySelector('#diet').innerHTML = new Athlete(height, weight, 1234).calculateDiet();
  }
}

window.onload = function(evt) {
    var btn = document.querySelector(".form button");

    btn.addEventListener("click", calculateImc());
}
