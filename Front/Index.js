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

async function updatePiloto(){
    if (document.getElementById("id").value != "" && document.getElementById("numero").value != ""){
        const data = {
            numero: document.getElementById("numero").value,
            piloto_ID : document.getElementById("id").value
        }
    
        //Envio un pedido POST con un JSON en el body
        const response = await fetch('http://localhost:3000/actualizarPiloto',{
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