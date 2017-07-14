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
      `);
      
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

  str.forEach(function(e){
    $('#select-tarjeta').append(`<option value="`+e+`">`+e+`</option>`)
  });

/*-------- SALDO --------*/

/* BLOQUEO SEGUN CLICK
  $("#tarjeta-saldo").focus(function(){
    $("#el-select").attr('disabled', '');
  })

  $("#el-select").focus(function(){
    $("#tarjeta-saldo").attr('disabled', '');
    $("#tarjeta-saldo").val("");
  })
*/

  $('#btn-ver-saldo').click(function(){
    $("#saldo").empty();
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
    $("#saldo").empty();
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
    });  
  }  

/*-------- TARIFA --------*/

/* BLOQUEO SEGUN CLICK
  $("#tarjeta-numero").click(function(){
    $("#select-tarjeta").attr('disabled', '');
    $("#select-vacio-tarifa").removeClass(".remove");
  })

  $("#select-vacio-tarifa").click(function(){
      $("#select-tarjeta").removeAttr('disabled', true);
  });

  $("#select-tarjeta").click(function(){
    $("#tarjeta-numero").attr('disabled', '');
    $("#div-vacio-tarjeta").removeClass(".remove");
  })

  $("#div-vacio-tarjeta").click(function(){
      $("#tarjeta-numero").removeAttr('disabled', true);
  });
*/

  $('#btn-calcular').click(function(){
    $("#lo-calculado").empty();
    console.log($("#tarjeta-numero").val());

    if(!(/^\d{8}([0-9])*$/.test($("#tarjeta-numero").val())) ){
      $("#tarjeta-numero").append($("#tarjeta-numero").val("Error"));
    }else{  
      callbacksAjaxBipTarifa($("#tarjeta-numero").val());
    }
  });

  $('#btn-calcular').click(function(){
    $("#lo-calculado").empty();
    if($("#select-tarjeta").val() == ""){
      alert("Escoge una opción")
    }else{      
      console.log($("#select-tarjeta").val());
      callbacksAjaxBipTarifaSelect($("#select-tarjeta").val());
    }
  });

  var callbacksAjaxBipTarifa = function(num){
    $.ajax({
      url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=' + num,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response){    
      var saldo = response.saldoTarjeta;
      console.log(saldo);
      var corte = saldo.slice(1,saldo.length);
      var saldoFinal = corte.replace(".","");
      console.log(saldoFinal);

      if($("#select-tarifa").val() == ""){
        aler("Selecciona Horario Valido");
      }else if($("#select-tarifa").val() == "740"){
        var alto = parseInt(saldoFinal) - 740;
        console.log(alto);
        var text = $("#lo-calculado").append(`
          <div class="caja-valor-horario">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>COSTO PASAJE</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4> $ 740 </h4>
              </div>
            </div>
          </div>           
          <div class="caja-tarifa">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>SALDO FINAL</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4>$`+ alto +`</h4>
              </div>
            </div>
          </div> 
        `)
        return text;        
      }else if($("#select-tarifa").val() == "680"){
        var medio = parseInt(saldoFinal) - 680;
        console.log(medio);
        var text = $("#lo-calculado").append(`
          <div class="caja-valor-horario">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>COSTO PASAJE</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4> $ 740 </h4>
              </div>
            </div>
          </div>           
          <div class="caja-tarifa">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>SALDO FINAL</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4>$`+ medio +`</h4>
              </div>
            </div>
          </div> 
        `)
        return text;  
      }else if($("#select-tarifa").val() == "640"){
        var bajo = parseInt(saldoFinal) - 640;
        console.log(bajo);
        var text = $("#lo-calculado").append(`
          <div class="caja-valor-horario">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>COSTO PASAJE</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4> $ 740 </h4>
              </div>
            </div>
          </div>           
          <div class="caja-tarifa">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>SALDO FINAL</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4>$`+ bajo +`</h4>
              </div>
            </div>
          </div> 
        `)
        return text; 
      }                
    });
  }

  var callbacksAjaxBipTarifaSelect = function(num){
    $.ajax({
      url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=' + num,
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response){    
      var saldo = response.saldoTarjeta;
      console.log(saldo);
      var corte = saldo.slice(1,saldo.length);
      var saldoFinal = corte.replace(".","");
      console.log(saldoFinal);

      if($("#select-tarifa").val() == ""){
        aler("Selecciona Horario Valido");
      }else if($("#select-tarifa").val() == "740"){
        var alto = parseInt(saldoFinal) - 740;
        console.log(alto);
        var text = $("#lo-calculado").append(`
          <div class="caja-valor-horario">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>COSTO PASAJE</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4> $ 740 </h4>
              </div>
            </div>
          </div>           
          <div class="caja-tarifa">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>SALDO FINAL</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4>$`+ alto +`</h4>
              </div>
            </div>
          </div> 
        `)
        return text;        
      }else if($("#select-tarifa").val() == "680"){
        var medio = parseInt(saldoFinal) - 680;
        console.log(medio);
        var text = $("#lo-calculado").append(`
          <div class="caja-valor-horario">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>COSTO PASAJE</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4> $ 740 </h4>
              </div>
            </div>
          </div>           
          <div class="caja-tarifa">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>SALDO FINAL</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4>$`+ medio +`</h4>
              </div>
            </div>
          </div> 
        `)
        return text;  
      }else if($("#select-tarifa").val() == "640"){
        var bajo = parseInt(saldoFinal) - 640;
        console.log(bajo);
        var text = $("#lo-calculado").append(`
          <div class="caja-valor-horario">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>COSTO PASAJE</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4> $ 740 </h4>
              </div>
            </div>
          </div>           
          <div class="caja-tarifa">
            <div class="row">
              <div class="col s12 center total-text">
                <h6>SALDO FINAL</h6>
              </div>
            </div>
            <div class="row">
              <div class="col s12 center saldo-text">
                <h4>$`+ bajo +`</h4>
              </div>
            </div>
          </div> 
        `)
        return text; 
      }                
    });
  } 
});
