
let ddCliente = $("#ddCliente"),
    tbodyPrestamos = $("#tbodyPrestamos"),
    btnNuevo = $("#btnNuevo"),
    modalPrestamo = $("#modalPrestamo"),
    ddTipoPrestamo = $("#ddTipoPrestamo"),
    txtFechaInicio = $("#txtFechaInicio"),
    txtFechaFin = $("#txtFechaFin"),
    ddMoneda = $("#ddMoneda"),
    txtMontoSolicitado = $("#txtMontoSolicitado"),
    txtMontoAprobado = $("#txtMontoAprobado"),
    txtPlazoFinanciamiento = $("#txtPlazoFinanciamiento"),
    ddEstado = $("#ddEstado"),
    formPrestamo = $("#formPrestamo");


btnNuevo.on("click", function () {
    modalPrestamo.modal("show");
})

ddCliente.on('change', function (e) {
    let seleccion = ddCliente.val();
    ObtenerPrestamos(seleccion);
})

formPrestamo.submit(function (e) {
    e.preventDefault();
    AgregarPrestamo();
})

function AgregarPrestamo() {
    let requestData = {
        tipoPrestamo: {
            idTipoPrestamo: ddTipoPrestamo.val()
        },
        cliente: {
            idCliente: ddCliente.val()
        },
        fechaInicio: txtFechaInicio.val(),
        fechaFin: txtFechaFin.val(),
        montoSolicitado: txtMontoSolicitado.val().trim(),
        moneda: {
            idMoneda: ddMoneda.val()
        },
        montoAprobado: txtMontoAprobado.val(),
        plazoFinanciamiento: txtPlazoFinanciamiento.val().trim()
    }

    fetch(urlAPI + 'prestamo/insertarPrestamo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Prestamo agregado");
                modalPrestamo.modal("hide");
                formPrestamo[0].reset();
                ObtenerPrestamos();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}


ObtenerClientes();
function ObtenerClientes() {
    fetch(urlAPI + "/cliente/obtenerClientes")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    if (res.dato.length > 0) {
                        let html = "";
                        res.dato.map((v, i) => {
                            html += `
                                <option ${i == 0 ? 'selected': ''} value="${v.idCliente}">(${v.numeroIdentificacion}) - ${v.primerNombre} ${v.segundoNombre} ${v.primerApellido} ${v.segundoApellido}</option>
                            `;
                        });
                        ddCliente.html(html);
                    } else
                        setAdvertencia("No hay clientes registrados");
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener clientes");
            }
        })
        .catch(error => {
            setError(error);
        })
}


ObtenerCatalogos();
function ObtenerCatalogos() {
    fetch(urlAPI + "/catalogos/obtenerCatalogos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    // Tipo prestamo
                    let html = "";
                    res.dato.tipoPrestamo.map((v, i) => {
                        html += `<option value="${v.idTipoPrestamo}">${v.nombre}</option>`
                    })
                    ddTipoPrestamo.html(html);
                    html = "";

                    // Moneda
                    res.dato.moneda.map((v, i) => {
                        html += `<option value="${v.idMoneda}">${v.nombre}</option>`
                    })
                    ddMoneda.html(html);
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener catalogos");
            }
        })
        .catch(error => {
            setError(error);
        })
}


function ObtenerPrestamos(c) {
    tbodyPrestamos.html("");
    fetch(urlAPI + "/prestamo/obtenerPrestamos?idCliente=" + c)
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    console.log(res.dato);
                    if (res.dato.length > 0) {
                        let html = "";
                        res.dato.map((v, i) => {
                            html += `
                                <tr>
                                    <td>${v.numeroPrestamo}</td>
                                    <td>${v.tipoPrestamo.nombre}</td>
                                    <td>${ToFecha(v.fechaInicio)}</td>
                                    <td>${ToFecha(v.fechaFin)}</td>
                                    <td>${v.moneda.nombre}</td>
                                    <td>${toDecimal(v.montoSolicitado)}</td>
                                    <td>${toDecimal(v.montoAprobado)}</td>
                                    <td>${v.plazoFinanciamiento} Meses</td>
                                    <td>${v.estado == true ? 'Activo' : 'Inactivo'}</td>
                                    <td><button d="${v.idCliente}" onclick="ObtenerCliente(this)" class="btn btn-primary btn-sm bg-color1 text-white">Editar</button></td>
                                <tr>
                            `;
                        });
                        tbodyPrestamos.html(html);
                    } else 
                        setAdvertencia('El cliente no posee prestamos')
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener cliente");
            }
        })
        .catch(error => {
            setError(error);
        })
}

