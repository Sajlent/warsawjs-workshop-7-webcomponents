class MockupComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        let $tmpl = document.querySelector('template').content;
        let $cloned = $tmpl.cloneNode(true);

        this.shadow.appendChild($cloned);
        this.shadow.querySelector('img').attributes.src.value = this.attributes.image.value;
    }
}

window.customElements.define('mockup-component', MockupComponent);

