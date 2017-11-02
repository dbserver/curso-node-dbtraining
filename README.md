# Contruindo uma aplicação com testes automatizados

## Vamos conversar sobre desenvolvimento guiados por testes

Para garantirmos que nossa aplicação mantenha sua responsabilidade, suas rotas, e as requisições e respostas estão sendo atendidas; e que estamos entregando o que prometemos e que tudo está funcionando. Para isso, vamos usar um modelo conhecido como TDD (Test Driven Development ou Desenvolvimento Guido por Tests).

## TDD - Test Driven Development

O TDD é um processo de desenvolvimento de software que visa o feedback rápido e a garantia de que o comportamento da aplicação está cumprindo o que é requirido. Para isso o processo funciona em ciclos pequenos e os requerimentos são escritos como casos de teste.

A prática do TDD aumentou depois que Kent Beck publicou o livro TDD - Test Driven Development e fomentou a discussão em torno do tema. Grande figuras da comunidade ágil como Martin Fowler também influenciaram na adoção dessa práticas publicando artigos, ministrando palestras e compartilhando cases de sucess.

## Os ciclos do TDD

Quando desenvolvemos guiados por testes, o teste acaba se tornando uma consequência do processo, já que vai ser ele que vai determinar o comportamento esperado da implementação. Para que seja possível validar todas as etapas, o TDD se divide em ciclos que seguem um padrão conhecido como: Red, Green, Refactor.


### Red
    
Significa escrever o teste antes da funcionalidade e executá-lo. Nesse momento como a funcionalidade ainda não foi implementada, o teste deve quebrar. Essa fase também serve para verificar se não há erros na sintáxe e na semântica.

### Green
    
Refere-se a etapa em que a funcionalidade é adicionada para que o teste passe. Nesse momento ainda não é necessário ter a lógica definida, mas é importante atender aos requerimentos do teste. Aqui podem ser deixados TODOs, dados estáticos, ou seja, o suficiente para o teste passar.

### Refactor

É onde se aplica a lógica necessária. Como o teste já foi validado nos passos anteriores, o refactor garantirá que a funcionalidade está sendo implementada corretamente. Nesse momento devem ser removidos os dados estáticos e todos itens adicionados para forçar o teste passar, em seguida deve ser feita a implementação real para que o teste volte a passar.

### Ciclo do TDD

![](/image/ciclo-tdd.png)


## A pirâmide de testes

A pirâmede de testes é um conseito criado por Mike Cohn, escritor do livro Succeeding with Agile.
O livro propõe que hajam mais testes de baixo nível, ou seja, testes de unidade, depois testes de integração e no topo os testes que envolvem interface.

![](/image/piramede-de-testes.png)

Atualmente contamos com uma variada gama de testes, sempre em crescimento de acordo com o surgimento  de novas necessidades. Os mais comuns são os teste de unidade e integração.

## Configurando a aplicação

### Iniciando o projeto

Para iniciarmos um projeto em Node.js, a primeira coisa que devemos fazer é inicializar o npm no diretório onde ficará a aplicação. Primeiro devemos nos certificar se o Node.js e o npm já está instalado em nosso computador. Após instalar o node.js o npm será instalado automaticamente.

### Configurações iniciais

> npm init

Semelhate ao git, o npm inicializará um projeto nesse diretório, depois de executar o camando `npm init` vai apresentar uma série de pergutas como:

* **name**, referente ao nome do projeto.

* **version**, referente a versão.

* **description**, referente a descrição do projeto que está sendo criado.

* **entry point**,  arquivo que será o ponto de entrada caso o projeto seja importado por outro.

* **test command**, comando que executará os testes da aplicação.

* **git repository**, repositório git do projeto.

* **keywords**, palavras chave para outros desenvolvedores encontrar o seu projeto no npm.

* **author**, autor do projeto.

* **license**, referente a licença de uso do código.

Após isso um arquivo chamado **package.json** será criado com o conteúdo semelhante a:

```json
    {
        "name": "curso-dbtraning",
        "version": "1.0.0",
        "main": "index.js",
        "version": {
            "test": "echo \"Error: no test specified\" && exit 1",
        },
        "author": "",
        "license": "ISC"
    }
```

O **package.json** é responsável por aguardar  as configurações npm do nosso projeto, nele ficarão nossos scripts para executar a aplicação e os testes.

## Configurando suporte ao Ecmascript 6

