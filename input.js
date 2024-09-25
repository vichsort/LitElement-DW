import { html, LitElement, css } from 'lit';

export class inputSla extends LitElement {
    static styles = css`

    `

    static properties = {
        nome: {},
    };

    constructor() {
        super();
        this.nome = 'Merdinha';
    }

    atualiza(event) {
        const input = event.target;
        this.nome = input.value
    }

    render() {
        return html`
            <h1>Você ganhou no tigrinho!</h1>
            <h2>Ele soltou cartinha, ${this.nome}</h2>
            <input @input=${this.atualiza} placeholder="Seu nome vai aqui">
        `
    }
}

window.customElements.define('input-sla', inputSla);