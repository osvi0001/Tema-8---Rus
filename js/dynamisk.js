const productContainer = document.querySelector("#productContainer");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((res) => res.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  productContainer.innerHTML = ` 
      <div class="back"><a href="produktliste.html">GO BACK</a></div>
      <section class="productView">
        <div>
          <img class="productImage" 
               src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
               alt="">
        </div>
        <div>
          <h2 class="productName">${product.productdisplayname}</h2>
          <p class="articleType"><strong>Type:</strong></span> ${product.articletype}</p>
          <p class="productPrice"><strong>Price:</strong> ${product.price} kr</p> 
          <div class="productSize">
            <p>Small</p>
            <p>Medium</p>
            <p>Large</p>
            <p>X-Large</p>
          </div>
          <h3 class="kurv">Add to basket</h3>
        </div>
      </section>`;
}
