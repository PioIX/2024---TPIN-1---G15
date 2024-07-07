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

function dibujarCaja(container, fila, columna, letra = ""){
    const caja = document.createElement("div");
    caja.className = "box";
    caja.id = `box${fila}${columna}`;
    caja.textContent = letra;
    container.appendChild(caja);
    return caja
}

function dibujarGrid(container){
    const grid = document.createElement("div");
    grid.className = 'grid'
    for (let i = 0; i < 6; i++){
        for (let j = 0; j < 5; j++){
            dibujarCaja(grid, i, j)
        }
    }
    container.appendChild(grid)
}

function inicio(){
    const game = document.getElementById('game');
    dibujarGrid(game)
}

inicio()