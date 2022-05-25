import data from '../data.js'

const Products_screen = {
  render: ()=>{
    const {products} = data;
    return `
    <ul class="products">
      ${products
        .map(
          (product) =>`
        <li>
          <div class="product">
          <a href="#/product/${product.product_id}">
            <img src="${product.image}" alt="${product.name}">
          </a>
          <div class="product-name">
            <a href="#/product/${product.product_id}">
              ${product.name}
            </a>
          </div>
          <div class="product-brand">
            ${product.brand}
          </div>
          <div class="product-price">
            ${product.price} ￦
          </div>
        </div>
        </li>
        `
      )
      .join('\n')
    }
    </ul>
    `
  }
}

export default Products_screen;