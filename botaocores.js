import { html, css, LitElement } from "lit";

export class TrocaCor extends LitElement {
    static styles = css`
        button {
            border: none;
            padding: 5px;
        }
    `;

    static properties = {
        lista: {},
        indice: {},
        atual: {},
    };

    constructor() {
        super()
        this.lista = ['#a70100', '#b62d2e', '#c45455', '#ce7374', '#d88c8d', '#dea1a1'];
        this.indice = 0;
        this.atual = this.lista[this.indice];
    };

    MudaCor() {
        if (this.indice < 5) {
            this.indice = (this.indice + 1);
            this.atual = this.lista[this.indice];
        } else {
            this.indice = 0;
        }

    }

    render() {
        return html`
            <p>Alo</p>
            <button @click=${this.MudaCor} style="background-color: ${this.atual}">Click me!</button>
            <p>${this.atual}</p>
        `;
    }
}

window.customElements.define('botao-cores', TrocaCor);