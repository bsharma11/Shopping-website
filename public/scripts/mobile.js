const mobilemenuButton = document.getElementById('mobile-menu-btn')
const mobilemenu = document.getElementById('mobile-menu')


function toggleMobilemenu(){
    mobilemenu.classList.toggle('open')    
}

mobilemenuButton.addEventListener('click', toggleMobilemenu)