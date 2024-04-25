document.addEventListener('DOMContentLoaded', function () {
    // Obtén la referencia al elemento select
    var selectElement = document.querySelector('select[name="cantidadTelefonos"]');

    // Agrega un evento de escucha para el evento 'change'
    selectElement.addEventListener('change', function (event) {
        // Obtén el valor seleccionado
        var valorSeleccionado = event.target.value;


        // Llama a la función obtenerProductos con el valor seleccionado
        obtenerTelefonos(valorSeleccionado);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Obtén la referencia al elemento select
    var selectElement = document.querySelector('select[name="cantidadTelefonos"]');
    var selectOrden = document.querySelector('select[name="sortby"]');

    // Agrega un evento de escucha para el evento 'change'
    selectElement.addEventListener('change', function (event) {
        // Obtén el valor seleccionado
        var valorSeleccionado = event.target.value;


        // Llama a la función obtenerProductos con el valor seleccionado
        obtenerTelefonos(valorSeleccionado, selectOrden.value);
    });

    selectOrden.addEventListener('change', function (event) {
        // Obtén el valor seleccionado
        var ordenSeleccionado = event.target.value;


        // Llama a la función obtenerProductos con el valor seleccionado
        obtenerTelefonos(selectElement.value, ordenSeleccionado);
    });
});

// Función para hacer una solicitud GET a tu servidor
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Obtiene el campo de entrada
var campoBusqueda = document.querySelector('input[name="search"]');

// Añade un evento de escucha para el evento 'input'
campoBusqueda.addEventListener('input', function () {
    // Obtiene el texto que el usuario escribió
    var textoBusqueda = this.value;

    // Filtra los productos basándose en el texto de búsqueda
    obtenerTelefonosFiltrados(textoBusqueda);
});


// Obtiene el div de paginación
var divPaginacion = document.getElementById('paginator');

// Añade un evento de escucha para el evento 'click' a cada botón de paginación
divPaginacion.querySelectorAll('a').forEach((boton, index) => {
    boton.addEventListener('click', function (event) {
        // Previene la acción por defecto del botón
        event.preventDefault();

        // Llama a la función obtenerTelefonos con el número de página correspondiente
        obtenerTelefonos(numTelefonos, null, null, index + 1);
    });
});

// Obtiene el div de paginación
var divPaginacion = document.getElementById('paginator');

// Vacía el div de paginación
divPaginacion.innerHTML = '';

// Genera los botones de paginación



function actualizarPaginacion(numTelefonos) {
    fetch('http://localhost:3000/api/telefonos')
        .then(response => response.json())
        .then(data => {
            // Calcula el número total de páginas
            var numPaginas = Math.ceil(data.length / numTelefonos);

            // Obtiene el div de paginación
            var divPaginacion = document.getElementById('paginator');

            // Vacía el div de paginación
            divPaginacion.innerHTML = '';

            // Genera los botones de paginación
            for (let i = 1; i <= numPaginas; i++) {
                var boton = document.createElement('a');
                boton.href = '#';
                boton.textContent = i;
                boton.addEventListener('click', function (event) {
                    // Previene la acción por defecto del botón
                    event.preventDefault();

                    // Llama a la función obtenerTelefonos con el número de página correspondiente
                    obtenerTelefonos(numTelefonos, null, null, i);
                });
                divPaginacion.appendChild(boton);
            }
        })
        .catch(error => console.error('Error:', error));
}





function obtenerTelefonosFiltrados(textoBusqueda) {
    fetch('http://localhost:3000/api/telefonos')
        .then(response => response.json())
        .then(data => {
            // Convierte el texto de búsqueda a minúsculas
            var textoBusquedaMin = textoBusqueda.toLowerCase();

            // Filtra los teléfonos por el texto de búsqueda
            var telefonosFiltrados = data.filter(telefono => telefono.Nombre.toLowerCase().includes(textoBusquedaMin));

            // Obtiene el div de teléfonos
            var divTelefonos = document.getElementById('telefonos');

            // Vacía el div de teléfonos
            divTelefonos.innerHTML = '';

            // Por cada teléfono en los datos filtrados
            telefonosFiltrados.forEach(telefono => {
                // Crea un nuevo div para el teléfono
                var divTelefono = document.createElement('div');

                // Aquí generas el HTML para cada teléfono
                divTelefono.innerHTML = `
                <div style="width: 380px; " class="item shop-item shop-item-simple" data-inview-showup="showup-scale">
    <div class="item-back"></div>
    <a href="shop-item.html" class="item-image responsive-1by1" >
        <img src="http://localhost:3000${telefono.imagen}" alt="" style="wight:100px">
    </a>
    <div class="item-content shift-md">
        <div class="item-textes">
            <div class="item-title text-upper">
                <a href="shop-item.html" class="content-link">${telefono.Nombre}</a>
            </div>
            <div class="item-categories">
                <a href="shop-category.html" class="content-link"> Repuestos </a>
            </div>
        </div>
        
    </div>
    <div class="item-links">
        <a href="shop-item.html" class="btn text-upper btn-md btns-bordered">Ver</a>
    </div>
</div>
            `;
            // Añade un evento de escucha para el evento 'click'
            divTelefono.addEventListener('click', function () {
                // Llama a la función obtenerTelefonos con el id del teléfono
                obtenerTelefonos(null, null, telefono.ID);
            });

            // Añade el div del teléfono al div de teléfonos
            divTelefonos.appendChild(divTelefono);
        });
    })
    .catch(error => console.error('Error:', error));
}


function obtenerTelefonos(numTelefonos, orden , Tags) {
    console.log(orden)
    fetch('http://localhost:3000/api/telefonos')
        .then(response => response.json())
        .then(data => {
            // Si idCategoria está definido, filtra los productos por categoría
            if (Tags) {
                data = data.filter(producto => producto.Tags === Tags);
            }

            // Si orden está definido, ordena los productos por ID
            if (orden) {
                data.sort((a, b) => {
                    if (orden === '1') {
                        // Orden descendente por ID
                        return b.ID - a.ID;
                    } else if (orden === '2') {
                        // Orden ascendente por ID
                        return a.ID - b.ID;
                    }
                });
            }

            // Si numProductos está definido y no es "todos", reduce el array a ese número
            if (numTelefonos && numTelefonos !== 'todos') {
                let inicio = (pagina - 1) * numTelefonos;
                let fin = inicio + numTelefonos;
                data = data.slice(inicio, fin);
            }

            // Obtiene el div de productos
            var divTelefonos = document.getElementById('telefonos');

            // Vacía el div de productos
            divTelefonos.innerHTML = '';

            // Por cada categoría en los datos
            data.forEach(telefono => {
                // Crea un nuevo div para la categoría
                var divTelefono = document.createElement('div');

                // Aquí generas el HTML para cada categoría
                divTelefono.innerHTML = `
                <div style="width: 380px; " class="item shop-item shop-item-simple" data-inview-showup="showup-scale">
    <div class="item-back"></div>
    <a href="shop-item.html" class="item-image responsive-1by1" >
        <img src="http://localhost:3000${telefono.imagen}" alt="" style="wight:100px">
    </a>
    <div class="item-content shift-md">
        <div class="item-textes">
            <div class="item-title text-upper">
                <a href="shop-item.html" class="content-link">${telefono.Nombre}</a>
            </div>
            <div class="item-categories">
                <a href="shop-category.html" class="content-link"> Repuestos </a>
            </div>
        </div>
        
    </div>
    <div class="item-links">
    <a href="shop2.html?telefonoNombre=${encodeURIComponent(telefono.Nombre)}" class="btn text-upper btn-md btns-bordered">Ver</a>
    </div>
</div>
            `;
            // Añade un evento de escucha para el evento 'click'
            divTelefono.addEventListener('click', function () {
                // Llama a la función obtenerTelefonos con el id del teléfono
                obtenerTelefonos(null, null, telefono.ID);
            });

            // Añade el div del teléfono al div de teléfonos
            divTelefonos.appendChild(divTelefono);
        });
    })
    .catch(error => console.error('Error:', error));
}








function obtenerProductosAleatorios() {
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(data => {
            // Mezcla los productos
            let productosMezclados = mezclarArray(data);

            // Selecciona los primeros tres productos
            let tresProductos = productosMezclados.slice(0, 3);

            // Obtiene el div de productos
            var divProductosAleatorios = document.getElementById('productosdestacados');


            // Por cada producto en los datos
            tresProductos.forEach(producto => {
                // Crea un nuevo div para el producto
                var divProductoAleatorio = document.createElement('div');
                // Convierte el precio a un número
                let precio = Number(producto.Precio);

                // Formatea el precio
                let precioFormateado = precio.toLocaleString('de-DE');

                divProductoAleatorio.innerHTML = `
                <div class="items" style="padding:5px">
                <div class="shop-side-item">
                    <div class="item-side-image"><a href="shop-item.html" class="item-image responsive-1by1"><img
                                src="http://localhost:3000${producto.imagen}" alt=""></a></div>
                    <div class="item-side">
                        <div class="item-title"><a href="shop-item.html" class="content-link text-upper">${producto.Nombre}</a></div>
                        <div class="item-categories"><a href="#" class="content-link">${producto.Marca}</a></div>
                        <div class="item-prices">
                            <div class="item-price">$${precioFormateado}</div>
                        </div>
                    </div>
                </div>
               
                
            </div>
            `;

                // Añade el div del producto al div de productos
                divProductosAleatorios.appendChild(divProductoAleatorio);
            });
        })
        .catch(error => console.error('Error:', error));
}

function obtenerModelos() {
    fetch('http://localhost:3000/api/telefonos')
        .then(response => response.json())
        .then(data => {
            // Obtiene el div de categorías
            var divCategorias = document.getElementById('Modelos');

            // Por cada categoría en los datos
            data.forEach(telefono => {
                // Crea un nuevo div para la categoría
                var divCategoria = document.createElement('div');

                // Aquí generas el HTML para cada categoría
                divCategoria.innerHTML = `
                    <li><span class="category-line"><a class="content-link"><span
                    class="single-line-text"> ${telefono.Nombre}</span></a></span></li>
                
            `;

                // Añade un evento de escucha para el evento 'click'
                divCategoria.addEventListener('click', function () {
                    // Llama a la función obtenerProductos con el id de la categoría
                    obtenerProductos(null, null, telefono.ID);
                });

                // Añade el div de la categoría al div de categorías
                divCategorias.appendChild(divCategoria);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llama a la función cuando se carga la página
window.onload = function () {
    obtenerTelefonos();
    obtenerProductosAleatorios();
    obtenerModelos();

};
