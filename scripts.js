// JSON de ejemplo
let datos = [];

// Cargar datos desde localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const datosGuardados = localStorage.getItem('datos');
    if (datosGuardados) {
        datos = JSON.parse(datosGuardados); // Convertir a JSON
        mostrarDatos(); // Mostrar los datos al cargar la página
    }
});

// Guardar datos en localStorage cada vez que se agregue o elimine un dato
function guardarEnLocalStorage() {
    localStorage.setItem('datos', JSON.stringify(datos)); // Guardar como string
}

// Función para formatear los números como moneda
function formatearMoneda(valor) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(valor);
}

// Función para mostrar los datos del JSON
function mostrarDatos() {
    const lista = document.getElementById('lista');
    lista.innerHTML = ''; // Limpiar lista
    datos.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `ID: ${item.id}, Nombre: ${item.nombre}, Precio: ${formatearMoneda(item.precio)}`;
        const btn = document.createElement('button'); 
		btn.textContent = 'Borrar';
        btn.style.marginLeft = '10px';
		btn.addEventListener('click', () => borrarDato(item.id));
        li.appendChild(btn);
        lista.appendChild(li);
    });
	suma();
}
// Función para agregar un nuevo elemento al JSON
/*function borrarDato(id) {
		// Filtrar el arreglo para eliminar el elemento con el ID correspondiente
		datos = datos.filter(item => item.id !== id);
		mostrarDatos();
}*/
// Actualizar la función borrarDato para guardar al eliminar
function borrarDato(id) {
    const index = datos.findIndex(item => item.id === id);
    if (index !== -1) {
        datos.splice(index, 1);
    }
    
    mostrarDatos();
    guardarEnLocalStorage(); // Guardar los datos actualizados
}

// Función para agregar un nuevo elemento al JSON
function agregarDato() {
    const inputNombre = document.getElementById('inputNombre').value;
    const inputPrecio = parseFloat(document.getElementById('inputPrecio').value);

    if (inputNombre && !isNaN(inputPrecio)) {
        // Crear un nuevo objeto con un ID único
        const nuevoElemento = {
            id: datos.length + 1,
            nombre: inputNombre,
            precio: inputPrecio
        };
        
        // Agregar el nuevo elemento al JSON
        datos.push(nuevoElemento);

        // Limpiar los campos de entrada
        document.getElementById('inputNombre').value = '';
        document.getElementById('inputPrecio').value = '';
        
        // Mostrar los datos actualizados
        mostrarDatos();
        // Guardar en localStorage
        guardarEnLocalStorage();
    } else {
        alert('Por favor ingresa un nombre válido y un precio numérico.');
    }
}

function suma(){
	const total = document.getElementById('total');
    total.innerHTML = ''; 
	var monto = 0;
	for (var i = 0; i < datos.length; i++) {
        var obj = datos[i];
        monto = monto + obj.precio; 
    }
	total.innerHTML = formatearMoneda(monto);
}

// Event listeners para los botones
//document.getElementById('mostrarDatos').addEventListener('click', mostrarDatos);
document.getElementById('agregarDato').addEventListener('click', agregarDato);
