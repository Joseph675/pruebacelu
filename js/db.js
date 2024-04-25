document.addEventListener('DOMContentLoaded', function() {
    // Obtén la referencia al elemento select
    var selectElement = document.querySelector('select[name="cantidadProductos"]');

    // Agrega un evento de escucha para el evento 'change'
    selectElement.addEventListener('change', function(event) {
        // Obtén el valor seleccionado
        var valorSeleccionado = event.target.value;

        console.log(valorSeleccionado)

        // Llama a la función obtenerProductos con el valor seleccionado
        obtenerProductos(valorSeleccionado);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtén la referencia al elemento select
    var selectElement = document.querySelector('select[name="cantidadProductos"]');
    var selectOrden = document.querySelector('select[name="sortby"]');

    // Agrega un evento de escucha para el evento 'change'
    selectElement.addEventListener('change', function(event) {
        // Obtén el valor seleccionado
        var valorSeleccionado = event.target.value;

        console.log(valorSeleccionado)

        // Llama a la función obtenerProductos con el valor seleccionado
        obtenerProductos(valorSeleccionado, selectOrden.value);
    });

    selectOrden.addEventListener('change', function(event) {
        // Obtén el valor seleccionado
        var ordenSeleccionado = event.target.value;

        console.log(ordenSeleccionado)

        // Llama a la función obtenerProductos con el valor seleccionado
        obtenerProductos(selectElement.value, ordenSeleccionado);
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

function obtenerProductos(numProductos, orden, idCategoria, telefonoNombre) {
    console.log(numProductos, orden, idCategoria, telefonoNombre)
    fetch('https://7c0d5e28-f32d-4be0-90ba-e26b7a6f5763-00-10h87gqcgyorr.kirk.replit.dev/api/productos')
        .then(response => response.json())
        .then(data => {
            // Si telefonoNombre está definido, filtra los productos por el nombre del teléfono
            if (telefonoNombre) {
                data = data.filter(producto => producto.nombre && producto.nombre.includes(telefonoNombre));
            }

            // Si idCategoria está definido, filtra los productos por categoría
            if (idCategoria) {
                data = data.filter(producto => producto.ID_Categoria === idCategoria);
            }

            // Si orden está definido, ordena los productos por precio
            if (orden) {
                data.sort((a, b) => {
                    if (orden === '1') {
                        // Orden descendente por precio
                        return Number(b.Precio) - Number(a.Precio);
                    } else if (orden === '2') {
                        // Orden ascendente por precio
                        return Number(a.Precio) - Number(b.Precio);
                    }
                });
            }

            // Si numProductos está definido y no es "todos", reduce el array a ese número
            if (numProductos && numProductos !== 'todos') {
                data = data.slice(0, numProductos);
            }

            // Ahora, console.log mostrará solo los productos que se están procesando
            console.log(data);

            // Obtiene el div de productos
            var divProductos = document.getElementById('productos');

            // Vacía el div de productos
            divProductos.innerHTML = '';

            // Por cada producto en los datos
            data.forEach(producto => {
                // Crea un nuevo div para el producto
                var divProducto = document.createElement('div');
                // Convierte el precio a un número
                let precio = Number(producto.Precio);

                // Formatea el precio
                let precioFormateado = precio.toLocaleString('de-DE');

                // Aquí generas el HTML para cada producto
                divProducto.innerHTML = `
                <div style=" width: 380px;" class="item shop-item shop-item-simple" data-inview-showup="showup-scale">
                    <div class="item-back"></div>
                    <a  class="item-image responsive-1by1">
                    <img src="..${producto.imagen}" alt="">
                    </a>
                    <div class="item-content shift-md">
                        <div class="item-textes">
                            <div class="item-title text-upper">
                                <a  class="content-link">${producto.Nombre}</a>
                            </div>
                            <div class="item-categories">
                                <a class="content-link"> ${producto.Marca}</a>
                            </div>
                        </div>
                        <div class="item-prices">
                            <div class="item-price">$${precioFormateado}</div>
                        </div>
                    </div>
                   
                </div>
            `;

                // Añade el div del producto al div de productos
                divProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error('Error:', error));
}



function obtenerProductosAleatorios() {
    fetch('https://7c0d5e28-f32d-4be0-90ba-e26b7a6f5763-00-10h87gqcgyorr.kirk.replit.dev/api/productos')

        .then(response => response.json())
        .then(data => {
            // Mezcla los productos
            let productosMezclados = mezclarArray(data);

            // Selecciona los primeros tres productos
            let tresProductos = productosMezclados.slice(0, 3);

            // Obtiene el div de productos
            var divProductosAleatorios = document.getElementById('productosdestacados');
            console.log(tresProductos);


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
                    <div class="item-side-image"><a  class="item-image responsive-1by1"><img
                                src="http://localhost:3000${producto.imagen}" alt=""></a></div>
                    <div class="item-side">
                        <div class="item-title"><a  class="content-link text-upper">${producto.Nombre}</a></div>
                        <div class="item-categories"><a class="content-link">${producto.Marca}</a></div>
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

function obtenerCategorias() {
    fetch('https://7c0d5e28-f32d-4be0-90ba-e26b7a6f5763-00-10h87gqcgyorr.kirk.replit.dev/api/categorias')
        .then(response => response.json())
        .then(data => {
            // Obtiene el div de categorías
            var divCategorias = document.getElementById('categorias');
            console.log(data);

            // Por cada categoría en los datos
            data.forEach(categoria => {
                // Crea un nuevo div para la categoría
                var divCategoria = document.createElement('div');
               
                // Aquí generas el HTML para cada categoría
                divCategoria.innerHTML = `
                    <li><span class="category-line"><a class="content-link"><span
                    class="single-line-text">   ${categoria.Nombre}</span></a></span></li>
                
            `;

                // Añade un evento de escucha para el evento 'click'
                divCategoria.addEventListener('click', function() {
                    // Llama a la función obtenerProductos con el id de la categoría
                    obtenerProductos(null, null, categoria.ID);
                    console.log(categoria.ID)
                });

                // Añade el div de la categoría al div de categorías
                divCategorias.appendChild(divCategoria);
            });
        })
        .catch(error => console.error('Error:', error));
}



// Obtiene el campo de entrada
var campoBusqueda = document.querySelector('input[name="search"]');

// Añade un evento de escucha para el evento 'input'
campoBusqueda.addEventListener('input', function() {
    // Obtiene el texto que el usuario escribió
    var textoBusqueda = this.value;

    // Filtra los productos basándose en el texto de búsqueda
    obtenerProductosFiltrados(textoBusqueda);
});

function obtenerProductosFiltrados(textoBusqueda) {
    fetch('http://localhost:3000/api/productos')
        .then(response => response.json())
        .then(data => {
            // Convierte el texto de búsqueda a minúsculas
            var textoBusquedaMin = textoBusqueda.toLowerCase();

            // Filtra los productos por el texto de búsqueda
            var productosFiltrados = data.filter(producto => producto.Nombre.toLowerCase().includes(textoBusquedaMin));

            // Obtiene el div de productos
            var divProductos = document.getElementById('productos');

            // Vacía el div de productos
            divProductos.innerHTML = '';

            // Por cada producto en los datos filtrados
            productosFiltrados.forEach(producto => {
                // Crea un nuevo div para el producto
                var divProducto = document.createElement('div');
                // Convierte el precio a un número
                let precio = Number(producto.Precio);

                // Formatea el precio
                let precioFormateado = precio.toLocaleString('de-DE');

                // Aquí generas el HTML para cada producto
                divProducto.innerHTML = `
                <div style=" width: 380px;" class="item shop-item shop-item-simple" data-inview-showup="showup-scale">
                    <div class="item-back"></div>
                    <a  class="item-image responsive-1by1">
                    <img src="http://localhost:3000${producto.imagen}" alt="">
                    </a>
                    <div class="item-content shift-md">
                        <div class="item-textes">
                            <div class="item-title text-upper">
                                <a  class="content-link">${producto.Nombre}</a>
                            </div>
                            <div class="item-categories">
                                <a  class="content-link"> ${producto.Marca}</a>
                            </div>
                        </div>
                        <div class="item-prices">
                            <div class="item-price">$${precioFormateado}</div>
                        </div>
                    </div>
                    <div class="item-links">
                        <a  class="btn text-upper btn-md btns-bordered">Ver</a>
                    </div>
                </div>
            `;

                // Añade el div del producto al div de productos
                divProductos.appendChild(divProducto);
            });
        })
        .catch(error => console.error('Error:', error));
}






// Llama a la función cuando se carga la página
window.onload = function() {
    obtenerProductosAleatorios();
    obtenerProductos();
    obtenerCategorias();
};


