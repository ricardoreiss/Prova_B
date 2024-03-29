async function getDatas() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`/model/datas?token=${token}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const userDatas = await response.json();
      return userDatas;
    } else window.location.href = "/login";
  } catch (e) {
    alert("Tivemos um problema. Volte mais tarde. :(");
  }
}

getDatas();

async function changeDatasView() {
  const userDatas = await getDatas();
  const showDatasComponent = document.getElementById("showDatas");
  const showType = document.getElementById("showType").value;

  if (showType === "Tabela") {
    showDatasComponent.innerHTML = `
            <table border="1">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Telefone</th>
                    <th>Gênero</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>${userDatas.email}</td>
                    <td>${userDatas.name}</td>
                    <td>${userDatas.surname}</td>
                    <td>${userDatas.telephone}</td>
                    <td>${userDatas.gender}</td>
                </tr>
                <tr>
                </tbody>
            </table>
        `;
  } else if (showType === "Lista") {
    showDatasComponent.innerHTML = `
            <ul>
                <li><b>Email:</b> ${userDatas.email}</li>
                <li><b>Nome:</b> ${userDatas.name}</li>
                <li><b>Sobrenome:</b> ${userDatas.surname}</li>
                <li><b>Telefone:</b> ${userDatas.telephone}</li>
                <li><b>Gênero:</b> ${userDatas.gender}</li>
            </ul>
          `;
  } else if (showType === "Tópicos") {
    showDatasComponent.innerHTML = `
            <p><b>Email</b></p>
            <p>${userDatas.email}</p>
            <p><b>Nome</b></p>
            <p>${userDatas.name}</p>
            <p><b>Sobrenome</b></p>
            <p>${userDatas.surname}</p>
            <p><b>Telefone</b></p>
            <p>${userDatas.telephone}</p>
            <p><b>Gênero</b></p>
            <p>${userDatas.gender}</p>
          `;
  }
}

changeDatasView();

document.addEventListener("DOMContentLoaded", function () {
  var selectElement = document.getElementById("showType");
  selectElement.addEventListener("change", changeDatasView);
});

document
  .getElementById("toEditDatas")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/home/datas/edit";
  });

document
  .getElementById("toChangePassword")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/home/datas/changepassword";
  });

document
  .getElementById("toHome")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/home";
  });

document
  .getElementById("deleteAccount")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const confirmDelete = confirm(
      "Você tem certeza que deseja deletar sua conta?"
    );

    if (confirmDelete) {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(`/model/datas?token=${token}`, {
          method: "GET",
        });

        if (response.status === 200) {
          const response = await fetch("/model/deleteuser", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            alert("Conta Deletada.");
            localStorage.setItem("authToken", "");
            window.location.href = "/login";
          }
        } else window.location.href = "/login";
      } catch (e) {
        alert("Tivemos um problema. Volte mais tarde :(");
      }
    }
  });
