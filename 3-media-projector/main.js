class Slider {
    constructor() {
        this.$slider = document.querySelector('.slider');
        this.nextSlide();
    }

    nextSlide() {
        let active;
        setInterval(() => {
            active = this.$slider.querySelector('.active');
            active.classList.remove('active');
            if (active.nextElementSibling === null) {
                this.$slider.firstElementChild.classList.add('active');
            } else {
                active.nextElementSibling.classList.add('active');
            }
        }, 2000);
    }
}

new Slider();