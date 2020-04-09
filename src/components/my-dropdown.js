import template from './dd-template.js'

class Dropdown extends HTMLElement {
    constructor() {
        super();
        this._sR = this.attachShadow({
            mode: 'open'
        });
        this._sR.appendChild(template.content.cloneNode(true));

        this.open = false;

        this.$label = this._sR.querySelector('.label');
        this.$button = this._sR.querySelector('my-button');
        this.$dropdown = this._sR.querySelector('.dropdown');
        this.$dropdownList = this._sR.querySelector('.dropdown-list');

        this.$button.addEventListener('onClick',
        this.toggleOpen.bind(this)
        );
    }

    toggleOpen(event){
        this.open = !this.open;

        this.open
        ? this.$dropdown.classList.add('open')
        : this.$dropdown.classList.remove('open');
    }

    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }
    get label() {
        return this.getAttribute('label');
    }
    set label(value) {
        this.setAttribute('label', value);
    }
    get option() {
        return this.getAttribute('option');
    }
    set option(value) {
        this.setAttribute('option', value);
    }
    get options() {
        return JSON.parse(this.getAttribute('options'));
    }
    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }
    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }
    render() {
        this.$label.innerHTML = this.label;

        if (this.options){
            this.$button.setAttribute('label',this.options[this.option].label);
        }

        this.$dropdownList.innerHTML = '';
        Object.keys(this.options || {}).forEach(key => {
            let option = this.options[key];
            let $option = document.createElement('li');
            $option.innerHTML = option.label;

            if (this.option && this.option == key){
                $option.classList.add('selected');
            }

            $option.addEventListener('click',() => {
                this.option = key;
                this.toggleOpen();
                this.dispatchEvent(
                    new CustomEvent('onChange',{detail: option.label})
                    );
                this.render();
            });
            this.$dropdownList.appendChild($option);
        });

    }
}
window.customElements.define('my-dropdown', Dropdown);