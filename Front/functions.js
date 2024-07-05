async function login() {
    if (document.getElementById("loginusername").value != "" && document.getElementById("loginpassword").value != ""){
        //Armo un objeto para mandarlo como formato JSON
        const data = {
            user : document.getElementById("loginusername").value,
            password : document.getElementById("loginpassword").value
        }
        //Envio un pedido POST con un JSON en el body
        const response = await fetch('http://localhost:3000/obtenerUsuario',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify(data)
        })
        const result = await response.json()
        if (result.value === 1){
            alert("Login correcto")
            modoJuego()
            changeScreen()
        } else if (result.value === -1){
            alert(result.message)
        } else {
            alert("Ocurrio un error")
        }
    } else {
        alert("Completar la información")
    }
}

async function register() {
    if (document.getElementById("loginusername").value != "" && document.getElementById("loginpassword").value != ""){
        const data = {
            user : document.getElementById("loginusername").value,
            password : document.getElementById("loginpassword").value
        }
        const response = await fetch('http://localhost:3000/registrarUsuario',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const result = await response.json()
        if (result.value === 1){
            alert("Registro correcto")
            modoJuego()
            changeScreen()
        } else if (result.value === -1){
            alert(result.message)
        } else {
            alert("Ocurrio un error")
        }
    } else {
        alert("Completar la información")
    }
}

var num = 1;

function modoJuego() {
    var element = document.body;
    element.classList.toggle("game-mode");
    if (num == 1){
        num = 2
    } else {
        num = 1
    }
}