let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// open cart and close
cartIcon.onclick = () => {
    // cart.classList.add('active');
    cart.classList.toggle("active");
};
//close cart only
closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
// Make funcation
function ready() {
    // Remove item from cart
    var removeCartBtns = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartBtns.length; i++) {
        var btn = removeCartBtns[i];
        btn.addEventListener("click", removeCartItem);
    }

    // quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //Add To cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var btn = addCart[i];
        btn.addEventListener("click", addCartClicked);
    }
    // Buy Button Work 
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyBtnClicked);
}
    // Buy Button  

function buyBtnClicked(){
alert('Your order is Placed')
var carContant = document.getElementsByClassName('cart-contant')[0];
while(carContant.hasChildNodes()){
    carContant.removeChild(carContant.firstChild);
}
updateTotal();

}

function removeCartItem(event) {
    var btnClicked = event.target;
    btnClicked.parentElement.remove();
                  updateTotal();
}

////           quantityChanged    /////////////////////////////
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

//addCartClicked
function addCartClicked(event) {
    var btn = event.target;
    var shopProducts = btn.parentElement;
    var title = shopProducts.getElementsByClassName("productTitle")[0].innerText;
    var price = shopProducts.getElementsByClassName("productPrice")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("productImg")[0].src;

    addProductToCart(title, price, productImg);
    updateTotal();
}
//addProductToCart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("car-box");
    var cartItems = document.getElementsByClassName("cart-contant")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-products-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) { 
            alert("you have already add this item to cart ya hamokshhhh😠  ");
        return ;

        }
    }
var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-products-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!--Remove-cart  -->
                        <i class='bx bxs-trash-alt cart-remove'></i>

`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);

}

// Update Total price $$$$
function updateTotal() {
    var cartContant = document.getElementsByClassName("cart-contant")[0];
    var cartBoxs = cartContant.getElementsByClassName("car-box");
    var total = 0;
    for (var i = 0; i < cartBoxs.length; i++) {
        var cartBox = cartBoxs[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // If price contain any cents (0.22 etc ) $$$$
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}
