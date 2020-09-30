"use strict";

function WisheshConstructor(greeting, appeal, wishes) {
  //конструктор новых объектов
  this.greeting = greeting;
  this.appeal = appeal;
  this.wishes = wishes;
}

function greetings(name) {
  //функция приветствия
  return alert(
    `${this.greeting}, ${this.appeal} ${name}! ${this.wishes}.`
  );
}

const doctor = new WisheshConstructor("Hello", "dr.", "Have a nice day");
const colleague = new WisheshConstructor("Hi", "dear", "Regards, John");

const greetingDoctor = greetings.bind(doctor);
const greetingColleague = greetings.bind(colleague);

greetingDoctor('Watson');
greetingColleague('Kristy');
