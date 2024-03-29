async function getDatas() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`/model/datas?token=${token}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const userDatas = await response.json();

      const userEmailComponent = document.getElementById("userEmail");
      userEmailComponent.textContent = userDatas.email;
    } else window.location.href = "/login";
  } catch (e) {
    alert("Tivemos um problema. Volte mais tarde. :(");
  }
}

getDatas();

document.getElementById("newPassword").addEventListener("input", function () {
  const password = this.value;
  const confirmPassword = document.getElementById("confirmNewPassword");

  confirmPassword.title = "Devem ser iguail a Nova Senha";
  confirmPassword.pattern = password.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
});

document.getElementById("showPassword").addEventListener("change", function () {
  const currentPassword = document.getElementById("currentPassword");
  const newPassword = document.getElementById("newPassword");
  const confirmNewPassword = document.getElementById("confirmNewPassword");
  if (this.checked) {
    currentPassword.type = "text";
    newPassword.type = "text";
    confirmNewPassword.type = "text";
  } else {
    currentPassword.type = "password";
    newPassword.type = "password";
    confirmNewPassword.type = "password";
  }
});

document
  .getElementById("cancelButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/home/datas";
  });

document
  .getElementById("changePasswordForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;

    const confirmSave = confirm("Salvar Modificações?");

    if (confirmSave) {
      const token = localStorage.getItem("authToken");

      try {
        const requestBody = JSON.stringify({ currentPassword, newPassword });

        const response = await fetch("/model/editdatas", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBody,
        });

        const passwordError = document.getElementById("passwordError");
        if (response.status === 200) {
          passwordError.style.display = "none";

          alert("Senha Trocada.");
          const responseBody = await response.json();
          const token = responseBody.token;

          localStorage.setItem("authToken", token);

          window.location.href = "/home/datas";
        } else if (response.status === 401) {
          passwordError.style.display = "block";
        } else window.location.href = "/login";
      } catch (e) {
        alert("Tivemos um problema. Volte mais tarde :(");
      }
    }
  });
