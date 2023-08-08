# Projeto FullStack M6 - Backend

## Tutorial

### Como utilizar e testar o backend

- Faça o clone do repositório (https://github.com/groupZeroSeven/project-fullstack-backend)
- Copie o arquivo .env.exemple e digite as credenciais no arquivo .env
- Instale as dependências e rode as migrations com o comando "yarn ; yarn typeorm:run" 
- Inicie o back com o comando "yarn run dev"

## Features

### 1- Criação da base do projeto parte do Backend.

#### Libs:

- @types/cors
- @types/express
- @types/jest 
- @types/jsonwebtoken 
- @types/node  
- @types/supertest 
- jest 
- jsonwebtoken 
- supertest 
- ts-jest 
- ts-node-dev 
- typescript  
- yup      
- @types/bcryptjs     
- @types/nodemailer     
- bcryptjs   
- cors     
- cross-env      
- dotenv     
- express     
- express-async-errors    
- nodemailer     
- pg     
- reflect-metadata    
- typeorm    

#### Entities:

- Addresses
- Annoucements
- Comments
- Images
- Users

#### Rotas:

///Digite estas variaveis de ambiente junto com o WorkSpace para uma utilização mais flúida no Insomnia

{
	"token": "{% response 'body', 'req_ffc81b46e7d349c2938f2c24761c33ea', 'b64::JC50b2tlbg==::46b', 'never', 60 %}",
	"baseURL": "http://localhost:10000/"
}

