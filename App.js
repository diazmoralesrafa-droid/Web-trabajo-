// Cargar datos guardados
let trabajadores = JSON.parse(localStorage.getItem("trabajadores")) || [];
let presencias = JSON.parse(localStorage.getItem("presencias")) || [];

// Alta de trabajadores
document.getElementById("formTrabajador").addEventListener("submit", function (e) {
    e.preventDefault();

    const trabajador = {
        dni: document.getElementById("dni").value,
        nombre: document.getElementById("nombre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value
    };

    trabajadores.push(trabajador);
    localStorage.setItem("trabajadores", JSON.stringify(trabajadores));

    alert("Trabajador dado de alta correctamente");
    this.reset();
});

// Control de presencia
document.getElementById("formPresencia").addEventListener("submit", function (e) {
    e.preventDefault();

    const presencia = {
        dni: document.getElementById("dniPresencia").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value
    };

    presencias.push(presencia);
    localStorage.setItem("presencias", JSON.stringify(presencias));

    alert("Presencia registrada");
    this.reset();
    mostrarRegistros();
});

// Mostrar registros
function mostrarRegistros() {
    const div = document.getElementById("resultados");
    div.innerHTML = "";

    presencias.forEach(p => {
        div.innerHTML += `
            <p>DNI: ${p.dni} | Fecha: ${p.fecha} | Hora: ${p.hora}</p>
        `;
    });
}

// Mostrar al cargar
mostrarRegistros();
