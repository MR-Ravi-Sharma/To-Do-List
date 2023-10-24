const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("myButton");

const addTask = () => {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else if (addBtn.textContent === "Save") {
    addBtn.textContent = "Add";
    const editingList = document.querySelector(".editing");
    const targetEl = editingList.parentElement.parentElement.firstElementChild;
    targetEl.innerHTML = inputBox.value;
    editingList.classList.remove("editing");
    inputBox.value = "";
  } else {
    let li = document.createElement("li");
    li.innerHTML = `<p class="first-child">${inputBox.value}</p>`;
    listContainer.appendChild(li);
    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.innerHTML = `<span class="edit-btn">Edit</span><span class="delete-btn">Del</span>`;
    li.appendChild(btnContainer);
  }
  inputBox.value = "";
  saveData();
};

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "P") {
      e.target.parentElement.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      let li = e.target.parentElement.parentElement;
      if (
        e.target.classList.contains("edit-btn") &&
        li.classList.contains("checked") === false
      ) {
        let changeEl = document.querySelectorAll(".editing");
        for (let i = 0; i < changeEl.length; i++) {
          changeEl[i].classList.remove("editing");
        }
        inputBox.value = li.firstElementChild.innerHTML;
        inputBox.focus();
        addBtn.textContent = "Save";
        e.target.classList.add("editing");
      } else if (e.target.classList.contains("delete-btn")) {
        li.remove();
      }

      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

document
  .getElementById("input-box")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
      document.getElementById("myButton").click();
    }
  });

showTask();
