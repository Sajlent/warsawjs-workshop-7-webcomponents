class Slider {
    constructor({items, callback}) {
        this.items = items;
        this.currentIndex = 0;

        let current = this.currentElement();

        callback(current);
        setInterval(() => {
            this.currentIndex++;
            if (this.currentIndex === this.items.length) {
                this.currentIndex = 0;
            }
            current = this.currentElement();
            callback(current);
        }, 3000);
    }

    currentElement() {
        return this.items[this.currentIndex];
    }
}