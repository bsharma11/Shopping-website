const deleteitembuttons = document.querySelectorAll('.product-item button')

async function deleteproduct(event){
    const button = event.target // event.target point to the elemment that caused the event i.e button in this case
    const prodId = button.dataset.productid
    const csrftoken= button.dataset.csrfid

    // we need to add the csrf token using query parameters as delete requests we dont have req.body where we can set the token
    const response = await fetch('/admin/products/' + prodId + '?_csrf=' + csrftoken, { //  since fetch by defaukt sends the get req therefore we need to configure it first!
        method:'DELETE',
    })
    if (!response.ok){
        alert('Something went wrong')
        return
    }
    button.parentElement.parentElement.parentElement.parentElement.remove()//remove is a built in method taht exists on DOM elements
}
for (const deleteitembutton of deleteitembuttons){
    deleteitembutton.addEventListener('click', deleteproduct)
}