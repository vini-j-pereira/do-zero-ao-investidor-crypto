let count = 1;

document.getElementById("radio1").checked = true;

setInterval (function() {
    nexImage();
}, 3000)


function nexImage(){
    count++;
    if(count>4){
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;
}


// Parte de envio de email =========

document.getElementById('btnCadEnviar').addEventListener('click', async function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const data = {
        fullName,
        phone,
        email
    };

    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso! Verifique seu email para baixar o e-book.');
            // Opcional: Redirecionar para uma página de agradecimento
            // window.location.href = '/agradecimento.html';
        } else {
            const result = await response.json();
            alert('Erro no cadastro: ' + result.error);
        }
    } catch (error) {
        alert('Erro ao enviar os dados: ' + error.message);
    }
});