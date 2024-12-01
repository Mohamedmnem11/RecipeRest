(function () {
    const navbar = document.getElementById('navbar');
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 50) {
            navbar.style.backgroundColor = "#ff9638";
        } else {
            navbar.style.backgroundColor = "transparent";
        }
    });
})();
//auth part
console.log("Script loaded successfully!");

document.addEventListener('DOMContentLoaded', function () {
    (function () {
        const token = localStorage.getItem("authToken");
        if (!token) {
            Swal.fire({
                title: 'Error!',
                text: 'You must be logged in to access this page.',
                icon: 'error',
                confirmButtonText: 'Login Now'
            }).then(() => {
                window.location.href = "login&signup.html"; // Redirect after alert
            });
        }
    })();
});


let chiefsArr = [
    {
        chiefImg: "imgs/chef-1.jpg",
        num_Recipe: "1 Recipes",
        name: 'Philip Wales',
        nationality: 'French Chef',
    },
    {
        chiefImg: "imgs/chief-2.jpg",
        num_Recipe: "1 Recipes",
        name: 'Hanry Laim',
        nationality: 'American Chef',
    },
    {
        chiefImg: "imgs/chief-3.jpg",
        num_Recipe: "2 Recipes",
        name: 'Mary Dark',
        nationality: 'Italian Chef',
    },
    {
        chiefImg: "imgs/chief-4.jfif",
        num_Recipe: "1 Recipes",
        name: 'Philip Wales',
        nationality: 'French Chef',
    },
    {
        chiefImg: "imgs/chief-5.jfif",
        num_Recipe: "3 Recipes",
        name: 'Andrew Brown',
        nationality: 'French Chef',
    },
    {
        chiefImg: "imgs/chief-6.jfif",
        num_Recipe: "2 Recipes",
        name: 'Micheal Spring',
        nationality: 'Mexican Chef',
    }
];
(function(){
    document.getElementById("chiefs").innerHTML = ``;
    for (const item of chiefsArr) {
        document.getElementById("chiefs").innerHTML += `
        <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="card">
                <div class="bg-image position-relative text-center">
                    <img src="${item.chiefImg}" class="img-fluid rounded-top-4" alt="...">
                    <a  href="#!" class="btn btn-primary chief-recipes" >Recipes</a>
                </div>
                <div class="p-2 number-recipes" style="background-color: #ff9638;">
                    <i class="fa-sharp fa-solid fa-spoon fs-5 me-2"></i>
                    <span>${item.num_Recipe}</span>
                </div>
                <ul class="card-body p-2 mb-0 list-unstyled">
                    <li class="card-title mb-2 fs-4">${item.name}</li>
                    <li class="card-text mb-2"> ${item.nationality}</li>
                    <li class="paragraph-card mb-2"><i class="fa-solid fa-envelope me-2"></i> info@example.com</li>
                    <li class="paragraph-card mb-2"><i class="fa-solid fa-globe me-2"></i> www.example.com</li>
                    <li class="text-muted mb-2"> <i class="fa-solid fa-phone me-2"></i> 123 456 7890 </li>
                </ul>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i> </a>
                    <a href="#"> <i class="fa-brands fa-linkedin"></i> </a>
                </div>
            </div>
        </div>
        
        
        `;

    }
})();


////////////////////////
let recipeName = document.getElementById("recipeName");
let dishType = document.getElementById("dishType");
let prepTime = document.getElementById("prepTime");
let servings = document.getElementById("servings");
let cookTime = document.getElementById("cookTime");
let shelfLife = document.getElementById("shelfLife");
let difficulty = document.getElementById("difficulty");
let image = document.getElementById("image");
let ingredients = document.getElementById("ingredients");
let directions = document.getElementById("directions");
let name = document.getElementById("name");
let email = document.getElementById("email");
let submit = document.getElementById("submit");
let deleteAll = document.getElementById("deleteAll");
let recipeList = document.getElementById("create_curds");

let arr = [];
let temp;
let mood = "Add Recipe";

// Load tasks if they exist in localStorage
if (localStorage.getItem("recipes") != null) {
    arr = JSON.parse(localStorage.getItem("recipes"));
    deleteAll.style.display = "block";
    showData();
}

// Delete all recipes
deleteAll.onclick = function () {
    arr = [];
    localStorage.removeItem("recipes");
    showData();
    deleteAll.style.display = "none";
};

// Function to delete a specific recipe
function deleteRecipe(index) {
    arr.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(arr));
    showData();
}

