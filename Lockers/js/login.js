//const loginURL = "http://127.0.0.1:8000/login";
//const loginURL = "https://mintic-banco-unal.herokuapp.com/customers/";

function validar_datos(evt) {
    evt.preventDefault();
    const userName = document.login.userName.value.trim();
    const password = document.login.password.value.trim();

    const customer = {
        userName: userName,
        password: password
    }
    const dataToSend = JSON.stringify(customer);
    sendData(dataToSend);
}

function sendData(data) {
    const user = JSON.parse(data);
    if (user.userName === "Felipe" && user.password === "admin") {
        handleSuccess(user);
    } else {
        handleError("credenciales");
    }
}

function handleSuccess(data) {
    document.querySelector("#formData").remove();
    const successMesage = document.createElement("p");
    successMesage.textContent = "Ingreso exitoso. Accediendo a su información...";
    const areaMensaje = document.getElementById("info");
    areaMensaje.appendChild(successMesage);
    
    //window.location.href = './cliente.html?id=' + data.id;
    window.location.href = './intro.html';
    sessionStorage.setItem('accessToken', data.access);
    sessionStorage.setItem('refreshToken', data.refresh);
    sessionStorage.setItem('clientId', data.id);
}

function handleError(errType) {
    const areaMensaje = document.getElementById("infoPlus");
    const child = areaMensaje.firstChild;
    if (child) areaMensaje.removeChild(child);
    const errorMesageDiv = document.createElement("div");
    const errorMesage = document.createElement("p");
    if (errType == "credenciales")
        errorMesage.textContent = "Credenciales inválidas. Revise e intente de nuevo.";
    else
        errorMesage.textContent = "No se pudo ingresar. Intente luego.";
    //const areaMensaje = document.getElementById("infoPlus");
    errorMesageDiv.appendChild(errorMesage);
    areaMensaje.appendChild(errorMesageDiv);
}

// --------------------
document.login.addEventListener('submit', validar_datos);