# Instalação
## Básico
Precisamos de node.js instalado para que isso funcione! Para verificar se voce tem o node, faça o seguinte no terminal:
```bash
node -v
```

se o resultado for uma versão, você possui ele. Bom, com ele feito, precisamos criar um arquivo com package-json. para isso:
```bash
npm init -y
```
o 'y' não é necessário, mas aqui ele vai pular toda a escrita pra gente.

## Lit
Primeiramente, precisamos ter em mente que vamos instalar o Litelement - um filho do Lit. O pacote do lit pesa aproximadamente 100kb, entao a instalação nao deve demorar nada. <br>
Vamos baixar o lit:
```bash
npm install lit
```

em segundos, o lit está pronto para ser usado. Mas lembra que falamos que um compilador precisa ser instalado? Então, aqui nós vamos usar o 'vite', que compila e cria um live server do nosso site. A instalação dele é simples:

```bash
npm install vite --save-dev
```

ele é um pacote mais pesado. Deve demorar mais tempo. Enquanto isso, vamos pensando no que precisamos. <br>
O vite precisa ser configurado na maioria das vezes, mas como nosso projeto é extremamente simples, vamos apenas usar duas funções suas, que são 'vite-build' para gerar a versão do código e efetuar uma vigilância ao atualizar um componente e 'vite' que por si só rodará o código num live server. <br>
Com o vite pronto, vamos em 'package.json' para facilitar nosso serviço. Em scripts, adicionamos:
```json
  "scripts": {
    [...]
    "build": "vite build",
    "vite": "vite"
  },
```
agora, para o funcionamento, apenas usaremos
```bash
npm run build # para construir
npm run vite # para rodar o live server
```
mas logo veremos melhor disso. <br>
Vamos criar então nossos inputs! precisamos de um html, css e js. Todos eles são criados no mesmo nível, fora de pasta nenhuma. Criamos então 'index'.{html,css,js}. Com o código básico sendo assim:
- No html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Rodrigo Faez</title>
    <script type="module" src="index.js"></script>
</head>
<body>

</body>
</html>
```

Isso ai, acabamos a instalação

# Importação
Temos o lit e o vite instalados. Precisamos do vite puramente para a compilação do lit e não pretendemos criar um arquivo de configuração do vite. Mas caso quiser fazer, crie um arquivo chamado 'vite.config.js' e insira a configuração necessária. <br>
Sobre o lit, é interessante falar que iremos trabalhar com uma árvore simples de código, mas normalmente um projeto real gera muitos e muitos componentes - uma árvore bem composta com componentes filhos e mais componentes surgindo daí. <br>
Certo, vamos importar o lit para o nosso arquivo 'index.js'. Simples:

```javascript
import { LitElement } from 'lit';
```

isso nos permite criar um componente. Vamos fazer nossa primeira classe:

```javascript
export class nomeClasse extends LitElement {

}
```
Nossa primeira classe aqui está extendendo a biblioteca do litelement, o que significa que estamos criando um elemento web. Certo. Precisamos, nesse litelement de duas coisas para que possamos carregar um componente estilizado no nosso html. Então, precisamos de 
- HTML
- CSS

```javascript
/* Atualizamos as importações */
import { html, LitElement, css } from 'lit';
```

# Criando meu primeiro componente
Temos o arquivo lit, o vite funcionando, a importação feita. O que fazemos agora? Criaremos um componente. Precisamos obrigatoriamente renderizar um html no nosso elemento. Lembram o que vamos usar? <br>
*render()!*

```javascript
export class nomeClasse extends LitElement {
  render() {
    return html`` // renderiza o html
  }

}
```
*Pergunta*: A resposta rápida é interpolação. Estamos usando `` como uma possibilidade de encaixar os placeholders e chamados de funções. <br>

Certo. Continuando, vamos escrever o que precisamos no nosso html. Nesse caso, vamos fazer um simples titulo e parágrafo. <br>
*Lembra de dizer que tá usando extensão* <br>

```javascript
export class nomeClasse extends LitElement {
  render() {
    return html`
      <h1>Título</h1>
      <p>Parágrafo</p>
    `
  };
};
```

Queremos estilizar o nosso elemento. Lembra o que precisa fazer? Uma propriedade estática!

```javascript
export class nomeClasse extends LitElement {
  static styles = css``; // os estilos ficarão aqui
  [...]
}
```
Pronto. Tudo aqui será um padrão de estilos único do componente: ele é escopado, o que significa que ele não vaza do componente, apenas estilizando o que está em sua branch - que está sendo usado. <br>
Vamos tornar esse elemento mais reativo. Primeiro, criamos uma propriedade estática:

```javascript
export class elementoBasico extends LitElement {

    [...]

    static properties = {
        nome: {}, // defina vazio! 
    }

