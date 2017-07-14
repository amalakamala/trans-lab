$(document).ready(function(){
  /* max num */
  $('input#input_text, textarea#textarea1').characterCounter();
  /* NAV */
  $(".button-collapse").sideNav();
  /* COLLAPSIBLE */
  $('.collapsible').collapsible();
  /* SELECT */
  $('select').material_select();


/*-------- VALIDACIÓN INICIAL --------*/

	$("#sesion").click(function(event){
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

/*-------- PERFIL --------*/
  
  /* DEVOLVER EMAIL en perfil */
  var mail = localStorage.getItem('mail');
  $('#respuesta-correo').html(mail); 

  var contrasena = localStorage.getItem('num-tarjeta');
  console.log(contrasena)
  $('#tarjetas-creadas').append(`
    <div class="caja">
      <h6>`+contrasena+`</h6>
    </div>
  `)
  var arr = [];


  /* Capturar valor tarjetas */
  $("#btn-tarjeta").click(function() {
    if(!(/^\d{8}([0-9])*$/.test($("#tarjeta").val())) ){
        $("#tarjeta").append($("#tarjeta").val("Error"));
    }else{

      var valorIngresado = $("#tarjeta").val();
      arr.push(valorIngresado);
      console.log(arr);

      $("#tarjetas-creadas").append(`
        <div class="caja">
          <h6>`+valorIngresado+`</h6>
        </div>
      `)
      
      localStorage.setItem('todas-tarjetas',arr);

      console.log(localStorage.getItem('todas-tarjetas'));

      console.log(localStorage.getItem('todas-tarjetas', JSON.stringify(arr)));
      
      $("#tarjeta").val("");       
    }

  });


/*-------- LLENAR SELECT --------*/

  var todasTarjetas = localStorage.getItem('todas-tarjetas');
  console.log(localStorage.getItem('todas-tarjetas'));
  var str = JSON.parse('[' + todasTarjetas + ']');
  console.log(str);
  
  str.forEach(function(e){
    $('#el-select').append(`<option value="`+e+`">`+e+`</option>`)
  });

/*-------- SALDO --------*/
  $("#tarjeta-saldo").focus(function(){
    $("#el-select").attr('disabled', '');
  })

  $("#el-select").focus(function(){
    $("#tarjeta-saldo").attr('disabled', '');
    $("#tarjeta-saldo").val("");
  })



  $('#btn-ver-saldo').click(function(){
    $("#tarjeta-saldo").empty();
    console.log($("#tarjeta-saldo").val());

    if(!(/^\d{8}([0-9])*$/.test($("#tarjeta-saldo").val())) ){
      $("#tarjeta-saldo").append($("#tarjeta-saldo").val("Error"));
    }else{     
      console.log($("#tarjeta-saldo").val());
      var valorTarjeta = $("#tarjeta-saldo").val();
      callbacksAjaxBip(valorTarjeta);
      $("#tarjeta-saldo").val("");
    }
  });

  $('#btn-ver-saldo').click(function(){
    $("#tarjeta-saldo").empty();
    if($("#el-select").val() == ""){
      alert("Escoge una opción")
    }else{      
      console.log($("#el-select").val());
      var valorTarjetaS = $("#el-select").val();
      callbacksAjaxBip(valorTarjetaS);
    }
  });

  var callbacksAjaxBip = function(num){
    $.ajax({
      url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=' + num,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response){    
      var elSaldo = response.saldoTarjeta; 
      $("#saldo").html(`
        <div class="caja-saldo">
          <div class="row">
            <div class="col s12 center total-text">
              <h6>SALDO TOTAL</h6>
            </div>
          </div>
          <div class="row">
            <div class="col s12 center saldo-text">
              <h4>`+elSaldo+`</h4>
            </div>
          </div>
        </div> 
      `);
    })  
  }  


})
