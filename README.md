# BoardCamp Node/SQL

## Visão geral
- Jogos de tabuleiro podem proporcionar muitos momentos de diversão! Mas os preços desses jogos são muito caros, e assim surgiram as locadoras de jogos de tabuleiro.
- Este é um projeto de um sistema de gestão de uma locadora de jogos de tabuleiro usando Banco de Dados Relacional (SQL).

### **Deploy do Banco de Dados**
Link: https://boardcamp-api-w4ji.onrender.com

## Funcionalidades 
### JOGOS
1. Criar jogos;
2. Listar jogos;
### CLIENTES
3. Criar novo cliente;
4. Buscar o cliente pelo seu número de identificação;
5. Listar todos os clientes;
6. Atualizar cliente;

### ALUGUÉIS
7. Criar aluguél;
8. Listar aluguéis contendo o cliente e o jogo;
9. Finalizar aluguél;
10. Apagar aluguél.

## Tecnologias e Ferramentas
- JavaScript
- Banco de Dados relacionais (SQL)
- Express
- Cors 
- Joi 
- pg
- Dayjs

### CRUD de Jogos [Create | Read]
    - Formato de um jogo (tabela `games`)
        
        
        {
          id: 1,
          name: 'Banco Imobiliário',
          image: 'http://',
          stockTotal: 3,
          pricePerDay: 1500,
        }
        
        
    - Listar jogos
        - Rota: GET `/games`
        - Response: lista dos jogos encontrados, seguindo o formato abaixo.
            
            
            [
              {
                id: 1,
                name: 'Banco Imobiliário',
                image: 'http://',
                stockTotal: 3,
                pricePerDay: 1500
              },
              {
                id: 2,
                name: 'Detetive',
                image: 'http://',
                stockTotal: 1,
                pricePerDay: 2500
              },
            ]
            
            
    - Inserir um jogo
        - Rota: POST `/games`
        - Request: body no formato:
            
           
            {
              name: 'Banco Imobiliário',
              image: 'http://www.imagem.com.br/banco_imobiliario.jpg',
              stockTotal: 3,
              pricePerDay: 1500
            }
            
            
        - Response: status 201, sem dados
        - Regras de Negócio:
            - `name` deve estar presente e não pode estar vazio; `stockTotal` e `pricePerDay` devem ser maiores que 0 ⇒ nesses casos, deve retornar status 400.
            - `name` não pode ser um nome de jogo já existente ⇒ nesse caso deve retornar status 409.
