// Seleciona elementos HTML para exibir o dia da semana, data atual e hora atual
const diaSemana = document.getElementById("dia-semana");
const dataAtual = document.getElementById("data-atual");
const horaAtual = document.getElementById("hora-atual");
const btnRegistrarPonto = document.getElementById("btn-registrar-ponto");

// Adiciona um ouvinte de eventos para o botão de registro de ponto
btnRegistrarPonto.addEventListener("click", register);

// Define o conteúdo de texto para o dia da semana e a data atual
diaSemana.textContent = getWeekDay();
dataAtual.textContent = getCurrentDate();

// Seleciona o diálogo de ponto
const dialogPonto = document.getElementById("dialog-ponto");

// Preenche o diálogo com a data e hora atual
const dialogData = document.getElementById("dialog-data");
dialogData.textContent = "Data: " + getCurrentDate();

const dialogHora = document.getElementById("dialog-hora");

// Adiciona ouvintes de evento para os botões de registrar entrada e saída
const btnDialogEntrada = document.getElementById("btn-dialog-entrada");
btnDialogEntrada.addEventListener("click", async () => {
    let register = await getObjectRegister("entrada")
    saveRegisterLocalStorage(register);
});

const btnDialogIntervalo = document.getElementById("btn-dialog-intervalo");
btnDialogIntervalo.addEventListener("click", async () => {
    let register = await getObjectRegister("intervalo")
    saveRegisterLocalStorage(register);
});

const btnDialogVoltaIntervalo = document.getElementById("btn-dialog-volta-intervalo");
btnDialogVoltaIntervalo.addEventListener("click", async () => {
    let register = await getObjectRegister("volta intervalo")
    saveRegisterLocalStorage(register);
});

const btnDialogSaida = document.getElementById("btn-dialog-saida");
btnDialogSaida.addEventListener("click", async () => {
    let register = await getObjectRegister("saida")
    saveRegisterLocalStorage(register);
});

// Função que abre o diálogo para registrar ponto
function register() {
    const dialogUltimoRegistro = document.getElementById("dialog-ultimo-registro");
    let lastRegister = JSON.parse(localStorage.getItem("lastRegister"));

    if (lastRegister) {
        let lastDateRegister = lastRegister.date;
        let lastTimeRegister = lastRegister.time;
        let lastRegisterType = lastRegister.type;
        dialogUltimoRegistro.textContent = "Último Registro: " + lastDateRegister + " | " + lastTimeRegister + " | " + lastRegisterType;
    }

    dialogHora.textContent = "Hora: " + getCurrentTime();
    const interval = setInterval(() => {
        dialogHora.textContent = "Hora: " + getCurrentTime();
    }, 1000);

    dialogPonto.showModal();
}

// Adiciona um ouvinte de evento para fechar o diálogo de ponto
const btnDialogFechar = document.getElementById("dialog-fechar");
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

// Função que cria e retorna um objeto de registro de ponto (entrada ou saída), com data, hora, localização, ID e tipo de registro
async function getObjectRegister(registerType) {
    const location = await getUserLocation();
    return {
        "date": getCurrentDate(),
        "time": getCurrentTime(),
        "location": location,
        "id": 1,
        "type": registerType
    };
}

// Função para salvar um registro de ponto no localStorage
let registersLocalStorage = getRegisterLocalStorage("register");

function saveRegisterLocalStorage(register) {
    registersLocalStorage.push(register);
    localStorage.setItem("register", JSON.stringify(registersLocalStorage));
    localStorage.setItem("lastRegister", JSON.stringify(register));
    showSuccessMessage();
    dialogPonto.close();
}

// Função para mostrar mensagem de sucesso após o registro de ponto
function showSuccessMessage() {
    const alertaSucesso = document.getElementById("alerta-ponto-registrado");
    alertaSucesso.classList.remove("hidden");
    alertaSucesso.classList.add("show");
    setTimeout(() => {
        alertaSucesso.classList.remove("show");
        alertaSucesso.classList.add("hidden");
    }, 5000);
}

// Função para recuperar os registros do localStorage
function getRegisterLocalStorage(key) {
    let registers = localStorage.getItem(key);
    return registers ? JSON.parse(registers) : [];
}

// Função que tenta obter a localização do usuário usando a API de geolocalização
function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let userLocation = {
                "latitude": position.coords.latitude,
                "longitude": position.coords.longitude
            };
            resolve(userLocation);
        }, (error) => {
            reject("Erro " + error);
        });
    });
}

// Função que retorna a hora atual no formato hh:mm:ss
function getCurrentTime() {
    const date = new Date();
    return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0') + ":" + String(date.getSeconds()).padStart(2, '0');
}

// Função que retorna a data atual no formato dd/mm/aaaa
function getCurrentDate() {
    const date = new Date();
    let mes = date.getMonth() + 1;
    return String(date.getDate()).padStart(2, '0') + "/" + String(mes).padStart(2, '0') + "/" + String(date.getFullYear()).padStart(4, '0');
}

// Função que retorna o nome do dia da semana
function getWeekDay() {
    const date = new Date();
    const day = date.getDay();
    const daynames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daynames[day];
}

// Atualiza a hora no campo de hora atual a cada segundo
function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
}
updateContentHour();
setInterval(updateContentHour, 1000);

// Controle de volume
const audio = document.getElementById('audio-player');
const volumeControl = document.getElementById('volume-control');

volumeControl.addEventListener('input', function() {
    audio.volume = this.value;
});

// Inicia o áudio após interação do usuário
document.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
    }
});

// Slider color
const slider = document.querySelector('input[type="range"]');
slider.addEventListener('input', function() {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    this.style.setProperty('--percent', `${value}%`);
});
