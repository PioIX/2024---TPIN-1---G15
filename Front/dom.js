function changeScreen(){
    let login = document.getElementById("login")
    let register = document.getElementById("register")
    if (login.style.display !== "none"){
        login.style.display = "none"
    } else {
        login.style.display = ""
    }
}