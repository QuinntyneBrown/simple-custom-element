const html = require("./simple.component.html");
const css = require("./simple.component.scss");

const template = document.createElement("template");
template.innerHTML = `<style>${css}</style>${html}`;

export class SimpleComponent extends HTMLElement {
    constructor() {
        super();
        this.sayHi = this.sayHi.bind(this);
    }

    public heading: string;

    public get headingHTMLElement():HTMLHeadingElement { return this.shadowRoot.querySelector("h1"); }

    static get observedAttributes() {
        return [
            "heading"
        ];
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  
        this._bind();
        this._setEventListeners();        
    }

    public sayHi() {
        alert("Hi");
    }

    private _bind() {
        this.headingHTMLElement.textContent = this.heading;
    }

    private _setEventListeners() {
        this.addEventListener("click", this.sayHi);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.sayHi);
    }
    
    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "heading":
                this.heading = newValue;

                if (this.parentNode)
                    this._bind();
                break;
        }
    }
}

customElements.define(`ce-simple`,SimpleComponent);