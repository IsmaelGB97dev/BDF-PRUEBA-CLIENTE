let tbodyTipoIdentificacion = $("#tbodyTipoIdentificacion"),
    btnAgregar = $("#btnAgregar"),
    btnCancelar = $("#btnCancelar"),
    modalTipoIdentificacion = $("#modalTipoIdentificacion"),
    hdTipoIdentificacion = $("#hdTipoIdentificacion"),
    formTipoIdentificacion = $("#formTipoIdentificacion"),
    txtNombre = $("#txtNombre");

btnAgregar.on("click", function () {
    modalTipoIdentificacion.modal("show");
    hdTipoIdentificacion.val("0");
});

btnCancelar.on("click", function () {
    formTipoIdentificacion[0].reset();
})


formTipoIdentificacion.submit(function (e) {
    e.preventDefault();

    if (hdTipoIdentificacion.val() == "0" || hdTipoIdentificacion.val() == "")
        AgregarTipoIdentificacion();
})



function AgregarTipoIdentificacion() {
    let requestData = {
        nombre: txtNombre.val().trim()
    }

    fetch(urlAPI + 'catalogos/insertarTipoIdentificacion', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Tipo Identificación agregada");
                modalTipoIdentificacion.modal("hide");
                formTipoIdentificacion[0].reset();
                ObtenerTiposIdentificacion();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}



ObtenerTiposIdentificacion();
function ObtenerTiposIdentificacion() {
    fetch(urlAPI + "/catalogos/obtenerCatalogos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    let html = "";
                    // Tipo identificacion
                    res.dato.tipoIdentificacion.map((v, i) => {
                        html += `<tr>
                                    <td>${v.nombre}</td>
                                 </tr>`
                    })
                    tbodyTipoIdentificacion.html(html);
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener tipos de identificación");
            }
        })
        .catch(error => {
            setError(error);
        })
}
