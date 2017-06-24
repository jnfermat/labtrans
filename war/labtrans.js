$(document).ready(function(e){
	fillReservas();
	fillLocais();
	fillPeriodos();
	
	$('#locais').on('change', function(e){
		var id_local = $(this).val();
		if ( id_local != "" )
			fillSalas( id_local );
	});
	
	$('#lista a').on('click', function(e){
		var id = $(this).attr('id');
		var parts = id.split('_');
		var operation = parts[0];
		var id_reserva = parts[1];
		var row_table = parts[2];
		var rows = document.getElementById("lista").rows;
		
		rows[row_table].style.backgroundColor = '#e0e0eb';
		
		$('#btn_insert').hide();
		$('#id_reserva').val( id_reserva );
		
		changeBackground($('#row_table').val(), '#ffffff');
		$('#row_table').val( row_table );
		changeBackground(row_table, '#e0e0eb');
		
		executeOperation( operation, id_reserva, row_table );
	});
	
	$('#btn_insert').on('click', function(e){	
		executeOperation( "insert" );
		$(this).hide();
	});	
	
	$('#btn_save,#btn_cancel').on('click', function(e){
		$("#data_edit").hide();
		$('#btn_insert').show();
		
		var row_table = $('#row_table').val();
		changeBackground(row_table, '#ffffff');
		
		if ( $(this).attr("id") == "btn_save" ){
			var action = parseInt($('#id_reserva').val()) > 0 ? 'write' : 'insert';
			saveReserva( action );
		}
	});
	
	$("#data_edit").hide();
});

function saveReserva(action){
	var idReserva = $("#id_reserva").val();
	var idSala = $("#salas").val();
	var responsavel = $("#responsavel").val();
	var dtIni = $("#year_ini").val() + "-" + $("#month_ini").val() + "-" + $("#day_ini").val() + " " + $("#hr_ini").val() + ":" + $("#min_ini").val() + ":00";
	var dtFim = $("#year_fim").val() + "-" + $("#month_fim").val() + "-" + $("#day_fim").val() + " " + $("#hr_fim").val() + ":" + $("#min_fim").val() + ":00";

	var dataString = "action=" + action +
					"&idReserva=" + idReserva +
					"&idSala=" + idSala +
					"&responsavel=" + responsavel +
					"&dtIni=" + dtIni +
					"&dtFim=" + dtFim;
	
	$.ajax({
        type: "POST",
        headers: { "cache-control": "no-cache" },
        url: "Controller",
		async: false,
		cache: false,
        dataType: "json",
        data: dataString,
        
        success: function( data, textStatus, jqXHR) {
        	if ( !data.sucess ){
        		alert("Não foi possível salvar os dados!");
        	}        	
        },
       
        error: function(jqXHR, textStatus, errorThrown){
             console.log("Something really bad happened " + textStatus);
             alert("Não foi possível salvar os dados!");
        }
    });	
}

function changeBackground(row_table, color){
	if ( row_table != undefined && row_table != "" ){
		var rows = document.getElementById("lista").rows;
		rows[row_table].style.backgroundColor = color;		
	}
}

