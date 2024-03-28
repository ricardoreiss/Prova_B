if (!localStorage.getItem('personalInformations')) window.location.href = '/signup/personalinformations'

document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  const confirmPassword = document.getElementById("confirmPassword");

  confirmPassword.title = "As senhas devem ser iguais";
  confirmPassword.pattern = password.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
});

document.getElementById("showPassword").addEventListener("change", function () {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  if (this.checked) {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
});

document
  .getElementById("credentialsForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const emailComponent = document.getElementById("email");

    const email = emailComponent.value;
    const password = document.getElementById("password").value;
    const personalInformations = localStorage.getItem("personalInformations");
    const { name, surname, telephone, gender } =
      JSON.parse(personalInformations);

    const requestBody = JSON.stringify({
      email,
      password,
      name,
      surname,
      telephone,
      gender,
    });

    try {
      console.log(requestBody);
      const response = await fetch("/model/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const emailError = document.getElementById('emailError');
      if (response.status === 422) {
        emailError.style.display = 'block';
      } else if (response.status === 200) {
        emailError.style.display = 'none';

        localStorage.setItem('personalInformations', '');
        alert("Conta criada com Sucesso! :)")

        window.location.href = "/login";
      }

    } catch (e) {
      console.log(e);
      alert("Tivemos um problema. Volte mais tarde. :(")
    }
  });
