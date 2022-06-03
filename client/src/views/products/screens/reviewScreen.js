import { parseRequestUrl } from '../utils.js'
import { getProduct } from '../../api.js';

export const reviewScreen = {
  after_render: () => {
    const request = parseRequestUrl();

    const submitBtn = document.getElementById('submitBtn');
    const submitForm = document.querySelector("#submitForm");
    const ratingInput = document.getElementById('rating');
    const reviewTextInput = document.getElementById('reviewText');

    submitBtn.addEventListener('click',async (e)=>{
      e.preventDefault();
      try {
        const rating = ratingInput.value;
        const reviewText = reviewTextInput.value;
        const productId = request.id;
        // const userId = localStorage.getItem('token');

        if (!rating || !reviewText) {
          return alert('리뷰 정보를 모두 기입해주세요');
        }

        // formData.append("productId",productId);
        // formData.append("userId",userId);

       let response = await fetch("http://localhost:5000/api/reviews",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          },
          body: JSON.stringify({
            rating,
            reviewText,
            productId,
          })
        });
        let result = await response.json();
        console.log(result);
        alert('리뷰가 완료되었습니다.');
        window.location.href = "/order/history";

      } catch (e) {
        alert(`상품을 리뷰하는 과정에서 오류가 발생하였습니다: ${e.message}`)
      }
})
  },
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
      <div class="block review-header">
      <h1 class="subtitle is-4">제품리뷰</h1>
    </div>
    <div class="form-container">
      <form class="box form-box" id="submitForm">
        <p class="title is-5 has-text-primary">제품을 리뷰해주세요 ><</p>
      <div class="field">
        <label class="label" for="rating">⭐⭐⭐⭐⭐</label>
        <div class="select is-fullwidth">
          <select id="rating" name="rating" required>
            <option value="">카테고리를 선택해 주세요</option>
            <option value="1" class="notification is-primary is-light">1</option>
            <option value="2" class="notification is-warning is-light">2</option>
            <option value="3" class="notification is-danger is-light">3</option>
            <option value="4" class="notification is-info is-light">4</option>
            <option value="5" class="notification is-link is-light">5</option>
          </select>
        </div>
      </div>
        <div class="field">
          <label for="reviewText" class="label">리뷰를 적어주세요!</label>
          <textarea class="textarea" id="reviewText" name="reviewText" rows="3"
            placeholder="제품에 대한 1~2문장의 평가를 적어 주세요." autocomplete="on" required></textarea>
        </div>
        <div class="mt-5">
          <button type="submit" class="button is-primary is-fullwidth" id="submitBtn">리뷰 작성</button>
        </div>
      </form>
    </div>
    `;
  },
};

export default reviewScreen;