// Seleciona elementos HTML para exibir o dia da semana, data atual e hora atual
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

// Adiciona um ouvinte de eventos para o botão de registro de ponto, que chama a função register() ao ser clicado
btnRegistrarPonto.addEventListener("click", register);

// Define o conteúdo de texto para o dia da semana e a data atual
diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

// Seleciona o diálogo de ponto
const dialogPonto = document.getElementById("dialog-ponto");

// Preenche o diálogo com a data e hora atual
const dialogData = document.getElementById("dialog-data");
dialogData.textContent = getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");
dialogHora.textContent = getCurrentTime();

// Adiciona ouvintes de evento para os botões de registrar entrada e saída, chamando funções que salvam esses registros no localStorage
const btnDialogEntrada = document.getElementById("btn-dialog-entrada");
btnDialogEntrada.addEventListener("click", () => {
    saveRegisterLocalStorage(getObjectRegister("entrada"));
});

const btnDialogSaida = document.getElementById("btn-dialog-saida");
btnDialogSaida.addEventListener("click", () => {
    saveRegisterLocalStorage(getObjectRegister("saida"));
});

// Função que cria e retorna um objeto de registro de ponto (entrada ou saída), com data, hora, localização, ID e tipo de registro
function getObjectRegister(registerType) {
    ponto = {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": getUserLocation(), // Chama uma função para obter a localização do usuário
        "id": 1,
        "type": registerType // Pode ser "entrada" ou "saída"
    }
    return ponto;
}

// Adiciona um ouvinte de evento para fechar o diálogo de ponto ao clicar no botão de fechar
const btnDialogFechar = document.getElementById("dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// Carrega os registros salvos no localStorage (se houver)
let registersLocalStorage = getRegisterLocalStorage("register");

// Função para salvar um registro de ponto no localStorage. Primeiro converte o array de objetos para uma string JSON
// TO-DO: Resolver o problema onde os índices do array estão sendo salvos como strings em vez de objetos
function saveRegisterLocalStorage(register) {
    registersLocalStorage.push(register); // Adiciona o novo registro ao array
    localStorage.setItem("register", JSON.stringify(registersLocalStorage)); // Salva no localStorage
}

// Função para recuperar os registros do localStorage
function getRegisterLocalStorage(key) {
    let registers = localStorage.getItem(key); // Obtém o valor da chave do localStorage

    if(!registers) {
        return []; // Se não houver registros, retorna um array vazio
    }

    return JSON.parse(registers); // Converte a string JSON de volta para um array de objetos
}

// Função que tenta obter a localização do usuário usando a API de geolocalização do navegador
function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {   
        let userLocation = {
            "lat": position.coords.latitude, // Obtém a latitude
            "long": position.coords.longitude // Obtém a longitude
        }
        return userLocation; // Retorna a localização do usuário
    });
}

// O código comentado aqui sugere maneiras de garantir que uma função assíncrona seja processada corretamente

// Como garantir que uma função assíncrona já foi executada/processada?
// Possíveis soluções

// functiongetUserLocation(functionCallback) {
//     navigator.geolocation.getCurrentPosition((position) => {
//         userLocation = {
//             OBJETO com lat e long
//         }
//         functionCallback(userLocation)
//     })
//}

// OU

//getUserLocation() {
//     return new Promise((suc, fail) => {
//         navigator.geolocation.getCurrentPosition()
//     })
//}

// Função que abre o diálogo para registrar ponto
function register() {
    dialogPonto.showModal();
}

// Função para atualizar o conteúdo do campo de hora com a hora atual
function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}

// Função que retorna a hora atual no formato hh:mm:ss
function getCurrentTime() {
    const date = new Date(); // Cria um objeto Date
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

// Função que retorna a data atual no formato dd/mm/aaaa
function getCurrentDate() {
    const date = new Date(); 
    let mes = date.getMonth() + 1; // Os meses em JavaScript vão de 0 a 11, por isso é necessário adicionar 1
    return String(date.getDate()).padStart(2, '0') + "/" + String(mes).padStart(2, '0') + "/" +  String(date.getFullYear()).padStart(2, '0');
}

// Função que retorna o nome do dia da semana (Domingo a Sábado) baseado no dia atual
function getWeekDay() {
    const date = new Date()
    const day = date.getDay() // Obtém o dia da semana (0 = Domingo, 1 = Segunda, etc.)
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daynames[day]
}
// Controle de volume
var audio = document.getElementById('audio-player');
var volumeControl = document.getElementById('volume-control');

// Atualiza o volume com base no controle
volumeControl.addEventListener('input', function() {
       audio.volume = this.value;
       });

// Inicia o áudio após interação do usuário
document.addEventListener('click', function() {
    var audio = document.getElementById('audio-player');
    if (audio.paused) {
        audio.play();
    }
});

// Atualiza a hora no campo a cada segundo
updateContentHour();
setInterval(updateContentHour, 1000);

// Exibe no console a hora, data e dia da semana atual para teste
console.log(getCurrentTime());
console.log(getCurrentDate());
console.log(getWeekDay());



// slider color
const slider = document.querySelector('input[type="range"]');
slider.addEventListener('input', function() {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.setProperty('--percent', `${value}%`);
});