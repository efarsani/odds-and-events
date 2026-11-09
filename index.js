// STATE: numbers stored in each category
const bank = [];
const odds = [];
const evens = [];

// STATE FUNCTIONS: change the numbers, then update the page
function addNumber(number) {
  bank.push(number);
  render();
}

function sortOne() {
  if (bank.length === 0) return;

  const number = bank.shift();

  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }

  render();
}

function sortAll() {
  while (bank.length > 0) {
    const number = bank.shift();

    if (number % 2 === 0) {
      evens.push(number);
    } else {
      odds.push(number);
    }
  }

  render();
}

// COMPONENT: the input and buttons
function NumberForm() {
  const form = document.createElement("form");

  const label = document.createElement("label");
  label.textContent = "Add a number to the bank ";
  label.htmlFor = "number";

  const input = document.createElement("input");
  input.id = "number";
  input.type = "number";
  input.step = "1";
  input.required = true;

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add number";

  const sortOneButton = document.createElement("button");
  sortOneButton.type = "button";
  sortOneButton.textContent = "Sort 1";
  sortOneButton.addEventListener("click", sortOne);

  const sortAllButton = document.createElement("button");
  sortAllButton.type = "button";
  sortAllButton.textContent = "Sort All";
  sortAllButton.addEventListener("click", sortAll);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (input.value.trim() === "") return;

    const number = Number(input.value);

    if (!Number.isInteger(number)) return;

    addNumber(number);
  });

  form.append(label, input, addButton, sortOneButton, sortAllButton);

  return form;
}

// COMPONENT: one category and its numbers
function NumberSection(title, numbers) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const box = document.createElement("div");
  box.textContent = numbers.join(" ");
  box.style.border = "1px solid black";
  box.style.borderRadius = "10px";
  box.style.padding = "10px";
  box.style.minHeight = "22px";

  section.append(heading, box);

  return section;
}

// RENDER: build the page using the current state
function render() {
  const app = document.querySelector("#app");

  const heading = document.createElement("h1");
  heading.textContent = "Odds and Events";

  app.replaceChildren(
    heading,
    NumberForm(),
    NumberSection("Bank", bank),
    NumberSection("Odds", odds),
    NumberSection("Evens", evens),
  );
}

// Display the page when the script first loads
render();
