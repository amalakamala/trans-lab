$(document).ready(function(){
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

  /* NAV */
  $(document).ready(function(){
    $(".button-collapse").sideNav();
  })

  /* DEVOLVER EMAIL en perfil */
  var mail = localStorage.getItem('mail');
  $('#respuesta-correo').html(mail); 

  /* Capturar valor tarjetas */
  $("#btn-tarjeta").click(function(event) {
    if(!(/^\d{8}([0-9])*$/.test($("#tarjeta").val())) ){
        $("#tarjeta").append($("#tarjeta").val("Error"));
    }else{
      var digitos = $("#tarjeta").val();
      $("#tarjetas-creadas").append(`
        
      `)
    }

  });


})
