const imagepickerele = document.querySelector('#image-upload-control input')
const imagepreviewele = document.querySelector('#image-upload-control img')

function updateimgpreview(){
    const files = imagepickerele.files //will check if img is uploaded
    if(!files || files.length === 0){
        imagepreviewele.style.display = 'none'
        return
    }
    const pickedfile = files[0] // sinec we can only upload one image

    // now we create url of the img using inbuilt URL class
    imagepreviewele.src = URL.createObjectURL(pickedfile)
    imagepreviewele.style.display = 'block'
}

imagepickerele.addEventListener('change', updateimgpreview)