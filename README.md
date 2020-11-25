<h1 align="center" > API - Users Github </h1>

<p>O projeto é uma api baseada na api do github, aonde você pode casdastrar um usuário, criar um repositório, seguir outros usuários, deixar de seguir, dar estrela em algum repositório e retirar a estrela.</p>

---
## Tecnologias utilizadas no projeto

- Node.js
- Express.js
- PostgreSQL
- Sequelize

---
## Para executar o projeto 

<p align="center"><strong> Antes você precisar instalar o 
<a href="https://nodejs.org/en/download">Node.js</a> e o banco de dados <a href="https://www.postgresql.org/download/">PostgreSQL</a>. Após instalar seguir o passo a passo abaixo.</strong></p>

## Banco de dados

* Você vai precisar ligar o banco de dados de acordo com o seu sistema operacional, pode conferir <a href="https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html">aqui</a>.

---
## Aplicação

### Login/Logout

ROTA                  |     HTTP(Verbo)   |      Descrição              | 
 -------------------- | ----------------- | ---------------------       | 
/users/login          |       POST        | Realiza login de um usuário | 
/users/logout/:userId |       DELETE      | Realiza o logout do usuário | 

### User

ROTA                  |     HTTP(Verbo)   |      Descrição          | 
 -------------------- | ----------------- | ---------------------   | 
/users                |       POST        |   Cadastrar usuário     | 
/users/:userId        |       GET         |   Selcionar por userId  | 
/users/:userId        |       PUT         |   Atualizar por userId  |   
/users/:userId        |       DELETE      |   Excluir por userId    |

### Following

ROTA                                        |     HTTP(Verbo)   |                Descrição                         | 
 --------------------                       | ----------------- |          ---------------------                   |
/users/:userId/following                    |       GET         | Lista os usuários que o userId está seguindo     | 
/users/:userId/following                    |       POST        | Seguir o usuário informado                       |  
/users/:userId/following/:followingId       |       GET         | Selciona o usuário que você está seguido pelo id | 
/users/:userId/following                    |       DELETE      | Deixa de seguir algum usuário                    |

### Followers

ROTA                  |     HTTP(Verbo)   |      Descrição        |                             
 -------------------- | ----------------- | --------------------- |                              
/users/:userId/followers/                 |       GET             | Lista todos os seguidores    | 
/users/:userId/followers/:followerId      |       GET             | Lista um seguidor específico |   

### Repositories

ROTA                  |     HTTP(Verbo)   |      Descrição                                               | 
 -------------------- | ----------------- | ---------------------                                        | 
/users/:userId/repositories               |       GET        | Lista todos os repositórios de um usuário | 
/users/:userId/repositories               |       POST       | Cria um repositório para o usuário        | 
/users/:userId/repositories/:repositoryId |       GET        | Lista um repositório por repositoryId     |   
/users/:userId/repositories/:repositoryId |       PUT        | Atualiza repositório por repositoryId     |   
/users/:userId/repositories/:repositoryId |       DELETE     | Exclui repositório por repositoryId       |

### Repositories Stars

ROTA                  |     HTTP(Verbo)   |      Descrição                                                | 
 -------------------- | ----------------- | ---------------------                                         | 
/users/:userId/repositories-stars         |       POST            | Adiciona estrela para um repositório  | 
/users/:userId/repositories-stars         |       DELETE          | Remove estrela de um repositório      | 


```bash
# Clonar o repositório
$ git clone https://github.com/Theux17/api-users-github.git

# Entrar no diretório 
$ cd api-users-github.git
```
* Criar um arquivo na raiz chamado `.env` e copiar os dados do `.env.example` e preencher com as informações necessária.

```bash
# Instalar todas as dependências 
$ yarn install // npm install

# Criar a database 
$ yarn // npx sequelize db:create

# rodar as migrations
$ yarn // npx sequelize db:migrate

# Iniciar o servidor
$ yarn start // npm start
```