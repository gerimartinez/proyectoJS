class Producto {
  constructor(id, imagen, nombre, cantidad, maximo, precio) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.cantidad = 1;
    this.maximo = maximo;
    this.precio = precio;
  }
}

let carrito = [];
//carrito dropdown

let li
let divCarrito = document.getElementById("carrito")
let divLista = document.getElementById("lista")
function crearDropdown(divi) {
  for (i of JSON.parse(localStorage.getItem("carrito"))) {
    li = document.createElement("li")
    li.innerHTML = `
          <div class="filaDelCarrito d-flex justify-content-evenly">
            <p class="parrafo" >${i.nombre}</p>
            <p class="parrafo" >${i.cantidad} und.</p>
            
            <button onclick="eliminar()" class="btn" id="btn-eliminar${i.id}"><img src="./imagenes/remover-archivo.png" style="width: 1em; height: 1em; margin-top: -0.8em;" alt=""></button>
            <p class="parrafo" >$${i.precio}</p>
          </div>
          `
    divi.append(li)
  }
}

//boton eliminar producto carrito
function eliminar() {
  let producto = carrito.find((elp) => elp.id == i.id);
  let pos = carrito.indexOf(producto)
  carrito.splice(pos, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito))
  divLista.innerHTML = ""
  crearDropdown(divLista)
  actualizarTotal()
  Swal.fire({
    title: '¿Estas seguro?',
    text: "No podes revertir esta accion",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Listo!',
        'Tu producto fue eliminado',
        'success'
      )
    }
  })
}

function acumuladorStock(div, cantidades) {
  let cantidad = div.querySelector(".cantidad")
  cantidad.innerHTML = cantidades
}

//total del carrito
function actualizarTotal() {
  let total = 0;
  carrito.forEach(i => total += (i.cantidad * i.precio));
  document.getElementById("total").innerHTML = "Total de la compra: $" + total;
}

//btn vaciar carrito
function vaciarCarrito() {
  carrito = [];
  divLista.innerHTML = " ";
  actualizarTotal();
  Swal.fire({
    title: '¿Estas seguro?',
    text: "No podes revertir esta accion",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: "Cancelar",
    confirmButtonText: 'Si, vaciar'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Listo!',
        'Tu carrito fue vaciado',
        'success'
      )
    }
  })
}
// btn finalizar compra
function finalizarCompra() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: '¿Esta seguro que desea finalizar la compra?',
    text: "No podras revertir esta accion",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, finalizar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Compra finalizada!',
        'Su compra se ha realizado con exito'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Su compra ha sido finalizada'
      )
    }
  })
}

let datos;
// crea card de cada producto 
 fetch("./data.json")
     .then((res) => res.json())
     .then((data) => {
       datos = data;
       datos.forEach((elemento) => {
         let div = document.createElement('div')
         div.innerHTML = `
         <div class ="d-flex align-content-start flex-wrap">
           <div class="card mb-3 p-3 border flex-wrap"  style="width: 18rem">
             <img src="${elemento.imagen}" class="card-img-top" alt="...">
             <div class="card-body">
                  <div class="titulo">
                     <h5 class="card-title">${elemento.nombre}</h5>
                  </div>
                  <div class="precio">
                     <p class="card-text">$${elemento.precio}</p>
                  </div>
                  <div class="botones-cantidad d-flex p-2">
                     <button id="restar${elemento.id}" class="btn btn-sm btn-card px-1" style="width: 2em" >-</button>
                     <p class="card-text px-1 cantidad">${elemento.cantidad}</p>
                     <button id="sumar${elemento.id}" class="btn btn-sm btn-card">+</button>
                  </div>
                  <div>
                     <button id="comprar${elemento.id}" class="btn btn-card btn-comprar">Comprar</button>
                  <div>
              </div>
           </div>
         </div>`
         document.getElementById("containerCard").append(div)
         //botones

      let suma = document.getElementById(`sumar${elemento.id}`)
      suma.onclick = () => {
       elemento.cantidad < elemento.maximo && elemento.cantidad++; //*Operador AND
       acumuladorStock(div, elemento.cantidad)
      }

      let resta = document.getElementById(`restar${elemento.id}`)
      resta.onclick = () => {
       elemento.cantidad > 0 && elemento.cantidad--; //*Operador AND
       acumuladorStock(div, elemento.cantidad)
      }

      let comprar = document.getElementById(`comprar${elemento.id}`)
      comprar.onclick = () => {
       carrito.find((prod) => prod.nombre == elemento.nombre) ? elemento.cantidad++ : carrito.push(elemento); //*Operador ternario
       localStorage.setItem("carrito", JSON.stringify(carrito))
       divLista.innerHTML = ""
     
       crearDropdown(divLista)
       actualizarTotal()
        Toastify({
          text: "Añadido al carrito!",
          duration: 2000,
          style: {
            background: 'linear-gradient(#c2abe9, #a68bd3)',
            width: "13%",
            height: "14%"
          },
          className: "notificacion my-toast"
        }).showToast();
      }
    })
  })
 
  
 for (let i = 0; i < datos.length; i++) {
  let { precio: precioCompra } = productos[i]
  console.log(precioCompra);
 } //*Desestructuracion



 for (i = 0; i < datos.length; i++) {
  crearCard(datos[i])
 }