O Babel será responsável por nos permitir usar as funcionalidade do ES6, para isso precisamos instalar os pacotes e configurar o nosso ambiente para o suporte o ES6 por padrão em nossa aplicação. O primeiro passo é instalar os pacotes do Babel:

> npm i babel-cli -D

Após instalar o Babel é necessário instalar o preset que será usado, no nosso caso será o ES6:

> npm i babel-preset-node6 -D

Note que sempre usa -D para instalar as dependências em modo de desenvolvimento pois ele não deve ser usado diretamente em produção.

O último passo é informar para o Babel qual preset iremos usar, para isso basta criar um arquivo no diretório raiz da nossa aplicação chamado `.babelrc` com as seguintes configurações.

```json
    {
        "preset": ["node6"]
    }
```

Feito isso a aplicação já está suportando 100% o ES6 e será possível utilizar as funcionalidades da versão.

### Preparando o ambiente para executarmos os testes

Primeiro vamos instalar alguns módulos, segue o comando abaixo:

> npm i mocha supertest chai -D

Com esse comando estaremos instalar três módulos

* Mocha: módulo que ira executar as suites de testes
* Chai: módulo usado para fazer asserções.
* Supertest: módulo usado para emular e abstrair requisições http.

Logo em seguida vamos criar uma arquivo .gitignore que será responsável por não comitar os arquivos ou diretórios que nele estiverem contidos. 

``` sh
 touch .gitignore
```
Vamos adicionar o diretório `node_modules/` dentro do .gitignore

### Criando nossa aplicação

Vamos criar estrutura da nossa aplicação.

```sh
    mkdir src
    mkdir test
    mkdir test/integration
    touch src/app.js
    touch server.js
```

Vamos instalar o módulo body-parser

```sh
    npm i express body-parser -S
```

Agora vamos acessar o arquivo app.js que está dentro do diretório src/ e que terá a responsabilidade de iniciar o express e carregar os middlewares. Ele ficará assim:

> src/app.js

```js
    const express = require('express')
    const bodyParser =  require('body-parser')

    const app = express()

    app.use(bodyParser.json())

    app.get('/', (req, res) => res.send('Estou aqui!!!'))

    module.exports = app
```

No arquivo server.js será responsável por iniciar a aplicação

```js
    const app = require('./src/app')
    const port = 3000

    app.listen(port, () => console.log(`Aplicação rodando na porta ${port}`))
```


Para subir nossa aplicação vamos executar o comando `node server.js` e acessar o navegador http://localhost:3000 e veremos a mensagem:

> Estou aqui!!!

Note que separamos a responsábilidade de incializar o express e carregar os middlewares da parte que inicia a aplicação em sí. Como nos testes a aplicação será iniciada  pelo `supertest` e não pelo express como é feito no `server.js`

### Configurando os testes

* package.json
* server.js
* src
    * app.js
* test
    * integration


Dentro do integration vamos criar os arquivos de configuração para os testes de integração. O primeiro será referente as configurações do **Mocha**, vamos criar um aquivo chamado `mocha.opts` dentro do diretório integration com o senguite código:

```
--require test/integration/helpers.js
--reporter spec
--slow 5000
```

O primeiro `--require` será o arquivo referente as configurações de suporte para os testes, o qual criaremos a seguir. Na linha seguinte `reporter`, nesse caso, o **spec**. Reporters definem o estilo  da saída do teste no terminal.
Na terceira linha o `slow` é referente a demora máxima que o um caso de teste pode levar, como testes de integração tendem a dependerem de agentes externos como banco de dados, é necessário ter um tempo maior de slow para eles.

O próximo arquivo que iremos criar nesse mesmo diretório é o **helpers.js**. Ele terá o seguinte código:

```js
const supertest = require('supertest')
const chai = require('chai')
const app = require('../../src/app')

global.app = app
global.request = supertest(app)
global.expect = chai.expect
```

O arquivo `helpers.js` é responsável por inicializar as configurações do testes que serão usadas em todos os testes de integração, removendo a necessidade de ter de realizar configurações em cada cenário de teste.

Primeiro importamos os módulos necessários para executar os testes de integração que são o
supertest e o chai e também a nossa aplicação express que chamamos de app.

Depois definimos as globais usando global. Globais fazem parte do Mocha, tudo que for definido
como global poderá ser acessado em qualquer teste sem a necessidade de ser importado.

### Criando nosso primeiro caso de teste

