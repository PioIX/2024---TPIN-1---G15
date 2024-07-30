function changeScreen(){
    let login = document.getElementById("login");
    let gameSec = document.getElementById("gameSec");
    if (login.style.display !== "none"){
        login.style.display = "none"
        gameSec.style.display = ""
        
    } else {
        login.style.display = ""
        gameSec.style.display = "none"
    }
}

function changeScreenAdmin(){
    let login = document.getElementById("login");
    let adminSec = document.getElementById("adminSec");
    if (login.style.display !== "none"){
        login.style.display = "none"
        adminSec.style.display = ""
    } else {
        login.style.display = ""
        adminSec.style.display = "none"
    }
}

function changeWinner(){
    let tablaPuntos = document.getElementById("pointsSec");
    let gameSec = document.getElementById("gameSec");
    if (tablaPuntos.style.display !== "none"){
        tablaPuntos.style.display = "none"
        gameSec.style.display = ""
    } else {
        tablaPuntos.style.display = ""
        gameSec.style.display = "none"
    }
}