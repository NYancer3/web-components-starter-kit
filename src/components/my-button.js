import template from './button-template.js'

class Button extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));

      this.$container = this._shadowRoot.querySelector('.container');

      this.$button = this._shadowRoot.querySelector('button');

      this.$button.addEventListener('click',evt =>{
          //console.log(evt);
          this.dispatchEvent(
              new CustomEvent('onClick', {
                  detail: 'Hello from within the Custom Element'
              })
          );
      });
    }

    connectedCallback(){
        if (this.hasAttribute('as-atom')){
            this.$container.style.padding = '0px';
        }
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(value){
        this.setAttribute('label',value);
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name,oldVal,newVal){
        this.render();
    }

    render() {
        this.$button.innerHTML = this.label;
    }

  }
  window.customElements.define('my-button', Button);