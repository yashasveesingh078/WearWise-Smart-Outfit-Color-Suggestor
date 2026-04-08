const box = document.getElementById("product-container");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const loading = document.getElementById("loading");

let data = [];

fetch("./data.json")
  .then(res => res.json())
  .then(d => {
    data = d.products;
    loading.style.display = "none";
    show(data);
  });

function show(arr) {
  box.innerHTML = "";

  arr.map(item => {
    box.innerHTML += `
      <div class="card">
        <img src="${item.image || 'https://via.placeholder.com/150'}">
        <h4>${item.name}</h4>
        <p>${item.type}</p>
      </div>
    `;
  });
}

search.addEventListener("input", function () {
  let val = search.value.toLowerCase();

  let res = data.filter(item =>
    item.name.toLowerCase().includes(val)
  );

  show(res);
});

filter.addEventListener("change", function () {
  let val = filter.value;

  if (val === "") {
    show(data);
  } else {
    let res = data.filter(item => item.type === val);
    show(res);
  }
});

sort.addEventListener("change", function () {
  let arr = [...data];

  if (sort.value === "az") {
    arr.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  if (sort.value === "za") {
    arr.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });
  }

  show(arr);
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