var num = 1;

function modoOscuro() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    if (num == 1){
        document.getElementById("logo").src="sol2.png";
        num = 2
    } else {
        document.getElementById("logo").src="luna2.png";
        num = 1
    }
}