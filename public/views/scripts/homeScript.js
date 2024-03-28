async function getDatas() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(`/model/datas?token=${token}`, {
      method: "GET",
    });

    if (response.status === 200) {
      const userDatas = await response.json();

      const userNameComponent = document.getElementById("userName");
      userNameComponent.textContent = userDatas.name;
    } else window.location.href = "/login";
  } catch (e) {
    console.log(e);
    alert("Tivemos um problema. Volte mais tarde. :(");
  }
}

getDatas();

document
  .getElementById("signOutButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("authToken", "");
    window.location.href = "/login";
  });

document
  .getElementById("toDatas")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "home/datas";
  });
