
'strict'

const menuBtn = document.querySelector('#menu');
const navUl = document.querySelector('ul');

menuBtn.addEventListener('click', function() {
    navUl.classList.toggle('hidden');
    if (navUl.classList.contains('hidden')) {
        menuBtn.textContent = 'Menu'
    } else {
        menuBtn.textContent = 'Close'
    } 
})