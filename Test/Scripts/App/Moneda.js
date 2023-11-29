let tbodyMoneda = $("#tbodyMoneda"),
    btnAgregar = $("#btnAgregar"),
    btnCancelar = $("#btnCancelar"),
    modalMoneda = $("#modalMoneda"),
    hdMoneda = $("#hdMoneda"),
    formMoneda = $("#formMoneda"),
    txtNombre = $("#txtNombre");

btnAgregar.on("click", function () {
    modalMoneda.modal("show");
    hdMoneda.val("0");
});

btnCancelar.on("click", function () {
    formMoneda[0].reset();
})


formMoneda.submit(function (e) {
    e.preventDefault();

    if (hdMoneda.val() == "0" || hdMoneda.val() == "")
        AgregarMoneda();
})



function AgregarMoneda() {
    let requestData = {
        nombre: txtNombre.val().trim()
    }

    fetch(urlAPI + 'catalogos/insertarMoneda', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(data => data.json())
        .then(res => {
            if (res.exito) {
                setExito("Moneda agregada");
                modalMoneda.modal("hide");
                formMoneda[0].reset();
                ObtenerMonedas();
            } else {
                setAdvertencia(res.mensaje);
            }
        })
        .catch(error => {
            setError(error);
        })
}



ObtenerMonedas();
function ObtenerMonedas() {
    fetch(urlAPI + "/catalogos/obtenerCatalogos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    let html = "";
                    // Monedas
                    res.dato.moneda.map((v, i) => {
                        html += `<tr>
                                    <td>${v.nombre}</td>
                                 </tr>`
                    })
                    tbodyMoneda.html(html);
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener las monedas");
            }
        })
        .catch(error => {
            setError(error);
        })
}
