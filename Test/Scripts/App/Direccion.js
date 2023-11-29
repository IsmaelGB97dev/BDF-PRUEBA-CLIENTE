let tbodyDireccion = $("#tbodyDireccion"),
    btnAgregar = $("#btnAgregar"),
    btnCancelar = $("#btnCancelar"),
    modalDireccion = $("#modalDireccion"),
    hdDireccion = $("#hdDireccion"),
    formDireccion = $("#formDireccion"),
    txtNombre = $("#txtNombre");

btnAgregar.on("click", function () {
    modalDireccion.modal("show");
    hdDireccion.val("0");
});

btnCancelar.on("click", function () {
    formDireccion[0].reset();
});


formDireccion.submit(function (e) {
    e.preventDefault();

    if (hdDireccion.val() == "0" || hdDireccion.val() == "")
        AgregarDireccion();
})



function AgregarDireccion() {
    let requestData = {
        descripcion: txtNombre.val().trim()
    }

    fetch(urlAPI + 'catalogos/insertarDireccion', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Dirección agregada");
                modalDireccion.modal("hide");
                formDireccion[0].reset();
                ObtenerDirecciones();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}



ObtenerDirecciones();
function ObtenerDirecciones() {
    fetch(urlAPI + "/catalogos/obtenerCatalogos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    let html = "";
                    // Direccion
                    res.dato.direccion.map((v, i) => {
                        html += `<tr>
                                    <td>${v.descripcion}</td>
                                 </tr>`
                    })
                    tbodyDireccion.html(html);
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener direcciones");
            }
        })
        .catch(error => {
            setError(error);
        })
}
