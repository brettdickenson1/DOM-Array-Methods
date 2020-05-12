const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWeathBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Double everyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort users by richest
// sort sorts numbers by richest to poorest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
// Filter function filters out anything you want it to

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
// Reduce

function calculateWeath() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
// assign providedData to data from json object informatio (API)
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  ////////////
  // For each item in the array create a function
  // which creates a new div
  providedData.forEach((item) => {
    const element = document.createElement('div');
    // we can then add a class called 'person' onto
    // this div using methodd classList.add
    element.classList.add('person');
    // add literal string with data item data from object
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    // finally appendChild method will take the above element and output it
    // to the dom
    main.appendChild(element);
  });
}

// Format number as money
// this function adds currency and formats money with commons and 2
// decimal places
function formatMoney(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
// add random user button
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWeathBtn.addEventListener('click', calculateWeath);

// forEach loops through the array then you do whatever you want with it
// Whereas .map loops through the array and returns a new array
