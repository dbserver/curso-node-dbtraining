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

O último passo é informar para o Babel qual preset iremos usar, para isso basta criar um arquivo no diretório raiz da nossa aplicação chamado **.babelrc** com as seguintes configurações.

```json
    {
        "preset": ["node6"]
    }
```

Feito isso a aplicação já está suportando 100% o ES6 e será possível utilizar as funcionalidades da versão.