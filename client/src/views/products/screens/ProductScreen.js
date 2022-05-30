import { parseRequestUrl } from '../utils.js'
import { getProduct } from '../../api.js';
import { addToCart } from '../../localStorage.js';
import { addCommas } from '../../useful-functions.js';

export const ProductScreen = {
  after_render: () => {
    const addbutton = document.querySelector('.add-button');
    addbutton.addEventListener('click', () => {
      renderCart();
      addbutton.innerHTML = `<a href="/cart">PROCEED TO CHECKOUT</a>`
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
        <a href="#/">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
      </div>
      <div class="details">
        <div class="details-image details-left">
          <img src="/uploads/${product.image}" alt="${product.name}">
        </div>
        <div class="details-right">
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
                <strong>${addCommas(product.price)} 원</strong>
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
                Price: ${addCommas(product.price)} 원
              </li>
                <button class="fw primary add-button">
                  ADD TO CART
                </button>
            </ul>
          </div>
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