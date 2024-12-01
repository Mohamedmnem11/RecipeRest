// loading
setTimeout(() => {
    document.querySelector('.loading-slider').style.opacity = "0";
    document.querySelector('.loading-slider').style.zIndex = "-1";
}, 3800);

//navbar
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 50) {
            navbar.style.backgroundColor = "#ff9638";
        } else {
            navbar.style.backgroundColor = "transparent";
        }
    });
}
initNavbarScroll();

//navbar activation
const links = document.querySelectorAll(".nav-item a");
links.forEach(link => {
    link.addEventListener('click', (e) => {
        setActivelink(e);
    });
});
function setActivelink(e) {
    // Remove 'link-clicked' class from all links
    links.forEach(link => {
        link.classList.remove('link-checked');
    });
    // Add 'link-checked' class to checked button
    e.target.classList.add('link-checked');
}
// Data from api
let RandomDataApi = [];
async function getRandomItems() {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        if (!response.ok) {
            throw ("Network response is not ok " + response.statusText);
        }
        let data = await response.json();
        let item = data.meals[0];
        // console.log(item)
        RandomDataApi.push(item);

    } catch (error) {
        console.error("There is a problem with the fetch operation:", error);
    }
}

function displayCarouselItem() {
    let carouselItems = document.getElementById("carouselContent");
    let cardsHTML = ``;

    for (let i = 0; i < 3; i++) {
        //Display the current carousel item;
        cardsHTML += `
        <div class="carousel-item text-md-center active">
            <div class="carousel-item-info text-white position-absolute top-50 start-50 translate-middle">
                <h1>${RandomDataApi[i].strMeal}</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi quo aspernatur facere optio voluptatibus explicabo
                    minima tenetur dolore totam, consectetur ducimus deserunt qui quas vero error, enim culpa nihil atque.</p>
                <ul class="post-meta list-unstyled d-flex justify-content-center gap-3">
                    <li class="border-end border-2 pe-2">
                        <i class="fa-solid fa-earth-americas fs-5"></i>
                        A Taste of
                        <p class="m-0">${RandomDataApi[i].strArea}</p>
                    </li>
                    <li>
                        <i class="fa-solid fa-utensils fs-5"></i>
                        Delights of
                        <p class="m-0">${RandomDataApi[i].strCategory}</p>
                    </li>
                </ul>
                <ul class="links list-unstyled mt-4 d-flex justify-content-center gap-2">
                    <li>
                        <a class="btn text-white text-nowrap" data-mdb-ripple-init style="background-color: #ff9638;" href="recipe-details.html?recipe=${RandomDataApi[i].idMeal}" role="button">
                            <i class="fa-solid fa-arrow-right  me-2"></i>
                            View Recipe
                        </a>
                    </li>
                    <li class="ms-3">
                        <a class="btn text-white text-nowrap" data-mdb-ripple-init style="background-color: #ff9638;" href="${RandomDataApi[i].strYoutube}" role="button">
                            <i class="fab fa-youtube me-2"></i>
                            Recipe Video
                        </a>
                    </li>
                </ul>
            </div>
        </div>`;
        carouselItems.innerHTML = cardsHTML;
    }
}
// Recipes types Data
async function recipesTypesData() {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        if (!response.ok) {
            throw ("Network response is not ok " + response.statusText);
        }
        let data = await response.json();
        let categories = data.categories;
        document.getElementById("recipes-types").innerHTML = ``;

        // Loop through categories and fetch recipe count for each
        for (const category of categories) {
            // Fetch the number of recipes for the current category
            let recipeCountResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);
            if (!recipeCountResponse.ok) {
                throw ("Network response is not ok " + recipeCountResponse.statusText);
            }
            let recipeCountData = await recipeCountResponse.json();
            let recipeCount = recipeCountData.meals.length; // Get the number of recipes for the category

            // Render the category along with the number of recipes
            document.getElementById("recipes-types").innerHTML += `
                <div class=" col-sm-6 col-md-4 col-lg-3">
                    <a class="ct-category" href="recipesByCategory.html?category=${category.strCategory}">
                        <div class="ct-category-icon">
                            <img src="${category.strCategoryThumb}" alt="" class="img-fluid img-thumbnail hover-zoom">
                            <h5 class="small fw-bold my-4">${category.strCategory}</h5>
                            <span class="bg-white">Recipes: ${recipeCount}</span> <!-- Recipe Count -->
                        </div>
                    </a>
                </div>
            `;
        }
    } catch (error) {
        console.error("There is a problem with the fetch operation:", error);
    }
}


