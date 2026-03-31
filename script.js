const container = document.getElementById("product-container");
const loading = document.getElementById("loading");

async function getProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    // Combine API + custom data
    const allProducts = data.products.concat(customClothes);

    loading.style.display = "none";

    displayProducts(allProducts);

  } catch (error) {
    loading.innerText = "Failed to load data ❌";
    console.log(error);
  }
}

function displayProducts(products) {
  let html = "";

  products.forEach(item => {
    html += `
      <div class="card">
        <img src="${item.thumbnail || item.image}">
        <h3>${item.title}</h3>
        <p>₹ ${item.price}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

getProducts();