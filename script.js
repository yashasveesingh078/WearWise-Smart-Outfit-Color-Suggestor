const container = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const themeBtn = document.getElementById("theme-toggle");


const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

let data = [];


fetch("data.json")
  .then(res => res.json())
  .then(d => {
    data = d.products;
    displayData(data);
  });


function displayData(items) {
  container.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="view-btn" onclick="viewItem(${index})">👁</div>
      <div class="card-content">
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
      </div>
    `;

    container.appendChild(card);
  });
}


function applyFilters() {
  let filtered = [...data];

  const searchValue = searchInput.value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ""); 


  if (searchValue !== "") {
    filtered = filtered.filter(item => {
      const name = item.name.toLowerCase().replace(/\s+/g, "");
      const desc = item.description.toLowerCase().replace(/\s+/g, "");
      const type = item.type.toLowerCase().replace(/\s+/g, "");

      return (
        name.includes(searchValue) ||
        desc.includes(searchValue) ||
        type.includes(searchValue)
      );
    });
  }


  if (filter.value !== "all") {
    filtered = filtered.filter(item => item.type === filter.value);
  }


  if (sort.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort.value === "az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort.value === "za") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  displayData(filtered);
}


searchInput.addEventListener("input", applyFilters);
filter.addEventListener("change", applyFilters);
sort.addEventListener("change", applyFilters);

function viewItem(i) {
  const item = data[i];

  document.getElementById("modal-img").src = item.image;
  document.getElementById("modal-title").textContent = item.name;
  document.getElementById("modal-desc").textContent = item.description;
  document.getElementById("modal-price").textContent = "₹" + item.price;

  modal.style.display = "block";
}


closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};


themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

  // async function getData(){
  //   // let myData = await fetch("./data.json");
  //   let myData = await fetch("https://test.api.com/products")
  //   let products = myData.products
  // }


  // const originalFetch = globalThis.fetch ;

  // globalThis.fetch =  async (url, options) => {
  //   let data = originalFetch("./data.json")
  //   return new Promise((res,rej) => {
  //      if(url === "https://test.api.com/products"){
  //      res(data.products)
  //   }
  //   else if(url == "https://test.api.com/users"){
  //     res(data.users)
  //   }
  //   }
   
  // );
  // }