var menu2 = document.querySelectorAll('.opcion');

menu2.forEach(function(item) { 
    item.addEventListener('click', function(i){
         var elemento =i.target.parentNode; 
         console.log(elemento.children); 
         elemento.children[1].classList.toggle('activo');
    })
})

const opcion = document.querySelectorAll('.opcion');

// Permite recorrer cada una de nuestras opciones
opcion.forEach(e => {

    // Añadimos un evento a cada elemento seleccionado
    e.addEventListener('click', function(e){

        // Alteranmos las clases de nuestros enlaces
        const padre = e.target.parentNode;
        padre.children[1].classList.toggle('animation');
        padre.parentNode.children[1].classList.toggle('animation');
    });


});