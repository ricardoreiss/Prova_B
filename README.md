## Auth JWT MVC

Auth JWT MVC is a project designed for studying web authentication with JWT. It uses only HTML, CSS, SQL and JavaScript, leveraging packages like Express, Sequelize, and Jsonwebtoken.

### Steps to run the project:

1. **Clone the repository:**
   - Clone this repository to your local computer using the command:
     ```
     git clone https://github.com/ricardoreiss/Auth-JWT_MVC.git
     ```

2. **Create a database:**
   - Create a MySQL database with your desired name.

3. **Set up environment variables:**
   - Create a `.env` file in the root directory of the project and insert the following environment variables, replacing the values with your MySQL database details:
     ```
     MODEL_DATABASE=your_database_name
     MODEL_USERNAME=your_mysql_username
     MODEL_PASSWORD=your_mysql_password
     SECRET_KEY=r1c4rd0
     ```

4. **Install project dependencies:**
   - Make sure you have Node.js installed on your system.
   - Install the project dependencies by running the following command in the terminal, inside the project directory:
     ```
     npm install express dotenv path body-parser jsonwebtoken crypto sequelize
     ```

5. **Run the server:**
   - Execute the following command to start the server:
     ```
     node app.js
     ```

6. **Access the application:**
   - Open a web browser and navigate to [http://localhost:3000/home](http://localhost:3000/home) to access the application.

### Note:
- Make sure you have MySQL installed on your system and have created the database as mentioned in step 2.
- The environment variables in the `.env` file must match the details of your MySQL environment.
- If necessary, adjust the express server settings in the `app.js` file to meet your specific needs.

