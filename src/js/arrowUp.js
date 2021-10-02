export default class {
    constructor({selector, hidden = true}) {
        this.refs = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.arrowUp = document.querySelector(selector);

        return refs;
    }

    show() {
        this.refs.arrowUp.classList.remove('is-hidden');
    }

    hide() {
        this.refs.arrowUp.classList.add('is-hidden');
    }
}