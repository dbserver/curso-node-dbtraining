# Contruindo uma aplicação com testes automatizados

## Vamos conversar sobre desenvolvimento guiados por testes

    Para garantirmos que nossa aplicação mantenha sua responsabilidade, suas rotas, e as requisições e respostas estão sendo atendidas; e que estamos entregando o que prometemos e que tudo está funcionando. Para isso, vamos usar um modelo conhecido como TDD(Test Driven Development ou Desenvolvimento Guido por Tests).

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

## Configurando a aplicação

### Iniciando o projeto

    Para iniciarmos um projeto em Node.js, a primeira coisa que devemos fazer é inicializar o npm no diretório onde ficará a aplicação. Primeiro devemos nos certificar se o Node.js e o npm já está instalado em nosso computador. Após instalar o node.js o npm será instalado automaticamente.

### Configurações iniciais

> npm init


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