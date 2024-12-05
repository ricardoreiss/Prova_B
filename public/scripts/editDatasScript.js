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

      const name = document.getElementById("name");
      const surname = document.getElementById("surname");
      const telephone = document.getElementById("telephone");
      const gender = document.getElementById("gender");

      name.value = userDatas.name;
      surname.value = userDatas.surname;
      telephone.value = userDatas.telephone;
      gender.value = userDatas.gender;
    } else window.location.href = "/login";
  } catch (e) {
    alert("Tivemos um problema. Volte mais tarde. :(");
  }
}

getDatas();

document
  .getElementById("telephone")
  .addEventListener("input", function (event) {
    const target = event.target;

    target.value = target.value.replace(/\D/g, "");
    target.value = target.value.replace(/^(\d{2})(\d)/g, "($1) $2");
    target.value = target.value.replace(/(\d)(\d{4})$/, "$1-$2");
  });

document
  .getElementById("cancelButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/home/datas";
  });

document
  .getElementById("editDatasForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const confirmSave = confirm("Salvar Modificações?");

    if (confirmSave) {
      const token = localStorage.getItem("authToken");

      try {
        const requestBody = JSON.stringify({
          name: document.getElementById("name").value,
          surname: document.getElementById("surname").value,
          telephone: document.getElementById("telephone").value,
          gender: document.getElementById("gender").value,
        });

        const response = await fetch("/model/editdatas", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: requestBody,
        });

        if (response.status === 200) {
          alert("Dados Modificados.");

          window.location.href = "/home/datas";
        } else window.location.href = "/login";
      } catch (e) {
        alert("Tivemos um problema. Volte mais tarde :(");
      }
    }
  });