// Function to display the recipes
function showData() {
    let output = "";
    for (let j = 0; j < arr.length; j++) {
        output += `
         <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="card">
                <div class="bg-image position-relative text-center">
                    <img src="${arr[j].image}" class="img-fluid rounded-top-4" alt="...">
                </div>
                <div class="p-2 number-recipes" style="background-color: #ff9638;">
                    <i class="fa-sharp fa-solid fa-spoon fs-5 me-2"></i>
                    <span>Recipe Name: ${arr[j].recipeName}</span>
                </div>
                <ul class="card-body p-2 mb-0 list-unstyled">
                    <li class="card-title mb-2 fs-4">Dish Type: ${arr[j].dishType}</li>
                    <li class="card-text mb-2">Preparation Time: ${arr[j].prepTime} mins</li>
                    <li class="card-text mb-2">No. of servings: ${arr[j].servings}</li>
                    <li class="card-text mb-2">Cooking Time: ${arr[j].cookTime} mins</li>
                    <li class="card-text mb-2">Shelf Life: ${arr[j].shelfLife} days</li>
                    <li class="card-text mb-2">Difficulty: ${arr[j].difficulty}</li>
                    <li class="card-text mb-2">Your Name: ${arr[j].name}</li>
                    <li class="card-text mb-2"><i class="fa-solid fa-envelope me-2"></i> <a href="mailto:${arr[j].email}" class="card-link">${arr[j].email}</a></li>
                </ul>
                <div class="card-footer d-flex align-items-center justify-content-evenly">
                    <button class="btn btn-success" onclick="updateRecipe(${j})">Update</button>
                    <button class="btn btn-danger" onclick="deleteRecipe(${j})">Delete</button>
                </div>
            </div>
        </div>
       `;
    }

    recipeList.innerHTML = output;

    if (arr.length > 0) {
        deleteAll.style.display = "block";
    } else {
        deleteAll.style.display = "none";
    }
}

// Clear the form inputs after submission
function clearInput() {
    document.querySelectorAll("form .form-control").forEach((input) => {
        input.value = "";
    });
    image.value = null; // Clear the image input
}

// Add or update recipe
submit.onclick = function () {
    const recipe = {
        recipeName: recipeName.value,
        dishType: dishType.options[dishType.selectedIndex].text,
        prepTime: prepTime.value,
        servings: servings.value,
        cookTime: cookTime.value,
        shelfLife: shelfLife.value,
        difficulty: difficulty.options[difficulty.selectedIndex].text,
        ingredients: ingredients.value,
        directions: directions.value,
        name: name.value,
        email: email.value,
        image: "" // We'll populate this after selecting the image
    };

    // If an image is selected, handle image upload and add to recipe
    if (image.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            recipe.image = e.target.result; // Store image as base64 string
            saveRecipe(recipe);
        };
        reader.readAsDataURL(image.files[0]);
    } else {
        saveRecipe(recipe);
    }

    clearInput(); // Clear the form inputs after saving
};

// Save the recipe
function saveRecipe(recipe) {
    if (mood === "Add Recipe") {
        arr.push(recipe);
    } else {
        arr[temp] = recipe;
        mood = "Add Recipe";
        submit.innerHTML = "Add Recipe";
    }

    localStorage.setItem("recipes", JSON.stringify(arr));
    showData();
}

// Update recipe
function updateRecipe(index) {

    temp = index;
    mood = "Update Recipe";
    submit.innerHTML = "Update";

    window.scrollTo({
        left: 0,
        top: 1400,
        behavior: "smooth",
    });

    let recipe = arr[index];
    checkFormValidity();
    console.log('Updating recipe: ', recipe);

    // Set input values
    recipeName.value = recipe.recipeName;
    prepTime.value = recipe.prepTime;
    servings.value = recipe.servings;
    cookTime.value = recipe.cookTime;
    shelfLife.value = recipe.shelfLife;
    ingredients.value = recipe.ingredients;
    directions.value = recipe.directions;
    name.value = recipe.name;
    email.value = recipe.email;

    // Set the select values based on the recipe properties
    dishType.value = recipe.dishType; // This needs to match the value in the option
    difficulty.value = recipe.difficulty; // This needs to match the value in the option

    // Debugging logs
    console.log('Setting dishType to: ', dishType.value);
    console.log('Setting difficulty to: ', difficulty.value);

    // Reinitialize selects if needed
    if (typeof mdb !== 'undefined' && mdb.Select) {
        mdb.Select.init(dishType);
        mdb.Select.init(difficulty);
    }
}

