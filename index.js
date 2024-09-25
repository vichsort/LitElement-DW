import { LitElement, html, css } from 'lit';

export class elementoBasico extends LitElement {
    static styles = css`
        .container {
            background-color: #bebebe;
            padding: 10px;
        }
    `;

    static properties = {
        nome: {},
    }

    constructor() {
        super();
        this.nome = 'tico'
    }

    render() {
        return html`
            <div class="container">
                <h1>Título</h1>
                <h2>Você é meu ${this.nome}</h2>
                <p>Parágrafo</p>
            </div>
        `
    }



};

window.customElements.define('elemento-basico', elementoBasico);
