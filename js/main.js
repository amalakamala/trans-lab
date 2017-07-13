$(document).ready(function(){
	$("#sesion").click(function(event) {
		if(!(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test($("#mail").val()))){
   			$("#mail").append($("#mail").val("Error"));
  		}
  		if(!(/^\d{8}([0-9])*$/.test($("#contrasena").val())) ){
   			$("#contrasena").append($("#contrasena").val("Error"));
  		}
  		else{
  			$("#sesion").attr("href","home.html");
  		}
	});
})
