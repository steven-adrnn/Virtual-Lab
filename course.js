document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;
            const arrow = header.querySelector('.arrow');
            
            accordionHeaders.forEach((otherHeader) => {
                if (otherHeader !== header) {
                    otherHeader.nextElementSibling.classList.remove('show');
                    otherHeader.classList.remove('active');
                }
            });

            accordionContent.classList.toggle('show');
            header.classList.toggle('active');
            arrow.classList.toggle('active');
        });
    });
});

