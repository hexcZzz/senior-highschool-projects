'use strict';

const menuBtn = document.querySelector('#menu');
const navUl = document.querySelector('ul');

menuBtn.addEventListener('click', () => {
    navUl.classList.toggle('visible'); // Toggle 'visible' class to show/hide the sidebar
    menuBtn.textContent = navUl.classList.contains('visible') ? 'Close' : 'Menu';
});

const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    accordion.addEventListener('click', function() {
        // Close all other accordions
        accordions.forEach(acc => {
            if (acc !== this) { // Skip the current accordion
                acc.classList.remove('active');
                acc.nextElementSibling.style.maxHeight = null;
            }
        });

        // Toggle the clicked accordion
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
    });
});