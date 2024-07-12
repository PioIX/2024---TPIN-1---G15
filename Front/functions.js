async function login() {
    let username = document.getElementById("loginusername").value
    let password = document.getElementById("loginpassword").value
    if (username != "" && password != ""){
        //Armo un objeto para mandarlo como formato JSON
        const data = {
            user : username,
            password : password
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
            if (data.user === "admin" && data.password === "admin"){
                changeScreenAdmin()
            } else {
                changeScreen()
            }
            document.getElementById("loginusername").value = ""
            document.getElementById("loginpassword").value = ""
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
    let username = document.getElementById("loginusername").value
    let password = document.getElementById("loginpassword").value
    if (username != "" && password != ""){
        const data = {
            user : username,
            password : password
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
            document.getElementById("loginusername").value = ""
            document.getElementById("loginpassword").value = ""
        } else if (result.value === -1){
            alert(result.message)
        } else {
            alert("Ocurrio un error")
        }
    } else {
        alert("Completar la información")
    }
}

const estado =  {
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};

function actualizarGrid(){
    for (let i = 0; i < estado.grid.length; i++){
        for (let j = 0; j < estado.grid[i].length; j++){
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = estado.grid[i][j];
        }
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

function registerKeybordEvents(){
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key === 'Enter'){
            if (estado.currentCol === 5){
                const word = getCurrentWord();
                if (isWordValid(word)){
                    revealWord(word)
                    estado.currentRow++;
                    estado.currentCol = 0
                } else {
                    alert('La palabra no es valida')
                }
            }
        }
        if (key === 'Backspace'){
            removeLetter()
        }
        if (isLetter(key)){
            addLetter(key)
        }
        actualizarGrid();
    }
}

function getCurrentWord(){
    return estado.grid[estado.currentRow].reduce((prev, curr) => prev + curr)
}

function inicio(){
    const game = document.getElementById('game');
    dibujarGrid(game)
    registerKeybordEvents();
}

inicio()

function revealWord(guess) {
    const row = state.currentRow;
    const animation_duration = 500; // ms
  
    for (let i = 0; i < 5; i++) {
      const box = document.getElementById(`box${row}${i}`);
      const letter = box.textContent;
      const numOfOccurrencesSecret = getNumOfOccurrencesInWord(
        state.secret,
        letter
      );
      const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, letter);
      const letterPosition = getPositionOfOccurrence(guess, letter, i);
  
      setTimeout(() => {
        if (
          numOfOccurrencesGuess > numOfOccurrencesSecret &&
          letterPosition > numOfOccurrencesSecret
        ) {
          box.classList.add('empty');
        } else {
          if (letter === state.secret[i]) {
            box.classList.add('right');
          } else if (state.secret.includes(letter)) {
            box.classList.add('wrong');
          } else {
            box.classList.add('empty');
          }
        }
      }, ((i + 1) * animation_duration) / 2);
  
      box.classList.add('animated');
      box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
    }
  
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 5;
  
    setTimeout(() => {
      if (isWinner) {
        alert('Felicidades!');
      } else if (isGameOver) {
        alert(`Mejor suerte para la próxima! La palabra era ${state.secret}.`);
      }
    }, 3 * animation_duration);
}

revealWord(guess)

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

  
function addLetter(letter) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}
  
function removeLetter() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}
  
function startup() {
    const game = document.getElementById('game');
    drawGrid(game);
  
    registerKeyboardEvents();
}
  
startup();