Vamos criar, dentro do diretório **integration**, outro diretório chamado **livro**, que conterá um arquivo chamado `livro-routes.spec.js`.

```js
describe('Routes: Livros', () => {
    
});
```

O **describe** é uma global do Mocha usada para descrever suítes de testes que contém um ou mais
casos de testes e/ou contém outras suítes de testes. Como esse é o **describe** que irá englobar todos os
testes desse arquivo seu texto descreve a responsabilidade geral da suíte de testes que é testar a rota livros.

Agora vamos adicionar um livro padrão para os nossos testes:

```js
describe('Routes: Livros', () => {

    const livroPadrao = {
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro',
        preco: 100
    }

    describe('GET /livros', () => {
        it('deve retornar uma lista de livros', done => {
            
        })
    })
})
```

A função it também é uma global do Mocha e é responsável por descrever um caso de teste.

Note que também é passado um parâmetro chamado done para o caso de teste, isso ocorre porque
testes que executam funções assíncronas, como requisições http, precisam informar ao Mocha
quando o teste finalizou e fazem isso chamando a função done.

Vejamos a implementação a seguir:

```js
describe('Routes: Livros', () => {

    const livroPadrao = {
        nome: 'Criando aplicações testáveis com Nodejs',
        descricao: 'Descrição do livro',
        preco: 100
    }

    describe('GET /livros', () => {
        it('deve retornar uma lista de livros', done => {
            
            request
                .get('/livros')
                .end((err, res)=> {
                    expect(res.body[0]).to.eql(livroPadrao)

                    done(err)
                })
        })
    })
})
```

Na implementação do teste usamos o supertest que exportamos globalmente como request no
`helpers.js`. O supertest nos permite fazer uma requisição http para uma determinada rota e verificar
a sua resposta.

Quando a requisição terminar a função end será chamada pelo supertest e vai receber a resposta ou
um erro, caso ocorra. No exemplo acima é verificado se o primeiro elemento da lista de livros
retornada é igual ao nosso *livroPadrao*.

O expect usado para fazer a asserção faz parte do Chai e foi exposto globalmente no helpers.js.
Para finalizar, notificamos o Mocha que o teste finalizou chamando a função done que recebe err
como parâmetro, caso algum erro ocorra ele irá mostrar a mensagem de erro no terminal.

### Executando os testes

Para automatizar a execução vamos adicionar a seguinte linha no `package.json` dentro de scripts?

```json
{
  "scripts": {
    "test:integration": "NODE_ENV=test mocha --opts test/integration/mocha.opts test/integration/**/*.spec.js"
  }
}
```

A saída deve ser a seguinte:

```
Routes: Livros
GET /livros
    1) deve retornar uma lista de livros


0 passing (63ms)
1 failing

1) Routes: Livros
    GET /livros
        deve retornar uma lista de livros:
    Uncaught AssertionError: expected undefined to deeply equal { Object (nome, descricao, ...) }
```

### Fazendo os testes passarem 

Escrevemos nossos testes e eles estão no estado RED, ou seja, implementados mas não estão
passando. O próximo passo, seguindo o TDD, é o GREEN onde vamos implementar o mínimo para
fazer o teste passar.

Para isso precisamos implementar uma rota em nossa aplicação.

Primeiro vamos criar um diretório dentro de *src*, chamado **livros** e dentro dele um arquivo chamado `livro-routes.js`. Segue o comando para criação:

```sh
    mkdir src/livros
    touch src/livros/livro-routes.js
```
E o arquivo `livro-routes.js` ficará assim:

```js
module.exports = (app) => {

    app.route('/livros')
        .get((req, res) => {
            res.json([{
                nome: 'Criando aplicações testáveis com Nodejs',
                descricao: 'Descrição do livro',
                preco: 100
            }])
        })
}
```

E também precisamos ir até o aquivo `app.js` e importar essa dependência e logo abaixo executá-la passando o **app** por parâmentro.

```js
const livroRoutes = require('./livros/livro-routes')

...

livroRoutes(app)
```

Rodamos o teste novamente e veremos o resultado:

> npm run test:integration

A saída deve ser de sucesso, como essa:

```sh
Routes: Livros
    GET /livros
      ✓ deve retornar uma lista de livros

  1 passing (54ms)
```

Nosso teste está passando, e estamos no estado **GREEN** do TDD, ou seja, temos o teste e a
implementação suficiente para ele passar. O próximo passo será o **REFACTOR** onde iremos
configurar as rotas.