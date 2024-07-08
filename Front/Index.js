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
    if (document.getElementById("nuevaPalabra").value != ""){
        const data = {
            word : document.getElementById("nuevaPalabra").value,
        }
        const response = await fetch('http://localhost:3000/insertarPiloto',{
            method:"POST",
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
    console.log(typeof document.getElementById("numero").value)
}

async function deletePiloto(){
    if (document.getElementById("id").value != ""){
        const data = {
            piloto_ID : document.getElementById("id").value,
        }
    
        //Envio un pedido POST con un JSON en el body
        const response = await fetch('http://localhost:3000/borrarPiloto',{
            method:"DELETE",
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