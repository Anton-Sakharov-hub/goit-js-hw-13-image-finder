export default class {
    constructor({selector, hidden = true}) {
        this.refs = this.getRefs(selector);

        hidden && this.hide();
    }

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector('[data-btn="load-more"]');
        refs.label = refs.button.querySelector('.label');

        return refs;
    }

    enable() {
        this.refs.button.disabled = false;
        this.refs.label.textContent = "load more";
    }

    disable() {
        this.refs.button.disabled = true;
        this.refs.label.textContent = 'downloading...';
    }

    show() {
        this.refs.button.classList.remove('is-hidden');
    }

    hide() {
        this.refs.button.classList.add('is-hidden')
    }
}