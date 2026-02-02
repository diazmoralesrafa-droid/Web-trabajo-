// ================= Inicializar LocalStorage =================
if (!localStorage.getItem('trabajadores')) localStorage.setItem('trabajadores', '[]');

// ================= Función para mostrar alertas =================
function mostrarAlerta(elemento, mensaje, tipo) {
    elemento.textContent = mensaje;
    elemento.className = 'alert ' + (tipo === 'success' ? 'alert-success' : 'alert-error');
    elemento.style.display = 'block';
    setTimeout(() => { elemento.style.display = 'none'; }, 3000);
}

// ================= Registrar trabajador =================
function registrarTrabajador() {
    const dni = document.getElementById('dniTrabajador').value.trim();
    const nombre = document.getElementById('nombreTrabajador').value.trim();
    const telefono = document.getElementById('telefonoTrabajador').value.trim();
    const correo = document.getElementById('correoTrabajador').value.trim();
    const alertBox = document.getElementById('alertTrabajador');

    // Validación de campos
    if (!dni || !nombre || !telefono || !correo) {
        mostrarAlerta(alertBox, "Completa todos los campos", "error");
        return;
    }

    // Leer trabajadores existentes
    const trabajadores = JSON.parse(localStorage.getItem('trabajadores'));

    // Evitar duplicados por DNI
    if (trabajadores.some(t => t.dni === dni)) {
        mostrarAlerta(alertBox, "El trabajador con este DNI ya existe", "error");
        return;
    }

    // Agregar nuevo trabajador
    trabajadores.push({ dni, nombre, telefono, correo });
    localStorage.setItem('trabajadores', JSON.stringify(trabajadores));

    // Actualizar lista en pantalla
    mostrarTrabajadores();

    // Mensaje de éxito
    mostrarAlerta(alertBox, "Trabajador registrado con éxito", "success");

    // Limpiar campos del formulario
    document.getElementById('dniTrabajador').value = '';
    document.getElementById('nombreTrabajador').value = '';
    document.getElementById('telefonoTrabajador').value = '';
    document.getElementById('correoTrabajador').value = '';
}

// ================= Mostrar lista de trabajadores =================
function mostrarTrabajadores() {
    const lista = document.getElementById('listaTrabajadores');
    const trabajadores = JSON.parse(localStorage.getItem('trabajadores'));
    lista.innerHTML = ''; // Limpiar antes de mostrar
    trabajadores.forEach(t => {
        lista.innerHTML += `<div class="list-item">${t.dni} - ${t.nombre} - ${t.telefono} - ${t.correo}</div>`;
    });
}

// ================= Inicializar al cargar la página =================
window.onload = () => {
    mostrarTrabajadores();

    // Vincular botón solo una vez
    document.getElementById('btnRegistrarTrabajador').addEventListener('click', registrarTrabajador);
};
