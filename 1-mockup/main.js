class MockupComponent extends HTMLElement {
    constructor() {
        super();
        console.log('TshirtComponent created!');
    }
}

window.customElements.define('mockup-component', MockupComponent);

