let tbodyTipoPrestamo = $("#tbodyTipoPrestamo"),
    btnAgregar = $("#btnAgregar"),
    btnCancelar = $("#btnCancelar"),
    modalTipoPrestamo = $("#modalTipoPrestamo"),
    hdTipoPrestamo = $("#hdTipoPrestamo"),
    formTipoPrestamo = $("#formTipoPrestamo"),
    txtNombre = $("#txtNombre");

btnAgregar.on("click", function () {
    modalTipoPrestamo.modal("show");
    hdTipoPrestamo.val("0");
});

btnCancelar.on("click", function () {
    formTipoPrestamo[0].reset();
})


formTipoPrestamo.submit(function (e) {
    e.preventDefault();

    if (hdTipoPrestamo.val() == "0" || hdTipoPrestamo.val() == "")
        AgregarTipoPrestamo();
})



function AgregarTipoPrestamo() {
    let requestData = {
        nombre: txtNombre.val().trim()
    }

    fetch(urlAPI + 'catalogos/insertarTipoPrestamo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Tipo de prestamo agregado");
                modalTipoPrestamo.modal("hide");
                formTipoPrestamo[0].reset();
                ObtenerTiposPrestamo();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}



ObtenerTiposPrestamo();
function ObtenerTiposPrestamo() {
    fetch(urlAPI + "/catalogos/obtenerCatalogos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    let html = "";
                    // Tipo prestamo
                    res.dato.tipoPrestamo.map((v, i) => {
                        html += `<tr>
                                    <td>${v.nombre}</td>
                                 </tr>`
                    })
                    tbodyTipoPrestamo.html(html);
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener tipos de reclamos");
            }
        })
        .catch(error => {
            setError(error);
        })
}
