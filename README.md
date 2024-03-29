## Prova_B

Este é o README para o projeto Prova_B.

### Passos para rodar o projeto:

1. **Clonar o repositório:**
   - Clone este repositório para o seu computador local usando o comando:
     ```
     git clone https://github.com/ricardoreiss/Prova_B.git
     ```

2. **Criar um banco de dados:**
   - Crie um banco de dados MySQL com o nome desejado.

3. **Configurar as variáveis de ambiente:**
   - Crie um arquivo `.env` no diretório raiz do projeto e insira as seguintes variáveis de ambiente, substituindo os valores pelos dados do seu banco de dados MySQL:
     ```
     MODEL_DATABASE=seu_nome_de_banco_de_dados
     MODEL_USERNAME=seu_usuario_mysql
     MODEL_PASSWORD=sua_senha_mysql
     SECRET_KEY=r1c4rd0
     ```

4. **Instalar as dependências do projeto:**
   - Certifique-se de ter o Node.js instalado em seu sistema.
   - Instale as dependências do projeto executando o seguinte comando no terminal, dentro do diretório do projeto:
     ```
     npm install express dotenv path body-parser jsonwebtoken crypto sequelize
     ```

5. **Rodar o servidor:**
   - Execute o seguinte comando para iniciar o servidor:
     ```
     node app.js
     ```

6. **Acessar a aplicação:**
   - Abra um navegador da web e navegue até [http://localhost:3000/home](http://localhost:3000/home) para acessar a aplicação.

### Nota:
- Certifique-se de ter o MySQL instalado em seu sistema e de ter criado o banco de dados conforme mencionado no passo 2.
- As variáveis de ambiente no arquivo `.env` devem corresponder aos detalhes do seu ambiente MySQL.
- Se necessário, ajuste as configurações do servidor express no arquivo `app.js` para atender às suas necessidades específicas.
