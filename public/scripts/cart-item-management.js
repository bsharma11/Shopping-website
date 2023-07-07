const cartitemupdateformelements = document.querySelectorAll(
  ".cart-item-management"
);
const carttotalprice = document.getElementById("cart-total-price");
const cartbadgeElements = document.querySelectorAll(".nav-items .badge");

async function updateItem(event) {
  event.preventDefault();
  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Yahan hua");
    return;
  }
  if (!response.ok) {
    alert("Nahi");
    return;
  }
  const responsedata = await response.json();
  if (responsedata.updatedcart.UpdatedItemprice === 0) {
    form.parentElement.parentElement.remove();
  } else {
    const cartitemtotalprice =
      form.parentElement.querySelector(".cart-item-price");
    cartitemtotalprice.textContent =
      responsedata.updatedcart.UpdatedItemprice.toFixed(2);
  }

  carttotalprice.textContent = responsedata.updatedcart.newtotalprice;
  for(const cartbadge of cartbadgeElements){
    cartbadge.textContent = responsedata.updatedcart.newtotalquantity;
  }
  
}

for (const formele of cartitemupdateformelements) {
  formele.addEventListener("submit", updateItem);
}
