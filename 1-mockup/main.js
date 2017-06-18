
class MockupComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});

    }

    connectedCallback() {
        let $tmpl = MockupComponent.DOCUMENT.querySelector('#mockup-template').content;
        let $cloned = $tmpl.cloneNode(true);

        this.shadow.appendChild($cloned);
        this.shadow.querySelector('img').attributes.src.value = this.attributes.image.value;
        this.shadow.querySelector('h2').innerText = this.attributes.label.value;
    }
}

MockupComponent.DOCUMENT = document.currentScript.ownerDocument;

window.customElements.define('mockup-component', MockupComponent);