    [...]

};
```
E como tornamos reativa? Construtor!

```javascript
export class elementoBasico extends LitElement {

    [...]

    static properties = {
        nome: {},
    }

    constructor() {
      super();
      this.nome = 'amigão' // alteramos o self
    }

    [...]

};
```

Temos aqui nossa propriedade sendo alterada pela string que adicionamos! Vamos usá-la aproveitando da interpolação.

```javascript
    render() {
        return html`
            <h2>Você é meu ${this.nome}</h2>
        `
    }
```

Adicionamos então uma interpolação usando '${}'.

## Código completo
```javascript
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
```

# Criando um componente mais completo
Agora que vimos um pouco sobre como podemos interpolar, vamos tentar fazer um sistema que analisa um input. <br>
Input é aquela caixa de texto que você insere no sistema, como quando vamos adicionar um cpf ou algo assim. <br>
Criar um input é facil. Vamos criar um outro arquivo para deixar o componente *mas se quiser, pode seguir no mesmo arquivo*.  <br>
Vamos criar tudo igual do outro elemento, até mesmo o static properties. Mas vamos fazer uma coisa diferente! famos definir um default, que ficará no constructor().

```javascript
  [...]
    constructor() {
        super();
        this.nome = 'seu nome aqui';
    }
  [...]
```

vamos usar a interpolação para poder testar se deu certo!
```javascript
    render() {
        return html`
            <h2>Ele soltou cartinha, ${this.nome}</h2>
        `
    }
```
Temos o nome padrão, perfeito. Com isso, vamos fazer o primeiro passo, pensar em como funciona um evento. <br>
O lit é capaz de reconhecer callbacks, o que significa que ele também é capaz de ver eventos - detectar alterações internas do objeto que está analisando, verificando as etapas que ele passa, assim como no js padrão. Então, podemos fazer uma função que reconhece os eventos que o input gera. <br>
Na documentação, o @input event ocorre quando se altera um dado do input <br>
Isso significa que podemos fazer o input chamar uma função toda vez que um dado do input é alterado!

```javascript
    render() {
        return html`
            <h1>Você ganhou no tigrinho!</h1>
            <h2>Ele soltou cartinha, ${this.nome}</h2>
            <input @input=${this.atualiza} placeholder="Seu nome vai aqui">
        `
    }
```
estamos chamando aqui em @input=${this.atualiza} como uma propriedade. Vamos definir essa propriedade

```javascript
    atualiza(event) { // escuta o evento
        const input = event.target; // diz onde é o alvo do evento
        this.nome = input.value // pega o valor do input e pôe na variavel
    }
```

em tese, agora estamos prontos!

## Código completo

```javascript
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
```

# Criando um elemento reativo
Falamos muito sobre o que o lit faz, mas apresentamos apenas dois componentes simples. Não vamos fazer um trabalho gigante pra complicar muito a cabeça de voces, mas vamos fazer um elemento de reação interna - que é uma palinha do que o lit pode fazer -, para ao menos demonstrar um pouco de tudo isso. <br>
Para isso, escolham um dos dois:
- Um botão que troca de cor ao clicá-lo
- Cronômetro
- *!!!!!!!!!!!!!!!!ta pra vir, vamo ve*

## Botão que troca de cor
Nas propriedades estáticas, precisamos de três coisas: 
- Uma lista
- Um índice
- Um valor final

```javascript

    [...]

      static properties = {
        lista: {}, // um array
        indice: {}, // o 'i'
        atual: {}, // valor final
    };
    
    [...]
    
```

vamos construí-los na propriedade constructor

```javascript
    constructor() {
        super()
        this.lista = ['#a70100', '#b62d2e', '#c45455', '#ce7374', '#d88c8d', '#dea1a1'];
        this.indice = 0;
        this.atual = this.lista[this.indice];
    };
```

pronto, com isso pronto, precisamos apenas agora fazer nosso loop (a função mudaCor)

```javascript
    MudaCor() {
        this.indice = (this.indice + 1);
        this.atual = this.lista[this.indice];
    }
```

e vamos chamar no clique do botão

```javascript
    render() {
        return html`
            <p>Alo</p>
            <button @click=${this.MudaCor} style="background-color: ${this.atual}">Click me!</button>
            <p>${this.atual}</p>
        `;
    }
```
mas calma! tem um erro. Sabe o por que? <br>
quando clicamos mais do que 6 vezes, o botao fica branco, sem estilos, por que o array acaba e segue-se incrementando. <br>
Solução:

```javascript
    MudaCor() {
        if (this.indice < 6) {
            this.indice = (this.indice + 1);
            this.atual = this.lista[this.indice];
        } else {
            this.indice = 0;
        }

    }
```

Código completo: 

```javascript
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
```
## Cronômetro