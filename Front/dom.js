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