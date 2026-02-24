document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchBtnMobile = document.getElementById('searchBtnMobile');
    const searchPopup = document.getElementById('searchPopup');

    const toggleSearch = (e) => {
        e.preventDefault();
        searchPopup.classList.toggle('active');
        if (searchPopup.classList.contains('active')) {
            const input = searchPopup.querySelector('input');
            setTimeout(() => input.focus(), 300);
        }
    };

    if (searchBtn) {
        searchBtn.addEventListener('click', toggleSearch);
    }

    if (searchBtnMobile) {
        searchBtnMobile.addEventListener('click', toggleSearch);
    }

    // Close search on clicks outside
    document.addEventListener('click', (e) => {
        if (!searchPopup.contains(e.target) &&
            e.target !== searchBtn &&
            !searchBtn?.contains(e.target) &&
            e.target !== searchBtnMobile &&
            !searchBtnMobile?.contains(e.target)) {
            searchPopup.classList.remove('active');
        }
    });

    // Close search on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchPopup.classList.remove('active');
        }
    });

    // Initialize Hero Slider (Owl Carousel)
    const initSlider = () => {
        const heroSlider = $('.hero-slider');
        if (heroSlider.length) {
            heroSlider.owlCarousel({
                items: 1,
                loop: true,
                margin: 0,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                smartSpeed: 800,
                onInitialized: function () {
                    $('.hero-slider').css('opacity', 1);
                }
            });

            $('.slider-prev').off('click').click(function () {
                heroSlider.trigger('prev.owl.carousel');
            });
            $('.slider-next').off('click').click(function () {
                heroSlider.trigger('next.owl.carousel');
            });
        }
    };

    // Run carousel init
    initSlider();

    // Initialize Testimonial Slider
    $('.testimonial-slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        dots: true,
        smartSpeed: 800,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            }
        }
    });



    // const addtocartbtn = document.getElementsByClassName('addtocartbtn');
    // addtocartbtn.addEventListener('click', () => {
    //     addtocartbtn.textContent = 'Added';
    //     addtocartbtn.style.backgroundColor = '#1d2d03ff';
    //     setTimeout(() => {
    //         addtocartbtn.textContent = 'Add to cart';
    //         addtocartbtn.style.backgroundColor = '#558903';
    //     }, 2000);
    // });

    const addtocartbtn = Array.from(document.getElementsByClassName('addtocartbtn'));

    addtocartbtn.map(el => {
        el.addEventListener('click', () => {
            el.textContent = 'Added';
            el.style.backgroundColor = '#1d2d03ff';
            setTimeout(() => {
                alert('Product added to cart');
                el.textContent = 'Add to cart';
                el.style.backgroundColor = '#558903';
            }, 2000);
        });
    });



    // Offer Popup Logic
    const offerPopup = document.getElementById('offerPopup');
    const popupOverlay = document.getElementById('offerPopupOverlay');
    const closePopupBtn = document.getElementById('closePopup');
    let popupShown = false;

    const showPopup = () => {
        if (!popupShown) {
            if (offerPopup) offerPopup.style.display = 'block';
            if (popupOverlay) popupOverlay.style.display = 'block';
            setTimeout(() => {
                if (offerPopup) offerPopup.classList.add('active');
            }, 10);
            popupShown = true;
            // Store in session to only show once per session
            sessionStorage.setItem('offerPopupShown', 'true');
        }
    };

    const closePopup = () => {
        if (offerPopup) offerPopup.classList.remove('active');
        setTimeout(() => {
            if (offerPopup) offerPopup.style.display = 'none';
            if (popupOverlay) popupOverlay.style.display = 'none';
        }, 400);
    };

    // Check if already shown in this session
    if (sessionStorage.getItem('offerPopupShown')) {
        popupShown = true;
    }

    window.addEventListener('scroll', () => {
        if (!popupShown) {
            const scrollDistance = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollDistance / documentHeight) * 100;

            if (scrollPercentage >= 20) {
                showPopup();
            }
        }
    });

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', closePopup);
    }
});