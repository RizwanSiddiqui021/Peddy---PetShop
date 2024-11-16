// spinner
const showSpinner = () => {};
// Load ALL Categories
const loadCategories = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  displayCategories(data.categories);
};

// remove active button
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("bg-[#0E7A811A]", "rounded-[120px]");
  }
};

// Show Specific Category
const specificCategory = async (category) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();
  removeActiveClass();
  const activeButton = document.getElementById(`category-btn-${category}`);
  activeButton.classList.add("border-2", "bg-[#0E7A811A]", "rounded-[120px]");
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = `<div id="spinner" class="col-span-3 flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>`;
  showSpinner(
    setTimeout(function () {
      displayAllpets(data.data);
    }, 2000)
  );
};

// Display Categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById(
    "category-buttons-container"
  );

  categories.forEach((singleCategory) => {
    const { category, category_icon } = singleCategory;
    const div = document.createElement("div");
    div.innerHTML = `<button id="category-btn-${category}" onclick="specificCategory('${category}')"
      class="category-btn w-full flex gap-4 justify-center items-center border-2 border-[#0E7A8126] rounded-2xl p-6 hover:bg-[#0E7A811A]"
    >
      <img src=${category_icon} />
      <h2 class="text-2xl font-bold">${category}</h2>
    </button>`;
    categoriesContainer.appendChild(div);
  });
};

// Load All Pets
const loadAllPets = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  displayAllpets(data.pets);
};

