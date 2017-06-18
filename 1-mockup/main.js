class MockupComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        this.shadow.innerHTML = document.querySelector('template').innerHTML;
        this.shadow.querySelector('img').attributes.src.value = this.attributes.image.value;
    }
}

window.customElements.define('mockup-component', MockupComponent);

