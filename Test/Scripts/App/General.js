
let urlAPI = "https://localhost:44310/";


function setError(mensaje) {
    Swal.fire({
        icon: "error",
        text: mensaje
    });
}

function setAdvertencia(mensaje) {
    Swal.fire({
        icon: "warning",
        text: mensaje
    });
}

function setExito(mensaje) {
    Swal.fire({
        icon: "success",
        text: mensaje
    });
}


function ToFecha(cadenaFecha) {
    var fecha = new Date(cadenaFecha);

    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Meses en JavaScript van de 0 a 11, por lo que sumamos 1
    var anio = fecha.getFullYear();
    // Formatear la fecha como 'dd/MM/yyyy'
    var fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;
    return fechaFormateada;
}

function toFechaInput(inputFecha) {
    inputFecha = ToFecha(inputFecha);
    var partesFecha = inputFecha.split('/');
    var fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
    var formatoInputDate = fecha.toISOString().split('T')[0];
    return formatoInputDate;
}

function toDecimal(numero) {
    return numero.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/\./g, 'X').replace(/,/g, '.').replace(/X/g, ',');
}

function validarDecimal(evt) {
    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;
    var text = evt.target.value;    
    if (code == 8 || code == 46) { // backspace and Point.
        if (text.includes("."))
            return false;
        else
            return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}

function validarEntero(evt) {
    var code = (evt.which) ? evt.which : evt.keyCode;
    if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}