function fillReservas(){
	var dataString = "action=read&what=getReservas";
	
	$.ajax({
        type: "POST",
        headers: { "cache-control": "no-cache" },
        url: "Controller",
		async: false,
		cache: false,
        dataType: "json",
        data: dataString,
        
        //if received a response from the server
        success: function( data, textStatus, jqXHR) {
        	
        	for(var r = 0; r < data.length; r++){
        		$("#lista").append( "<tr>" + 
					        		"<td>" + data[r].nmLocal + "</td>" +
					        		"<td>" + data[r].nmSala + "</td>" + 
					        		"<td>" + data[r].nmResponsavel + "</td>" + 
					        		"<td>" + data[r].dtInicio + "</td>" + 
					        		"<td>" + data[r].dtTermino + "</td>" + 
					        		"<td><a href='#'" + " id='delete_" + data[r].idReserva + "_" + (r+1) + "'><img src='images/icons/delete.png' width=12></a></td>" +
					        		"<td><a href='#'" + " id='edit_" + data[r].idReserva  + "_" + (r+1) + "'><img src='images/icons/edit.png' width=12></a></td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].idLocal + '">'+ "</td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].idSala + '">'+ "</td>" +
					        		"</tr>" );
        	}
        	
        },
       
        //If there was no resonse from the server
        error: function(jqXHR, textStatus, errorThrown){
             console.log("Something really bad happened " + textStatus);
              //$("#ajaxResponse").html(jqXHR.responseText);
        },
       
        //capture the request before it was sent to server
        beforeSend: function(jqXHR, settings){
            //adding some Dummy data to the request
            settings.data += "&dummyData=whatever";
            //disable the button until we get the response
            //$('#myButton').attr("disabled", true);
        },
       
        //this is called after the response or error functions are finsihed
        //so that we can take some action
        complete: function(jqXHR, textStatus){
            //enable the button 
            //$('#myButton').attr("disabled", false);
        }

    });
}

function fillLocais(){
	var dataString = "action=read&what=getListLocal";
	
	$.ajax({
        type: "POST",
        url: "Controller",
        data: dataString,
        dataType: "json",
       
        //if received a response from the server
        success: function( data, textStatus, jqXHR) {
        	$("#locais").append('<option value=""></option>');
        	for(var r = 0; r < data.length; r++){
        		$("#locais").append('<option value="' + data[r].idLocal + '">' + data[r].nmLocal + '</option>');
        	}
        },
       
        //If there was no resonse from the server
        error: function(jqXHR, textStatus, errorThrown){
             console.log("Something really bad happened " + textStatus);
              //$("#ajaxResponse").html(jqXHR.responseText);
        },
       
        //capture the request before it was sent to server
        beforeSend: function(jqXHR, settings){
            //adding some Dummy data to the request
            settings.data += "&dummyData=whatever";
            //disable the button until we get the response
            //$('#myButton').attr("disabled", true);
        },
       
        //this is called after the response or error functions are finsihed
        //so that we can take some action
        complete: function(jqXHR, textStatus){
            //enable the button 
            //$('#myButton').attr("disabled", false);
        }

    });
}

function fillSalas( id_local, id_sala ){
	var dataString = "action=read&what=getListSala&id_local=" + id_local;
	
	$.ajax({
        type: "POST",
        url: "Controller",
        data: dataString,
        dataType: "json",
       
        //if received a response from the server
        success: function( data, textStatus, jqXHR) {
        	$("#salas").empty();
        	for(var r = 0; r < data.length; r++){
        		if ( id_sala == undefined || (id_sala != undefined && id_sala != data[r].idSala) ){
        			$("#salas").append('<option value="' + data[r].idSala + '">' + data[r].nmSala + '</option>');
        		} else if ( id_sala == data[r].idSala ){
        			$("#salas").append('<option selected value="' + data[r].idSala + '">' + data[r].nmSala + '</option>');
        		}
        	}
        },
       
        //If there was no resonse from the server
        error: function(jqXHR, textStatus, errorThrown){
             console.log("Something really bad happened " + textStatus);
              //$("#ajaxResponse").html(jqXHR.responseText);
        },
       
        //capture the request before it was sent to server
        beforeSend: function(jqXHR, settings){
            //adding some Dummy data to the request
            settings.data += "&dummyData=whatever";
            //disable the button until we get the response
            //$('#myButton').attr("disabled", true);
        },
       
        //this is called after the response or error functions are finsihed
        //so that we can take some action
        complete: function(jqXHR, textStatus){
            //enable the button 
            //$('#myButton').attr("disabled", false);
        }

    });
}

