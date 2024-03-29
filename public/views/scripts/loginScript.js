function checkSubmit(event) {
    event.preventDefault();

    if (event.key === "Enter") {
        document.getElementById("submitButton").click(); // Dispara o evento de clique no botão de envio
    }
}

document
  .getElementById("signUpButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/signup/personalinformations";
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestBody = JSON.stringify({
      email,
      password,
    });

    try {
      const response = await fetch("/model/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const emailAndPasswordError = document.getElementById(
        "emailAndPasswordError"
      );
      if (response.status === 404) {
        emailAndPasswordError.textContent =
          "Email não registrado. Crie uma conta.";
        emailAndPasswordError.style.display = "block";

      } else if (response.status === 401) {
        emailAndPasswordError.textContent = "Senha Incorreta. Tente Novamente.";
        emailAndPasswordError.style.display = "block";

      } else if (response.status === 200) {
        emailAndPasswordError.style.display = "none";

        const responseBody = await response.json();
        const token = responseBody.token;
    
        localStorage.setItem("authToken", token);

        window.location.href = "/home";
      }
    } catch (e) {
      alert("Tivemos um problema. Volte mais tarde. :(");
    }
  });
