//Obtener elementos del DOM/HTML

const ciudadInput = document.getElementById("ciudad");

const obtenerPronosticoBtn =document.getElementById("obtenerPronostico");

const pronosticoDiv = document.getElementById("pronostico");

obtenerPronosticoBtn.addEventListener('click', obtenerPronostico);

function obtenerPronostico(){
    const ciudad = ciudadInput.value.trim();
    if (ciudad===""){
        mostrarError("Ingresa una ciudad >:(");
        return
    }
//La API Key va acá
    const apiKey = "bbf272ea2249a21d202f5b45fe777178";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //Una solicitud HTTP utilizando fetch con la url construida

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            mostrarPronostico(data);
        })
        .catch(error=>{
            mostrarError("No funca :(")
        });

        function mostrarPronostico(data){
            const {name, main, weather} = data;
            const temperatura = main.temp;
            const sensacion = main.feels_like;
            const humedad = main.humidity;
            const descripcion = weather[0].description;
            const pronosticoHTML =  `
                <div class = "card">
                    <div class= "card-body">
                        <h2 class="card-title">
                        ${name}
                        <p class = "card-text"> Temperatura: 
                        ${temperatura}
                        </p>
                        <p class = "card-text"> Sensación térmica: 
                        ${sensacion}
                        </p>
                        <p class = "card-text"> Humedad: 
                        ${humedad}%
                        </p>
                        <p class = "card-text"> Descripción: 
                        ${descripcion}
                        </p>
                        </h2>
                    </div>
                </div>
            `;
            //Insertar en js dentro de HTML

            pronosticoDiv.innerHTML = pronosticoHTML;
            console.log(data);

        }

        function mostrarError(mensaje){
            const errorHTML =` 
            <div class = "alert alert-danger" role= "alert">
            ${mensaje}
            </div>
            `;

            pronosticoDiv.innerHTML = errorHTML;
        }

}