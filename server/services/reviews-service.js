import { reviewsModel,productModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class ReviewService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(reviewModel) {
    this.reviewModel = reviewModel;
  }

  // 리뷰 저장하기 
  async addReview(reviews) {
    //console.log(reviews);
    const addedReview = await this.reviewModel.addReview(reviews);
    return addedReview;

  }

  async reviewData(productId){
    // 상품 총 갯수 구함 
   const  productTotalData =await this.reviewModel.totalRevew(productId);
   console.log(productTotalData); 
   const reviewTotal= productTotalData.length;
    let ratingTotals = 0;

    for(let i =0; i<reviewTotal;i++){
       ratingTotals += productTotalData[i].rating 
    }
    const ratingAvg= (ratingTotals/reviewTotal).toFixed(1);

    return {reviewTotal:reviewTotal,ratingAvg:ratingAvg}
    
  }

  async prodcutReview(productId){
    const prodcutData =await this.reviewModel.productReveiew(productId);
    console.log(prodcutData);

      let productReviews=[];
    for(let i = 0; i<prodcutData.length;i++){
      const fullName = prodcutData[i].userId.fullName;
      const reviewText=prodcutData[i].reviewText;
      const rating=prodcutData[i].rating;

        productReviews.push({
          fullName:fullName,
        reviewText:reviewText,
        rating:rating

        });     
    }
    return productReviews
    //console.log(productReviews) ;

  }

 

}
 
const reviewService = new ReviewService(reviewsModel);

export { reviewService };
