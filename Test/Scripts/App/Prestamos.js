
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
    hdPrestamo = $("#hdPrestamo"),
    formPrestamo = $("#formPrestamo"),
    btnCancelar = $("#btnCancelar");


btnNuevo.on("click", function () {
    modalPrestamo.modal("show");
})

btnNuevo.hide();

ddCliente.on('change', function (e) {
    let seleccion = ddCliente.val();
    if (ddCliente.val() == "0") {
        tbodyPrestamos.html("");
        btnNuevo.hide();
    }
    else {
        btnNuevo.show();
        ObtenerPrestamos(seleccion);
    }
})

btnCancelar.on("click", function () {
    formPrestamo[0].reset();
})

formPrestamo.submit(function (e) {
    e.preventDefault();
 
    if (hdPrestamo.val() == "0" || hdPrestamo.val() == "")
        AgregarPrestamo();
    else
        ActualizarPrestamo();
})

btnCancelar.on("click", function () {
    formPrestamo[0].reset();
})

function ObtenerPrestamo(e) {
    let row = $(e);

    hdPrestamo.val(row.attr('d'));
    fetch(urlAPI + "/prestamo/obtenerPrestamos?idCliente=" + ddCliente.val() + "&idPrestamo=" + row.attr('d'))
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    if (res.dato.length > 0) {
                        let pr = res.dato[0];
                        ddTipoPrestamo.val(Number(pr.tipoPrestamo.idTipoPrestamo));
                        txtFechaInicio.val(toFechaInput(pr.fechaInicio));
                        txtFechaFin.val(toFechaInput(pr.fechaFin));
                        ddMoneda.val(pr.moneda.idMoneda);
                        txtMontoSolicitado.val(pr.montoSolicitado);
                        txtMontoAprobado.val(pr.montoAprobado);
                        txtPlazoFinanciamiento.val(pr.plazoFinanciamiento);
                        ddEstado.val(pr.estado ? "true" : "false");
                    } else
                        setAdvertencia("No hay datos");

                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener prestamo");
            }
        })
        .catch(error => {
            setError(error);
        })

    modalPrestamo.modal("show");
}


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
                ObtenerPrestamos(ddCliente.val());
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
                        let html = "",
                            seleccione = "<option value='0'>-- Seleccione</option>";
                        res.dato.map((v, i) => {
                            html += `
                                <option value="${v.idCliente}">(${v.numeroIdentificacion}) - ${v.primerNombre} ${v.segundoNombre} ${v.primerApellido} ${v.segundoApellido}</option>
                            `;
                        });
                        ddCliente.html(seleccione + html);
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


function ActualizarPrestamo() {

    let requestData = {
        numeroPrestamo: hdPrestamo.val().trim(),
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
        plazoFinanciamiento: txtPlazoFinanciamiento.val().trim(),
        estado: ddEstado.val()
    }
    console.log(requestData.estado);

    fetch(urlAPI + 'Prestamo/actualizarPrestamo', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Prestamo actualizado");
                modalPrestamo.modal("hide");
                formPrestamo[0].reset();
                ObtenerPrestamos(ddCliente.val());
            } else {
                setAdvertencia(res.mensaje);
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
    fetch(urlAPI + "/prestamo/obtenerPrestamos?idCliente=" + c + "&idPrestamo=0")
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
                                    <td><button d="${v.numeroPrestamo}" onclick="ObtenerPrestamo(this)" class="btn btn-primary btn-sm bg-color1 text-white">Editar</button></td>
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

