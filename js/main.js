$(document).ready(function(){
  /* NAV */
  $(".button-collapse").sideNav();
  /* COLLAPSIBLE */
  $('.collapsible').collapsible();
  /* SELECT */
  $('select').material_select();


  /* VALIDACIÓN */
	$("#sesion").click(function(event) {
    if(!(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test($("#mail").val()))){
   			$("#mail").append($("#mail").val("Error"));
  		}
  		if(!(/^\d{8}([0-9])*$/.test($("#contrasena").val())) ){
   			$("#contrasena").append($("#contrasena").val("Error"));
  		}
  		else{
  			$("#sesion").attr("href","home.html");
        localStorage.setItem('mail',$("#mail").val());
        localStorage.setItem('num-tarjeta',$("#contrasena").val());
        
  		}
	});

  
  /* DEVOLVER EMAIL en perfil */
  var mail = localStorage.getItem('mail');
  $('#respuesta-correo').html(mail); 

  var contrasena = localStorage.getItem('num-tarjeta');
  $('#tarjetas-creadas').html(contrasena); 

  var creadas = localStorage.getItem('todas-tarjetas');
  $('#tarjetas-creadas').html(creadas);

  /* Capturar valor tarjetas */
  $("#btn-tarjeta").click(function(event) {
    if(!(/^\d{8}([0-9])*$/.test($("#tarjeta").val())) ){
        $("#tarjeta").append($("#tarjeta").val("Error"));
    }else{

      localStorage.setItem('num-tarjeta-ing',$("#tarjeta").val()); 
      var digitos = +localStorage.getItem('num-tarjeta-ing');

      $("#tarjetas-creadas").append(`
        <div class="caja">
          <h6>`+digitos+`</h6>
        </div>
      `)
      
      localStorage.setItem('todas-tarjetas', $('#tarjetas-creadas').html()); 
      $("#tarjeta").val(""); 
    }

  });




})
