
const form = document.getElementById('commentForm');
const nameField = document.getElementById('commentName');
const messageField = document.getElementById('commentText');
const errorMsg = document.getElementById('errorMsg');
const commentsList = document.getElementById('commentList');

window.onload = function () {
    loadComments();
};

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (checkFields()) {
            saveComment();
            form.reset();
            errorMsg.style.color = "green";
            errorMsg.textContent = "Posted successfully!";
        }
    });
}

function checkFields() {
    if (nameField.value.trim() === "") {
        showError("Please enter your name.");
        return false;
    }
    if (messageField.value.trim() === "") {
        showError("Please enter a message.");
        return false;
    }
    return true;
}

function showError(msg) {
    errorMsg.style.color = "red";
    errorMsg.textContent = msg;
}

function saveComment() {
    const comment = {
        name: nameField.value,
        message: messageField.value
    };
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push(comment);
    localStorage.setItem("comments", JSON.stringify(comments));
    displayComments(comments);
}

function loadComments() {
    let comments = JSON.parse(localStorage.getItem("comments")) || [];
    displayComments(comments);
}

function displayComments(comments) {
    commentsList.innerHTML = "";
    comments.forEach(function (c) {
        const div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = "<strong>" + c.name + ":</strong><p>" + c.message + "</p>";
        commentsList.appendChild(div);
    });
}

const privateForm = document.getElementById('privateForm');

if (privateForm) {
    privateForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('privateName').value.trim();
        const email = document.getElementById('privateEmail').value.trim();
        const message = document.getElementById('privateMessage').value.trim();
        if (name === "" || email === "" || message === "") {
            alert("Please fill out all required fields.");
            return;
        }
        document.getElementById('privateSuccess').style.display = 'block';
        privateForm.reset();
    });
}

const checkboxes = document.querySelectorAll('.step-list input');
checkboxes.forEach((box, index) => {
    const saved = localStorage.getItem("step_" + index);
    if (saved === "true") {
        box.checked = true;
    }
    box.addEventListener('change', function () {
        localStorage.setItem("step_" + index, box.checked);
    });
});

const mealForm = document.getElementById("mealForm");
const mealPlanList = document.getElementById("mealPlanList");

if (mealForm) {
	mealForm.addEventListener("submit", function(e) {
		e.preventDefault();
		const day = document.getElementById("day").value;
		const meal = document.getElementById("mealName").value.trim();
		const ingredients = document.getElementById("ingredients").value.trim();
		if (day === "" || meal === "" || ingredients === "") {
			alert("Please fill out all fields.");
			return;
		}
		const plan = {
			day: day,
			meal: meal,
			ingredients: ingredients
		};
		let plans = JSON.parse(localStorage.getItem("mealPlans")) || [];
		plans.push(plan);
		localStorage.setItem("mealPlans", JSON.stringify(plans));
		displayMeals();
		mealForm.reset();
	});
}

function displayMeals() {
	let plans = JSON.parse(localStorage.getItem("mealPlans")) || [];
	mealPlanList.innerHTML = "";
	plans.forEach((p, index) => {
		const div = document.createElement("div");
		div.classList.add("comment");
		div.innerHTML = `
			<strong>${p.day}</strong>
			<p><b>Meal:</b> ${p.meal}</p>
			<p><b>Ingredients:</b> ${p.ingredients}</p>
			<button onclick="deleteMeal(${index})">Delete</button>
		`;
		mealPlanList.appendChild(div);
	});
}

function deleteMeal(index) {
	let plans = JSON.parse(localStorage.getItem("mealPlans")) || [];
	plans.splice(index, 1);
	localStorage.setItem("mealPlans", JSON.stringify(plans));
	displayMeals();
}

window.onload = function () {
	displayMeals();
};

function toggleMenu() {
    const nav = document.getElementById("navMenu");
    nav.classList.toggle("active");
}