// Display All Pets
const displayAllpets = (pets) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  if (pets.length === 0) {
    cardsContainer.innerHTML = `
    <div class="col-span-3 flex flex-col justify-center items-center">
    <img class="" src="images/error.webp"/>
    <h2 class="text-center text-2xl lg:text-4xl font-black">No Information Available</h2>
    <p class="text-center text-base lg:text-2xl font-medium">No information is currently available for this category. Please try again later...</p>
    </div>
    `;
    return;
  }

  pets.forEach((pet) => {
    const { pet_name, petId, breed, date_of_birth, gender, price, image } = pet;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card border-2 border-[#1313131A] rounded-xl">
  <figure class="p-6">
    <img
      src=${image}
      alt="pet"
      class="rounded-xl w-[348px] h-[182px] lg:h-[232px]" />
  </figure> 
  <div class="flex flex-col justify-center pl-6">
        <h2 class="text-xl font-bold mb-4">${pet_name}</h2>
        <div class="flex items-center gap-1">
          <img src="images/breed.png" alt="" />
          <p class="text-[#131313B3]">Breed: ${
            breed ? breed : "Unavailable"
          }</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="images/birth.png" alt="" />
          <p class="text-[#131313B3]">Birth: ${
            date_of_birth ? date_of_birth : "Unavailable"
          }</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="images/gender.png" alt="" />
          <p class="text-[#131313B3]">Gender: ${
            gender ? gender : "Unavailable"
          }</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="images/price.png" alt="" />
          <p class="text-[#131313B3]">Price: ${price ? price : "Unavailable"}${
      price ? "$" : ""
    }</p>
        </div>
      </div>
      <div class="border-b-2 border-[#1313131A] mt-6 mx-6">
      </div>
      <div class="p-6 flex flex-col lg:flex-row justify-between gap-3">
      <button onclick="loadLikedImages('${petId}')" class="border-2 border-[#0E7A8126] rounded-lg px-5 py-2 flex items-center justify-center hover:bg-[#0E7A811A]"><img class="w-6" src="images/like.png" alt="like" /></button>
      <button id="adopt-btn-${petId}" onclick="showAdoptModal('${petId}')" class="border-2 border-[#0E7A8126] rounded-lg px-5 py-2 text-[1.125rem] text-[#0E7A81] font-bold hover:bg-[#0E7A811A]">Adopt</button>
      <button onclick="loadPetDetails('${petId}')" class="border-2 border-[#0E7A8126] rounded-lg px-5 py-2 text-[1.125rem] text-[#0E7A81] font-bold hover:bg-[#0E7A811A]">Details</button>
      </div>
</div>`;
    cardsContainer.appendChild(div);
  });
};

// Load Pet Details
const loadPetDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  console.log(data.petData);

  const {
    breed,
    date_of_birth,
    price,
    image,
    gender,
    pet_details,
    vaccinated_status,
    pet_name,
  } = data.petData;

  const detailsModal = document.getElementById("details-modal");
  detailsModal.innerHTML = `
  <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <div class="flex justify-center items-center">
            <img class="rounded-xl w-[100%]" src=${image} alt="pet" />
            </div>
            <h3 class="text-2xl text-[#131313] font-bold mt-6 mb-4">${pet_name}</h3>
            <div class="flex flex-col lg:flex-row lg:items-center lg:gap-10">
            <div class = "breed-gender-container">
            <div class="flex items-center gap-1">
        <img src="images/breed.png" alt="" />
        <p class="text-[#131313B3]">Breed: ${breed ? breed : "Unavailable"}</p>
      </div>
  <div class="flex items-center gap-1">
    <img src="images/gender.png" alt="" />
    <p class="text-[#131313B3]">Gender: ${gender ? gender : "Unavailable"}</p>
  </div>
  </div>
  <div class="price-date-container">
  <div class="flex items-center gap-1">
    <img src="images/birth.png" alt="" />
    <p class="text-[#131313B3]">Birth: ${
      date_of_birth ? date_of_birth : "Unavailable"
    }</p>
  </div>
  <div class="flex items-center gap-1">
    <img src="images/price.png" alt="" />
    <p class="text-[#131313B3]">Price: ${price ? price : "Unavailable"}${
    price ? "$" : ""
  }</p>
  </div>
  </div>
  </div>
  <div class="flex items-center gap-2">
    <img src="images/injection.png" alt="" />
    <p class="text-[#131313B3]">Vaccinated Status: ${
      vaccinated_status ? vaccinated_status : "Unavailable"
    }</p>
  </div>
      <div class="border-b-2 border-[#1313131A] my-4">
      </div>  
  <div> <h3 class = "text-[#131313] font-semibold mb-3" >Details Information</h3>
  <p class="text-base text-[#131313B3] font-normal mb-4">${pet_details}</p>
  </div>          
            <div class="modal-action">
              <form method="dialog" class="w-[100%] flex justify-center items-center">
                <button class="w-[100%] bg-[#0E7A811A] border-2 border-[#0E7A8133] rounded-lg py-2 text-lg text-[#0E7A81] font-bold">Close</button>
              </form>
            </div>
          </div>
</dialog>`;
  my_modal_1.showModal();
};

// Show Adopt Modal
const showAdoptModal = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  console.log(petId);
  const adoptButton = document.getElementById(`adopt-btn-${petId}`);
  adoptButton.textContent = "Adopted";
  adoptButton.disabled = true;
  adoptButton.classList.add(
    "text-[gray]",
    "cursor-not-allowed",
    "hover:bg-[white]",
    "border-[gray]"
  );

  const adoptModal = document.getElementById("adopt-modal");
  adoptModal.innerHTML = `
  <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <div class="flex justify-center items-center">
          <img class="rounded-xl w-[20%]" src="images/congrats.png" alt="pet" />
        </div>
        <h3 class="text-center text-2xl text-[#131313] font-bold mt-6 mb-4">Congratulations!!</h3>
        <p class="text-center">Adoption will complete in...</p>
        <div class="flex justify-center items-center mt-4">
        <p id="count-down" class="text-3xl font-semibold">3</p>
        </div>
      </div>
    </dialog>`;

  my_modal_2.showModal();
  function startCountdown() {
    let countdownElement = document.getElementById("count-down");
    let count = parseInt(countdownElement.innerText);
    let interval = setInterval(() => {
      count--;
      countdownElement.innerText = count;
      if (count <= 0) {
        adoptModal.innerHTML = ``;
        clearInterval(interval);
      }
    }, 1000);
  }
  startCountdown();
};

// Show Images for Liked Pets
const loadLikedImages = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();

  const { image } = data.petData;

  const likedImages = document.getElementById("liked-images-container");

  const div = document.createElement("div");
  div.innerHTML = `
  <img class= "rounded-lg w-[100%] h-[114px]" src=${image} alt=""> 
  `;

  likedImages.appendChild(div);
};

// sorted section
const loadSortedData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();

  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = `<div id="spinner" class="col-span-3 flex justify-center">
    <span class="loading loading-spinner loading-lg"></span>
  </div>`;
  showSpinner(
    setTimeout(function () {
      displaySotedpets(data.pets);
    }, 2000)
  );
};

const displaySotedpets = (pets) => {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";
  const sotedPets = pets.sort((a, b) => b.price - a.price);
  pets.forEach((sortedpets) => {
    const { pet_name, petId, breed, date_of_birth, gender, price, image } =
      sortedpets;

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card border-2 border-[#1313131A] rounded-xl">
  <figure class="p-6">
    <img
      src=${image}
      alt="pet"
      class="rounded-xl w-[348px] h-[182px] lg:h-[232px]" />
  </figure> 
  <div class="flex flex-col justify-center pl-6">
        <h2 class="text-xl font-bold mb-4">${pet_name}</h2>
        <div class="flex items-center gap-1">
          <img src="images/breed.png" alt="" />
          <p class="text-[#131313B3]">Breed: ${
            breed ? breed : "Unavailable"
          }</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="images/birth.png" alt="" />
          <p class="text-[#131313B3]">Birth: ${
            date_of_birth ? date_of_birth : "Unavailable"
          }</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="images/gender.png" alt="" />
          <p class="text-[#131313B3]">Gender: ${
            gender ? gender : "Unavailable"
          }</p>
        </div>
        <div class="flex items-center gap-1">
          <img src="images/price.png" alt="" />
          <p class="text-[#131313B3]">Price: ${price ? price : "Unavailable"}${
      price ? "$" : ""
    }</p>
        </div>
      </div>
      <div class="border-b-2 border-[#1313131A] mt-6 mx-6">
      </div>
      <div class="p-6 flex flex-col lg:flex-row justify-between gap-3">
      <button onclick="loadLikedImages('${petId}')" class="border-2 border-[#0E7A8126] rounded-lg px-5 py-2 flex items-center justify-center hover:bg-[#0E7A811A]"><img class="w-6" src="images/like.png" alt="like" /></button>
      <button id="adopt-btn-${petId}" onclick="showAdoptModal('${petId}')" class="border-2 border-[#0E7A8126] rounded-lg px-5 py-2 text-[1.125rem] text-[#0E7A81] font-bold hover:bg-[#0E7A811A]">Adopt</button>
      <button onclick="loadPetDetails('${petId}')" class="border-2 border-[#0E7A8126] rounded-lg px-5 py-2 text-[1.125rem] text-[#0E7A81] font-bold hover:bg-[#0E7A811A]">Details</button>
      </div>
</div>`;
    cardsContainer.appendChild(div);
  });
};

// Function Calls

loadCategories();

showSpinner(
  setTimeout(function () {
    loadAllPets();
  }, 3000)
);
