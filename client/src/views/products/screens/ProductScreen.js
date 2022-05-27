import { parseRequestUrl } from '../utils.js'
import { getProduct } from '../../api.js';

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
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
              <button id="add-button" class="fw primary">Add to Cart</div>
          </ul>
        </div>
      </div>
    </div>
    `;
  },
};

export default ProductScreen;