### CRUD de Clientes [Create | Read | Update]
    - Formato de um cliente (tabela `customers`)
        
        
        {
          id: 1,
          name: 'João Alfredo',
          phone: '21998899222',
          cpf: '01234567890',
          birthday: '1992-10-25'
        }
        
        
    - Listar clientes
        - Rota: GET `/customers`
        - Response: lista com todos os clientes
            
            
            [
              {
                id: 1,
                name: 'João Alfredo',
                phone: '21998899222',
                cpf: '01234567890',
                birthday: '1992-10-05'
              },
              {
                id: 2,
                name: 'Maria Alfreda',
                phone: '21998899221',
                cpf: '12345678910',
                birthday: '1994-12-25'
              },
            ]
            
            
    - Buscar um cliente por id
        - Rota: GET `/customers/:id`
        - Response: somente o objeto do usuário com o id passado:
            
            
            {
              id: 1,
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            
            
        - Regras de Negócio:
            - Se o cliente com id dado não existir, deve responder com status 404.
    - Inserir um cliente
        - Rota: POST `/customers`
        - Request: body no formato abaixo
            
            
            {
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-25'
            }
            
        - Response: status 201, sem dados
        - Regras de negócio:
            - `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` deve estar presente e não pode ser uma string vazia; `birthday` deve ser uma data válida; ⇒ nesses casos, deve retornar status 400.
            - `cpf` não pode ser de um cliente já existente; ⇒ nesse caso deve retornar status 409.
    - Atualizar um cliente
        - Rota: PUT `/customers/:id`
        - Request: body no formato:
            
            
            {
              name: 'João Alfredo',
              phone: '21998899222',
              cpf: '01234567890',
              birthday: '1992-10-05'
            }
            
            
        - Response: status 200, sem dados.
        - Regras de negócio:
            - `cpf` deve ser uma string com 11 caracteres numéricos; `phone` deve ser uma string com 10 ou 11 caracteres numéricos; `name` deve estar presente e não pode ser uma string vazia; `birthday` deve ser uma data válida ⇒ nesses casos, deve retornar **status 400.
            - `cpf` não pode ser de um cliente já existente ⇒ nesse caso deve retornar status 409. Observe que o conflito só deve ocorrer caso o CPF enviado pertença a outro usuário. O usuário pode desejar atualizar outras propriedades, mas manter seu CPF atual.
### CRUD de Aluguéis [Create | Read | Update | Delete]
    - Formato de um aluguel (tabela `rentals`)
        
        
        {
          id: 1,
          customerId: 1,
          gameId: 1,
          rentDate: '2021-06-20',    // data em que o aluguel foi feito
          daysRented: 3,             // por quantos dias o cliente agendou o aluguel
          returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
          originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
          delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
        }
       
        
    - Listar aluguéis
        - Rota: GET `/rentals`
        - Response: lista com todos os aluguéis, contendo o `customer` e o `game` do aluguel em questão em cada aluguel.
            
           
            [
              {
                id: 1,
                customerId: 1,
                gameId: 1,
                rentDate: '2021-06-20',
                daysRented: 3,
                returnDate: null, // troca pra uma data quando já devolvido
                originalPrice: 4500,
                delayFee: null,
                customer: {
                 id: 1,
                 name: 'João Alfredo'
                },
                game: {
                  id: 1,
                  name: 'Banco Imobiliário'
                }
              }
            ]
          
            
            - Você deve realizar **apenas uma busca no banco de dados** que venha com todos os dados necessários e, no JavaScript, pode organizá-los da maneira esperada.
    - Inserir um aluguel
        - Rota: POST `/rentals`
        - Request: body no formato abaixo
            
            
            {
              customerId: 1,
              gameId: 1,
              daysRented: 3
            }
            
            
        - Response: status 201, sem dados
        - Regras de Negócio
            - Ao inserir um aluguel, os campos `rentDate` e `originalPrice` devem ser populados automaticamente antes de salvá-lo:
                - `rentDate`: data atual no momento da inserção.
                - `originalPrice`: `daysRented` multiplicado pelo preço por dia do jogo no momento da inserção.
            - Ao inserir um aluguel, os campos `returnDate` e `delayFee` devem sempre começar como `null`.
            - Ao inserir um aluguel, deve verificar se `customerId` se refere a um cliente existente. Se não, deve responder com status 400. ✅
            - Ao inserir um aluguel, deve verificar se `gameId` se refere a um jogo existente. Se não, deve responder com status 400. ✅
            - `daysRented` deve ser um número maior que 0. Se não, deve responder com **status 400. ✅
            - Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque. Caso contrário, deve retornar status 400.✅
    - Finalizar aluguel
        - Rota: POST `/rentals/:id/return`
        - Response: status 200, sem dados.
        - Regras de Negócio
            - Ao retornar um aluguel, o campo `returnDate` deve ser populado com a data atual do momento do retorno.
            - Ao retornar um aluguel, o campo `delayFee` deve ser automaticamente populado com um valor equivalente ao número de dias de atraso vezes o preço por dia do jogo no momento do retorno. Exemplo:
                - Se o cliente alugou no dia 20/06 um jogo por 3 dias, ele deveria devolver no dia 23/06. Caso ele devolva somente no dia 25/06, o sistema deve considerar 2 dias de atraso. Nesse caso, se o jogo custava R$ 15,00 por dia, a `delayFee` deve ser de R$ 30,00 (3000 centavos).
            - Ao retornar um aluguel, deve verificar se o `id` do aluguel fornecido existe. Se não, deve responder com status 404. ✅
            - Ao retornar um aluguel, deve verificar se o aluguel já não está finalizado. Se estiver, deve responder com status 400. ✅
    - Apagar aluguel
        - Rota: DELETE `/rentals/:id`
        - Response: status 200, sem dados
        - Regras de Negócio:
            - Ao excluir um aluguel, deve verificar se o `id` fornecido existe. Se não, deve responder com status 404.
            - Ao excluir um aluguel, deve verificar se o aluguel já não está finalizado (ou seja, `returnDate` já está preenchido). Se não estiver finalizado, deve responder com status 400.

## Como rodar em desenvolvimento:
- Clonar o repositório;
- Baixar as dependências necessárias com o comando: `npm install`
- Executar o projeto: `npm start`