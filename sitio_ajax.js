const $main = document.querySelector("main");

const obtenerHTML = (opciones) => {
    let {url, exito, fallo} = opciones;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", (e) => {
        if(xhr.readyState !== 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {
            let respuesta = xhr.responseText;
            exito(respuesta);
        } else {
            let mensaje = xhr.statusText || 'Oops! hubo un error!';
            fallo(`Error ${xhr.status}: ${mensaje}`);
        };
    });
    xhr.open("GET", url);
    xhr.setRequestHeader("Content-Type", "text/html; charset=utf-8");
    xhr.send();
};

document.addEventListener("DOMContentLoaded", (e) => {
    obtenerHTML({
            url: "secciones/inicio.html",
            exito: respuesta => $main.innerHTML = respuesta,
            fallo: error => $main.innerHTML = `<p><b>${error}</b></p>`
    });

    const incluirHTML = (seccion, url) => {
        obtenerHTML({
            url: url,
            exito: respuesta => seccion.outerHTML = respuesta,
            fallo: error => seccion.outerHTML = `<p><b>${error}</b></p>`
        });
    };

    document.querySelectorAll("[data-incluir]")
    .forEach(seccion => incluirHTML(seccion, seccion.getAttribute("data-incluir")));
});

document.addEventListener("click", (e) => {
    if(e.target.matches(".menu a")) {
        e.preventDefault();
        obtenerHTML({
            url: e.target.href,
            exito: respuesta => $main.innerHTML = respuesta,
            fallo: error => $main.innerHTML = `<p><b>${error}</b></p>`
        });
    };
})