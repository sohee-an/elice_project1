import { parseRequestUrl } from '../utils.js'
import { getProduct } from '../../api.js';
import { addToCart } from '../../localStorage.js';

export const ProductScreen = {
  after_render: () => {
    document.getElementById('add-button').addEventListener('click', () => {
      renderCart()
    });
    document.getElementById('cart-button').addEventListener('click', () => {
      renderCart()
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">
          Back to Result
        </a>
      </div>
      <div class="details">
        <div class="details-image">
          <img src="/uploads/${product.image}" alt="${product.name}">
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
              Price: <strong>$${product.price}</strong> 
            </li>
            <li>
              Description:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
          <ul>
            <li>
              Price: ${product.price} 원
            </li>
              <button id="add-button" class="fw primary">Add to Cart</button>
              <a href="/cart"><button id="cart-button" class="fw primary">Buy Now</button></a>
          </ul>
        </div>
      </div>
    </div>
    `;
  },
};

async function renderCart () {
  const request = parseRequestUrl();
  if (request.id) {
    const product = await getProduct(request.id);
    addToCart({
      id: product._id,
      name:product.name,
      image:product.image,
      price: product.price,
      quantity:1,
    })
  }
}

export default ProductScreen;