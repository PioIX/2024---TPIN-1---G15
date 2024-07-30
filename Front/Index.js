let usedWords = []
let activeWord = ""
let dictionary = []

async function llamadoAlBackend() {
    document.getElementById("table").innerHTML = ``
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:3000/obtenerPalabras',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()

    document.getElementById("table").innerHTML += `
    <tr>
        <th>Palabra</th>
        <th>ID</th>
    </tr>`

    for (i in result){
        document.getElementById("table").innerHTML += `
        <tr>
            <td>${result[i].word}</td>
            <td>${result[i].wordid}</td>
        </tr>
        `
    }
}

async function agregarPalabra() {
    let nuevaPalabra = document.getElementById("nuevaPalabra").value
    if (nuevaPalabra != ""){
        if (nuevaPalabra.length === 5){
            const data = {
                word : nuevaPalabra.toUpperCase()
            }
            const response = await fetch('http://localhost:3000/agregarPalabra',{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify(data)
            })
            const result = await response.json()
            alert(result.message)
            llamadoAlBackend()
        } else {
            alert('La palabra debe tener solo 5 letras')
        }
    } else {
        alert("Completar la información")
    }
    console.log(typeof document.getElementById("numero").value)
}

async function deleteWords(){
    let deleteWord = document.getElementById("eliminarPalabra").value
    if (deleteWord != ""){
        const data = {
            word : deleteWord.toUpperCase(),
        }
        //Envio un pedido POST con un JSON en el body
        const response = await fetch('http://localhost:3000/borrarPalabra',{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify(data)
        })
        const result = await response.json()
        if(result.value === 1){
            alert(result.message)
            llamadoAlBackend()
        } else {
            alert('Ocurrio un error en el momento de borrar la palabra')
        }
    } else {
        alert("Completar la información")
    }
}

async function actualizarPalabra() {
    let updateWord = document.getElementById("palabraActulizada").value
    let wordId = document.getElementById("idPalabra").value
    if (updateWord != "" && wordId  !=  ""){
        if (updateWord.length === 5){
            const data = {
                word : updateWord.toUpperCase(),
                wordId : Number(wordId)
            }
            const response = await fetch('http://localhost:3000/actualizarPalabra',{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                  },
                body:JSON.stringify(data)
            })
            const result = await response.json()
            if(result.value === 1){
                alert(result.message)
                llamadoAlBackend()
            } else if(result.value === -1){
                alert(result.message)
                llamadoAlBackend()
            } else {
                alert('Hubo un error en el momento de actualizar la palabra')
            }
        } else {
            alert('La palabra debe tener solo 5 letras')
        }
    } else {
        alert("Completar la información")
    }
    console.log(typeof document.getElementById("numero").value)
}

async function obtenerPalabras() {
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:3000/obtenerPalabras',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()
    let word = result[Math.floor(Math.random() * 86)].word
    let esta = 'no'
    if (usedWords != undefined || usedWords.length != 0) {
        for (let i in usedWords){
            if (word === usedWords[i]){
                esta = 'si'
            }
            i++
        }
        while (esta === 'si'){
            word = result[Math.floor(Math.random() * 86)].word
            let i = 0
            while (i < usedWords.length && word != usedWords[i]){
                i++
            }
            if (usedWords[i] !== word){
                esta = 'no'
            }
        }
        activeWord = word
        usedWords.push(word)
    } else {
        activeWord = word
        usedWords.push(word)
    }
}

function isWordValid(word) {
    if (word != ""){
        if (word.length === 5){
            word = word.toUpperCase()
            let i = 0
            while (i < dictionary.length && dictionary[i] != word){
                i++
            }
            if(dictionary[i] == word){
                return true
            } else {
                return false
            }
        } else {
            alert('La palabra debe tener solo 5 letras')
            return false
        }
    } else {
        alert("Completar la información")
        return false
    }
}


async function agregarDiccionario(){
    const response = await fetch('http://localhost:3000/obtenerPalabras',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          }
    })
    const result = await response.json()
    for (x in result){
        dictionary.push(result[x].word)
    }
}

async function obtenerPuntajes() {
    document.getElementById("tablePuntos").innerHTML = ``
    //Llamo a un pedido Get del servidor
    const response = await fetch('http://localhost:3000/obtenerPuntajes',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()

    document.getElementById("tablePuntos").innerHTML += `
    <tr>
        <th>Username</th>
        <th>Puntos</th>
    </tr>`

    for (i in result){
        document.getElementById("tablePuntos").innerHTML += `
        <tr>
            <td>${result[i].username}</td>
            <td>${result[i].points}</td>
        </tr>
        `
    }
}

async function agregarHighScore(puntos, userid) {
    const data = {
        points : puntos,
        userid: userid
    }
    const response = await fetch('http://localhost:3000/agregarPalabra',{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            },
        body:JSON.stringify(data)
    })
    const result = await response.json()
}