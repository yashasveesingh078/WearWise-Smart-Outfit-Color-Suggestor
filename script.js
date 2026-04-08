const box = document.getElementById("product-container");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const loading = document.getElementById("loading");

let data = [];

fetch("./data.json")
  .then(function(res) {
    return res.json();
  })
  .then(function(d) {
    data = d.products;
    loading.style.display = "none";
    display(data);
  });

function display(arr) {
  box.innerHTML = "";

  arr.map(function(item) {
    box.innerHTML = box.innerHTML + 
    "<div class='card'>" +
      "<img src='" + (item.image || "https://via.placeholder.com/150") + "'>" +
      "<h4>" + item.name + "</h4>" +
      "<p>" + item.type + "</p>" +
    "</div>";
  });
}


search.addEventListener("input", function() {

  let value = search.value.toLowerCase();

  let newData = data.filter(function(item) {
    return item.name.toLowerCase().includes(value);
  });

  display(newData);
});


filter.addEventListener("change", function() {

  let value = filter.value;

  if (value === "") {
    display(data);
  } else {
    let newData = data.filter(function(item) {
      return item.type === value;
    });

    display(newData);
  }
});


sort.addEventListener("change", function() {

  let newData = [...data];

  if (sort.value === "az") {
    newData.sort(function(a, b) {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  if (sort.value === "za") {
    newData.sort(function(a, b) {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  display(newData);
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