function executeOperation( operation, id_reserva, row_table ){
	
	if ( operation == "delete" ){
		var result = confirm("Deseja realmente excluir a reserva?");
		if ( result )
			deleteReserva( id_reserva );
	} else if ( operation == "edit" || operation == "insert"){
		$("#data_edit").show();
		if ( operation == "edit" )
			fillDataEdit(id_reserva, row_table);
		else
			$('#id_reserva').val('0');
	}
}

function fillDataEdit( id_reserva, row_table ){
	var rows = document.getElementById("lista").rows;
	var idLocal = $(rows[row_table].cells[7].innerHTML).val();
	var idSala = $(rows[row_table].cells[8].innerHTML).val();
	
	$('#locais').val( idLocal );
	fillSalas( idLocal, idSala );
	
	var dtInicio = rows[row_table].cells[3].innerHTML;
	var dtTermino = rows[row_table].cells[4].innerHTML;
	var responsavel = rows[row_table].cells[2].innerHTML;
	
	$('#responsavel').val( responsavel );
	
	$('#day_ini').val( parseInt(dtInicio.substr(0,2)) );
	$('#month_ini').val( parseInt(dtInicio.substr(3,2)) );
	$('#year_ini').val( parseInt(dtInicio.substr(6,4)) );
	$('#hr_ini').val( dtInicio.substr(11,2) );
	$('#min_ini').val( dtInicio.substr(14,2) );
	
	$('#day_fim').val( parseInt(dtTermino.substr(0,2)) );
	$('#month_fim').val( parseInt(dtTermino.substr(3,2)) );
	$('#year_fim').val( parseInt(dtTermino.substr(6,4)) );
	$('#hr_fim').val( dtTermino.substr(11,2) );
	$('#min_fim').val( dtTermino.substr(14,2) );	
}

function deleteReserva( id_reserva ){
	var dataString = "action=delete&idReserva=" + id_reserva;
	
	$.ajax({
        type: "POST",
        url: "Controller",
        data: dataString,
        dataType: "json",
       
        //if received a response from the server
        success: function( data, textStatus, jqXHR) {
        	if ( data.sucess ){
        		$('#lista').deleteRow( row_table );
        	}else{
        		
        	}
        },
       
        //If there was no resonse from the server
        error: function(jqXHR, textStatus, errorThrown){
             console.log("Something really bad happened " + textStatus);
              //$("#ajaxResponse").html(jqXHR.responseText);
        },
       
        //capture the request before it was sent to server
        beforeSend: function(jqXHR, settings){
            //adding some Dummy data to the request
            settings.data += "&dummyData=whatever";
            //disable the button until we get the response
            //$('#myButton').attr("disabled", true);
        },
       
        //this is called after the response or error functions are finsihed
        //so that we can take some action
        complete: function(jqXHR, textStatus){
            //enable the button 
            //$('#myButton').attr("disabled", false);
        }

    });
}

function fillPeriodos(){
	var arrayMonth = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	var currentTime = new Date();
	var currentDay = currentTime.getDate();
	var currentMonth = currentTime.getMonth() + 1;
	var currentYear = currentTime.getFullYear();
	
	for(var d=1; d < 32; d++){
		$("#day_ini").append('<option value="' + d + '">' + d + '</option>');
		$("#day_fim").append('<option value="' + d + '">' + d + '</option>');
	}
	
	for(var m=1; m < 13; m++){
		$("#month_ini").append('<option value="' + m + '">' + arrayMonth[m - 1] + '</option>');
		$("#month_fim").append('<option value="' + m + '">' + arrayMonth[m - 1] + '</option>');
	}
	
	for(var y=currentYear; y < currentYear+10; y++){
		$("#year_ini").append('<option value="' + y + '">' + y + '</option>');
		$("#year_fim").append('<option value="' + y + '">' + y + '</option>');
	}
	
	$('input[name=hr_inicio').val( currentTime.getHours() );
	$('input[name=min_inicio').val( "00" );
	$('input[name=hr_termino').val( "00" );
	$('input[name=min_termino').val( "00" );	
}