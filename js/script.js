// Burger
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger").addEventListener("click", function() {
        document.querySelector("header").classList.toggle("open")
    })
    
})

// Dark/Light Theme
const toggleButton = document.querySelector('.btn-toggle');

toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('theme', newTheme);
});
