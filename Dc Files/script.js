document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
