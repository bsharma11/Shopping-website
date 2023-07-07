const addtocartbutton = document.querySelector('#product-details button')
const cartbadgeElements = document.querySelectorAll('.nav-items .badge')

async function addtocart(){
    const productId = addtocartbutton.dataset.productid
    const csrfToken= addtocartbutton.dataset.csrf
    let response
    try{
            response = await fetch('/cart/items',{
            method:'POST',
            body:JSON.stringify({
                productId:productId,
                _csrf:csrfToken
            }),
            headers:{
                'Content-Type':'application/json'//this header is looked by the backend code to parse the incoming req data
                //with content-type we dsecribe the kind of data to be sent.. FOR CUSTOM HTTP REQUESTS that are sent with javascript
                //we set this ourselves
            }
        })
    }catch(error){
         alert("Something went wrong")
         return
    }    
    if (!response.ok){
        alert('Something went wrong')
        return 
    }
    const responsedata= await response.json()
    const newtotalquantity = responsedata.newtotalitems
    for (const cartbadgeElement of cartbadgeElements){
        cartbadgeElement.textContent = newtotalquantity
    }
    
}

addtocartbutton.addEventListener('click',addtocart)