declare var System: any;

const template = document.createElement("template");

const promises = Promise.all([
    System.import("./simple.component.html"),
    System.import("./simple.component.css")
]);


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

    async connectedCallback() {    

        const assests = await promises;
        
        template.innerHTML = `<style>${assests[1]}</style>${assests[0]}`; 
   
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(document.importNode(template.content, true));  

        if (!this.hasAttribute('role'))
            this.setAttribute('role', 'simple');

        if (!this.hasAttribute('tabindex'))
            this.setAttribute('tabindex', '0');

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