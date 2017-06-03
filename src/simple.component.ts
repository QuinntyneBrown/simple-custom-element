const html = require("./simple.component.html");
const css = require("./simple.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

export class SimpleComponent extends HTMLElement {
    constructor() {
        super();
        this.alert = this.alert.bind(this);
    }

    public message: string;
    
    static get observedAttributes() {
        return [
            "message"
        ];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
        this._setEventListeners();        
    }

    public alert() {
        alert(this.message);
    }

    private _bind() {

    }

    private _setEventListeners() {
        this.addEventListener("click", this.alert);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.alert);
    }
    
    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "message":
                this.message = newValue;                
                break;
        }
    }
}

customElements.define(`ce-simple`,SimpleComponent);