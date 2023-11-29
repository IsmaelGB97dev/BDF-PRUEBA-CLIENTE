
let tbodyClientes = $("#tbodyClientes"),
    modalCliente = $("#modalCliente"),
    btnAgregar = $("#btnAgregar"),
    ddTipoIdentificacion = $("#ddTipoIdentificacion"),
    txtNumeroIdentificacion = $("#txtNumeroIdentificacion"),
    txtPrimerNombre = $("#txtPrimerNombre"),
    txtSegundoNombre = $("#txtSegundoNombre"),
    txtPrimerApellido = $("#txtPrimerApellido"),
    txtSegundoApellido = $("#txtSegundoApellido"),
    ddDireccion = $("#ddDireccion"),
    ddEstado = $("#ddEstado"),
    hdCliente = $("#hdCliente"),
    formCliente = $("#formCliente"),
    btnCancelar = $("#btnCancelar");


btnAgregar.on("click", function () {
    modalCliente.modal("show");
    hdCliente.val("0");
});

btnCancelar.on("click", function () {
    formCliente[0].reset();
})

formCliente.submit(function (e) {
    e.preventDefault();

    if (hdCliente.val() == "0" || hdCliente.val() == "")
        AgregarCliente();
    else
        ActualizarCliente();
})

ObtenerCatalogos();
function ObtenerCatalogos() {
    fetch(urlAPI + "/catalogos/obtenerCatalogos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    // Tipo identificacion
                    let html = "";
                    res.dato.tipoIdentificacion.map((v, i) => {
                        html += `<option value="${v.idTipoIdentificacion}">${v.nombre}</option>`
                    })
                    ddTipoIdentificacion.html(html);
                    html = "";

                    // Direccion
                    res.dato.direccion.map((v, i) => {
                        html += `<option value="${v.idDireccion}">${v.descripcion}</option>`
                    })
                    ddDireccion.html(html);
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


function ActualizarCliente() {

    let requestData = {
        idCliente: hdCliente.val().trim(),
        numeroIdentificacion: txtNumeroIdentificacion.val().trim(),
        tipoIdentificacion: {
            idTipoIdentificacion: ddTipoIdentificacion.val()
        },
        primerNombre: txtPrimerNombre.val().trim(),
        segundoNombre: txtSegundoNombre.val().trim(),
        primerApellido: txtPrimerApellido.val().trim(),
        segundoApellido: txtSegundoApellido.val().trim(),
        direccion: {
            idDireccion: ddDireccion.val()
        },
        estado: ddEstado.val()
    }

    fetch(urlAPI + 'Cliente/actualizarCliente', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Cliente actualizado");
                modalCliente.modal("hide");
                formCliente[0].reset();
                ObtenerClientes();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}

function AgregarCliente() {
    let requestData = {
        numeroIdentificacion: txtNumeroIdentificacion.val().trim(),
        tipoIdentificacion: {
            idTipoIdentificacion: ddTipoIdentificacion.val()
        },
        primerNombre: txtPrimerNombre.val().trim(),
        segundoNombre: txtSegundoNombre.val().trim(),
        primerApellido: txtPrimerNombre.val().trim(),
        segundoApellido: txtSegundoApellido.val().trim(),
        direccion: {
            idDireccion: ddDireccion.val()
        },
        estado: ddEstado.val()
    }
        
    fetch(urlAPI + 'Cliente/insertarCliente', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Cliente agregado");
                modalCliente.modal("hide");
                formCliente[0].reset();
                ObtenerClientes();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}

function ObtenerCliente(e) {
    let row = $(e);

    hdCliente.val(row.attr('d'));
    fetch(urlAPI + "/cliente/obtenerClientes?idCliente=" + row.attr('d'))
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    if (res.dato.length > 0) {
                        let cl = res.dato[0];
                        console.log(cl.estado);
                        ddTipoIdentificacion.val(cl.tipoIdentificacion.idTipoIdentificacion);
                        txtNumeroIdentificacion.val(cl.numeroIdentificacion);
                        txtPrimerNombre.val(cl.primerNombre);
                        txtSegundoNombre.val(cl.segundoNombre);
                        txtPrimerApellido.val(cl.primerApellido);
                        txtSegundoApellido.val(cl.segundoApellido);
                        ddDireccion.val(cl.direccion.idDireccion);
                        ddEstado.val(cl.estado == true ? "true" : "false");
                    } else
                        setAdvertencia("No hay datos");

                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener cliente");
            }
        })
        .catch(error => {
            setError(error);
        })

    modalCliente.modal("show");
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
                                <tr>
                                    <td>${v.numeroIdentificacion}</td>
                                    <td>${v.tipoIdentificacion.nombre}</td>
                                    <td>${v.primerNombre} ${v.segundoNombre}</td>
                                    <td>${v.primerApellido} ${v.segundoApellido}</td>
                                    <td>${v.direccion.descripcion}</td>
                                    <td>${v.estado == true ? 'Activo' : 'Inactivo'}</td>
                                    <td><button d="${v.idCliente}" onclick="ObtenerCliente(this)" class="btn btn-primary btn-sm bg-color1 text-white">Editar</button></td>
                                <tr>
                            `;
                        });
                        tbodyClientes.html(html);
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