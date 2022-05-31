/* 장바구니 관련 로컬 스토리지 */
export const getCartItems = ()=>{
  const cartItems = localStorage.getItem('cartItems')?
  JSON.parse(localStorage.getItem('cartItems')):
  [];
  return cartItems;
}

export const setCartItems = (cartItems)=>{
  localStorage.setItem('cartItems',JSON.stringify(cartItems));
}

export const addToCart = (item) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x=>x.name === item.name);
  if (existItem) {
    cartItems = cartItems.map(x=>x.name==existItem.name ? item : x);
  } else {
    cartItems = [...cartItems,item];
  }
  setCartItems(cartItems);
};

export const removeFromCart = (id)=>{
  setCartItems(getCartItems().filter(x=>x.id !== id));
}


/* 배송 정보 관련  로컬 스토리지 */
export const setOrderInfo = (orderInfo) => {
  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
}

export const getOrderInfo = ()=>{
  const orderInfo = localStorage.getItem('orderInfo')?
  JSON.parse(localStorage.getItem('orderInfo')):{};

  return orderInfo;
}

