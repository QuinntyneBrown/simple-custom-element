import { TemplateResult } from "lit-html";
import { unsafeHTML } from "lit-html/lib/unsafe-html";
import { render, html } from "lit-html/lib/lit-extended";

const styles = unsafeHTML(`<style>${require("./simple.component.css")}</style>`);

export class SimpleComponent extends HTMLElement {
    constructor() {
        super();
        this.alert = this.alert.bind(this);
        this._handleClick = (e) => { console.log('click'); };
    }

    public message: string;
    
    static get observedAttributes() {
        return [
            "message"
        ];
    }

    public get template(): TemplateResult {
        return html`
            ${styles}
            <button on-click=${this._handleClick}>Click Me</button>
            <h1><slot></slot></h1>
        `;
    }

    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'simple');

        if (!this.hasAttribute('tabindex'))
            this.setAttribute('tabindex', '0');

        render(this.template, this.shadowRoot)    
    }

    public _handleClick($event) {
        alert("What?");
    }

    public alert() {
        alert(this.message);
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