function mostPopularRecipes() {
    document.getElementById("recipes-list-content").innerHTML += ``;
    for (let i = 3; i < 15; i++) {
        //Display the current carousel item;
        document.getElementById("recipes-list-content").innerHTML += `
    <div class="col-sm-6 col-md-4 col-lg-3 ">
        <div class="card ">
            <div class="bg-image hover-overlay position-relative" data-mdb-ripple-init data-mdb-ripple-color="light">
                <img src="${RandomDataApi[i].strMealThumb}" class="img-fluid" />
                <a  href="recipe-details.html?recipe=${RandomDataApi[i].idMeal}" class="btn btn-primary view-Recipe" data-mdb-ripple-init >View Recipe</a>
            </div>
            <div class="p-1" style="background-color: #ff9638;">
                <small class="text-white">Last updated 3 mins ago</small>
            </div>
            <div class="card-body p-2" style="height:160px">
                <h5 class="card-title">${RandomDataApi[i].strMeal}</h5>
                    <ul class="post-meta list-unstyled">
                        <li class="d-flex justify-content-between align-items mb-3">
                            <div>
                            <i class="fa-solid fa-earth-americas fs-5 me-2" style="color: #ff9638;"></i>
                            <span >A Taste of</span>
                            </div>
                            <div style="color: #ff9638;">${RandomDataApi[i].strArea}</div>
                        </li>
                        <li class="d-flex justify-content-between align-items ">
                            <div>
                            <i class="fa-solid fa-utensils fs-5 me-2" style="color: #ff9638;"></i>
                            <span >Delights of</span>
                            </div>
                            <div style="color: #ff9638;">${RandomDataApi[i].strCategory}</div>
                        </li>
                    </ul>
            </div>
        </div>
    </div>`;
    }
}
//client Testimonials
let clientTestimonials = [
    {
        "userName": "Hanry Ellison",
        "jobTitle": "Example Inc",
        "userImg": "imgs/person-1.jpg",
        "testimonial": "I just wanted to say thank you for your delicious recipes. My husband and I have been thoroughly enjoying the..."
    },
    {
        "userName": "Mary Nancy",
        "jobTitle": "Example Inc",
        "userImg": "imgs/person-3.jpg",
        "testimonial": "This Website has completely changed my cooking game! The step-by-step instructions are so easy to follow, and the variety of recipes is amazing. I've impressed my family so many times!"
    },
    {
        "userName": "Michelle Murray",
        "jobTitle": "Example Inc",
        "userImg": "imgs/person-5.jpg",
        "testimonial": "I was never much of a cook, but this Website made it fun and easy. Now, I actually look forward to trying new recipes every week. Highly recommend!"
    },
    {
        "userName": "Eric Filler",
        "jobTitle": "Example Inc",
        "userImg": "imgs/person-4.jpg",
        "testimonial": "I love how this Website caters to all skill levels. Whether I'm in a rush or have time to experiment, I always find something delicious to make!"
    }
];

function displayClientTestimonials() {
    let swiper;
    const cardList = document.getElementById("card-list");
    cardList.innerHTML = '';

    // Generate HTML for the testimonials
    let cardsHTML = '';
    for (const item of clientTestimonials) {
        cardsHTML += `
            <div class="swiper-slide rounded-4 p-1 bg-light  ">
                <div class="d-flex gap-2 card-item position-relative  shadow">
                    <div class="image-test img-fluid">
                        <img src="${item.userImg}" alt="">
                    </div>
                    <div>
                        <div class="small">${item.testimonial}</div>
                        <div class="client-info">
                            <h6 class="my-1">${item.userName}</h6>
                            <small>${item.jobTitle}</small>
                        </div>
                    </div>
                </div>
                <div class="quote-icon">
                    <i class="fa-solid fa-quote-right"></i>
                </div>
            </div>
        `;
    }

    cardList.innerHTML = cardsHTML;

    // Initialize or update Swiper
    if (swiper) {
        swiper.update();
    } else {
        swiper = new Swiper('.slider-wrapper', {
            loop: false,
            grabCursor: true,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1, // 1 slide on small screens
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 2, // 2 slides on medium screens
                    spaceBetween: 15
                },
                1024: {
                    slidesPerView: 3, // 3 slides on larger screens
                    spaceBetween: 20
                }
            },
            on: {
                init: () => {
                    setEqualHeight();
                },
                resize: () => {
                    setEqualHeight();
                }
            }
        });
    }

    // Set equal height to all the cards
    function setEqualHeight() {
        let maxHeight = 0;
        const cardItems = document.querySelectorAll('.card-item');

        // Reset heights before calculating
        cardItems.forEach(item => {
            item.style.height = 'auto';
        });

        // Find the max height
        cardItems.forEach(item => {
            let cardHeight = item.offsetHeight;
            if (cardHeight > maxHeight) {
                maxHeight = cardHeight;
            }
        });

        // Set all card items to the max height
        cardItems.forEach(item => {
            item.style.height = maxHeight + 'px';
        });
    }
}



//chiefs
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
function displayChiefs() {
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
}
//recommendedRecipes
function displayRecommendedRecipes() {
    let recommendedRecipes = document.getElementById("recommended-recipes");
    let cardsHTML = ``;
    for (let i = 15; i < 23; i++) {
        cardsHTML += `
        <div class="recommended-item col-sm-6 col-md-4 col-lg-3">
                <div class="image-recommend bg-image hover-zoom position-relative ">
                    <img src="${RandomDataApi[i].strMealThumb}" class="w-100" />
                    <div class="inner-box d-flex justify-content-center align-items-center">
                        <div class="links py-3">
                            <a href="recipe-details.html?recipe=${RandomDataApi[i].idMeal}" class="">${RandomDataApi[i].strMeal}</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        recommendedRecipes.innerHTML = cardsHTML;
    }
}

async function callingOrder() {
    for (let i = 0; i < 24; i++) {
        await getRandomItems();
        // console.log(RandomDataApi[i]);
    }
    await displayCarouselItem();
    await recipesTypesData();
    await mostPopularRecipes();
    await displayClientTestimonials();
    await displayChiefs();
    await displayRecommendedRecipes();
    console.log(RandomDataApi.length);
}
callingOrder();
