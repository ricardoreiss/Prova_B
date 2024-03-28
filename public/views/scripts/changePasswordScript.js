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
    console.log(e);
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

    const confirmSave = confirm(
      "Salvar Modificações?"
    );

    if (confirmSave) {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(`/model/datas?token=${token}`, {
          method: "GET",
        });

        if (response.status === 200) {
          const requestBody = JSON.stringify({currentPassword, newPassword});

          const response = await fetch("/model/editdatas", {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody)
          });

          if (response.status === 200) {
            alert("Senha Trocada.");
            window.location.href = "/home/datas";
          }
        } else window.location.href = "/login";
      } catch (e) {
        console.log(e);
        alert("Tivemos um problema. Volte mais tarde :(");
      }
    }
  });
