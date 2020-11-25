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