
let ddReporte = $("#ddReporte"),
    ddMoneda = $("#ddMoneda"),
    ddEstado = $("#ddEstado"),
    filtros = $("#filtros"),
    tablaReporte1 = $("#tablaReporte1"),
    btnCargar = $("#btnCargar"),
    tbodyReporte1 = $("#tbodyReporte1");


filtros.hide(); 
tablaReporte1.hide();

btnCargar.on("click", function () {
    ObtenerReporte1();
});

ddReporte.on("change", function () {
    tbodyReporte1.html("");

    if (ddReporte.val() == "1") {
        filtros.show();
        tablaReporte1.show();
    } else {
        filtros.hide();
        tablaReporte1.show();
        ObtenerReporte2();
    }
})
function ObtenerReporte2() {
    fetch(urlAPI + "/reportes/prestamosActivos")
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    let html = "";
                    if (res.dato.length > 0) {
                        res.dato.map((v, i) => {
                            html += `<tr>
                                    <td>${v.numeroPrestamo}</td>
                                    <td>${v.cliente.primerNombre}</td>
                                    <td>${v.cliente.numeroIdentificacion}</td>
                                    <td>${v.cliente.direccion.descripcion}</td>
                                    <td>${ToFecha(v.fechaInicio)}</td>
                                    <td>${ToFecha(v.fechaFin)}</td>
                                    <td>${v.moneda.nombre}</td>
                                    <td>${toDecimal(v.montoSolicitado)}</td>
                                    <td>${toDecimal(v.montoAprobado)}</td>
                                    <td>${v.plazoFinanciamiento} meses</td>
            
                                </tr>`
                        })
                        tbodyReporte1.html(html);
                    } else {
                        setAdvertencia("Sin resultados");
                        tbodyReporte1.html("");
                    }
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener el reporte");
            }
        })
        .catch(error => {
            setError(error);
        })
}


function ObtenerReporte1() {
    fetch(urlAPI + "/reportes/prestamosXestado?estado=" + ddEstado.val() + "&idMoneda=" + ddMoneda.val())
        .then(data => data.json())
        .then(res => {
            if (res != null) {
                if (res.exito) {
                    let html = "";
                    if (res.dato.length > 0) {
                        res.dato.map((v, i) => {
                            html += `<tr>
                                    <td>${v.numeroPrestamo}</td>
                                    <td>${v.cliente.primerNombre}</td>
                                    <td>${v.cliente.numeroIdentificacion}</td>
                                    <td>${v.cliente.direccion.descripcion}</td>
                                    <td>${ToFecha(v.fechaInicio)}</td>
                                    <td>${ToFecha(v.fechaFin)}</td>
                                    <td>${v.moneda.nombre}</td>
                                    <td>${toDecimal(v.montoSolicitado)}</td>
                                    <td>${toDecimal(v.montoAprobado)}</td>
                                    <td>${v.plazoFinanciamiento} meses</td>
            
                                </tr>`
                        })
                        tbodyReporte1.html(html);
                    } else {
                        setAdvertencia("Sin resultados");
                        tbodyReporte1.html("");
                    }
                } else
                    setAdvertencia(res.mensaje);
            } else {
                setError("Error al obtener el reporte");
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
                        html += `<option value="${v.idMoneda}">${v.nombre}</option>`
                    })
                    ddMoneda.html(html);
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