class MediaProjectorElement extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.renderTemplate();
        this.addEventListener('click', this.clickHandler);
    }

    renderTemplate() {
        let $tmpl = document.querySelector('#media-projector-template')
            .content.cloneNode(true);

        this.shadow.appendChild($tmpl);
    }

    clickHandler() {
        if (this.slider) {
            return;
        }

        this.slider = new Slider ({
            items: this.children,
            callback: ($element) => {
                this.displayMedia($element.cloneNode(true));
            }
        });
    }

    displayMedia($element) {
        let $slider = this.shadow.querySelector('.slider');
        console.log($element);
        $slider.innerText = '';
        $slider.appendChild($element);
    }
}

window.customElements.define('media-projector-element', MediaProjectorElement);