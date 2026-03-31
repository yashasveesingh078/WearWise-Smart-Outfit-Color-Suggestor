const container = document.getElementById("product-container");
const loading = document.getElementById("loading");

loading.innerText = "Loading data...";

fetch("https://dummyjson.com/products/category/tops")
  .then((res) => res.json())
  .then((data) => {

    // hide loading
    // loading.style.display = "none";
    loading.innerText="Data Loaded ✅";
    for (let i = 0; i < data.products.length; i++) {
      let item = data.products[i];


      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = item.thumbnail;

      const title = document.createElement("h4");
      title.innerText = item.title;

      const price = document.createElement("p");
      price.innerText = "₹ " + item.price;

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(price);

      container.appendChild(card);
    }

  })
  .catch((err) => {
    loading.innerText = "Failed to load data ❌";
    console.log(err);
  });