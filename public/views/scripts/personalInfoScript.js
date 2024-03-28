
  
document.getElementById('telephone').addEventListener('input', function (event) {
    const target = event.target;

    target.value = target.value.replace(/\D/g, '');
    target.value = target.value.replace(/^(\d{2})(\d)/g, '($1) $2');
    target.value = target.value.replace(/(\d)(\d{4})$/, '$1-$2');

  });

document.getElementById("personalInfoForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const personalinformations = {
        name: document.querySelector('#name').value,
        surname: document.querySelector('#surname').value,
        telephone: document.querySelector('#telephone').value,
        gender: document.querySelector('#gender').value,
    }

    localStorage.setItem('personalInformations', JSON.stringify(personalinformations))

    window.location.href = "/signup/credentials";
});






