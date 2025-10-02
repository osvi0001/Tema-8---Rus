const params1 = new URLSearchParams(window.location.search);
const category = params1.get("category");

const productListContainer = document.querySelector(".p-img");

document
  .querySelectorAll(".filters button")
  .forEach((knap) => knap.addEventListener("click", showFiltered));

document
  .querySelectorAll(".sortering button")
  .forEach((knap) => knap.addEventListener("click", showSorted));

document.querySelectorAll(".filters button").forEach((knap) =>
  knap.addEventListener("click", function (event) {
    // fjern active fra alle filter-knapper
    document
      .querySelectorAll(".filters button")
      .forEach((btn) => btn.classList.remove("active"));
    // tilføj active til den valgte
    event.target.classList.add("active");
    // kør din funktion
    showFiltered(event);
  })
);

document.querySelectorAll(".sortering button").forEach((knap) =>
  knap.addEventListener("click", function (event) {
    // fjern active fra alle sorterings-knapper
    document
      .querySelectorAll(".sortering button")
      .forEach((btn) => btn.classList.remove("active"));
    // tilføj active til den valgte
    event.target.classList.add("active");
    // kør din funktion
    showSorted(event);
  })
);

function showSorted(event) {
  const direction = event.target.dataset.direction;
  if (direction === "lohi") {
    allData.sort((a, b) => a.price - b.price);
  } else {
    allData.sort((a, b) => b.price - a.price);
  }
  showProducts(allData);
}

function showFiltered(event) {
  const gender = event.target.dataset.gender;
  if (gender == "All") {
    showProducts(allData);
  } else {
    const udsnit = allData.filter((product) => product.gender === gender);
    showProducts(udsnit);
  }
}

let allData;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=100&category=${category}`)
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    showProducts(allData);
  });

function showProducts(products) {
  let markup = "";

  products.forEach((product) => {
    const isOnSale = product.discount > 0;
    const isSoldOut = product.soldout;

    markup += `
      <div class="prd">
        ${isOnSale ? `<div class="sale-badge">Udsalg</div>` : ""}
        ${isSoldOut ? `<div class="sold-out">Udsolgt</div>` : ""}

        <a href="produkt.html?id=${product.id}">
          <img class="pic" 
               src="https://kea-alt-del.dk/t7/images/webp/640/${
                 product.id
               }.webp" 
               alt="${product.productdisplayname}"
               ${isSoldOut ? 'style="opacity:0.6;"' : ""}>
        </a>

        <p><strong>${product.productdisplayname}</strong></p>

        <p>
          ${
            isOnSale
              ? `<span class="old-price">${product.price},-</span> 
                 <span class="new-price">${Math.round(
                   product.price * (1 - product.discount / 100)
                 )},-</span>`
              : `${product.price},-`
          }
        </p>
      </div>`;
  });

  productListContainer.innerHTML = markup;
}
