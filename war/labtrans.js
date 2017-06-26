$(document).ready(function(e){
	fillReservas();
	fillLocais();
	fillPeriodos();
	
	$('#locais').on('change', function(e){
		var id_local = $(this).val();
		if ( id_local != "" )
			fillSalas( id_local );
	});
	
	activeEventsDeleteEdit();
	
	$('#btn_insert').on('click', function(e){	
		executeOperation( "insert" );
		$(this).hide();
		$('#div_nr_pessoas').hide();
	});	
	
	$('#btn_save,#btn_cancel').on('click', function(e){
		var row_table = $('#row_table').val();
		changeBackground(row_table, '#ffffff');
		
		if ( $(this).attr("id") == "btn_save" ){
			var idReserva = parseInt($('#id_reserva').val());
			var action = idReserva > 0 ? 'write' : 'insert';
			if ( validate( action, idReserva ) ){
				saveReserva( action );
				fillReservas();
				activeEventsDeleteEdit();
			}else{
				return;
			}
		}
		$("#data_edit").hide();
		$('#btn_insert').show();
		clearDataEdit();
	});
	
	$('#cafe').on('change', function(e){
		if ( $(this).is(':checked') )
			$('#div_nr_pessoas').show();
		else
			$('#div_nr_pessoas').hide();
	});
		
	$("#data_edit").hide();
});

function alignColumnTable(){
	var myTable = document.getElementById('lista');
	var rows =  myTable.rows;
	var firstRow = rows[0];
	var secondRow = rows[1];
	
	if ( secondRow != undefined ){
		var cellsFirstRow = firstRow.cells;
		var cellsSecondRow = secondRow.cells;
		
		for(var c=0; c < 6; c++){
			$(cellsFirstRow[c]).width( $(cellsSecondRow[c]).width() );
		}
	}
}
function activeEventsDeleteEdit(){
	$('#lista a').on('click', function(e){
		var id = $(this).attr('id');
		var parts = id.split('_');
		var operation = parts[0];
		var id_reserva = parts[1];
		var row_table = parts[2];
		var rows = document.getElementById("lista").rows;
		
		$('#btn_insert').hide();
		$('#id_reserva').val( id_reserva );
		
		changeBackground( $('#row_table').val(), '#ffffff' );
		changeBackground( row_table, '#e0e0eb' );
		$('#row_table').val( row_table );

		executeOperation( operation, id_reserva, row_table );
	});

}

function clearDataEdit(){
	$("#responsavel").val("");
	$("#descricao").val("");
	$("#nr_pessoas").val("0");
	$("#cafe").prop("checked", false);
}

function saveReserva(action){
	var idReserva = $("#id_reserva").val();
	var idSala = $("#salas").val();
	var responsavel = $("#responsavel").val();
	var nrPessoas = $("#cafe").is(':checked') ? $("#nr_pessoas").val() : '0';
	var cafe = $("#cafe").is(':checked') ? 'S' : 'N';
	var descricao = $("#descricao").val();
	var dtIni = $("#year_ini").val() + "-" + $("#month_ini").val() + "-" + $("#day_ini").val() + " " + $("#horario_ini option:selected").text() + ":00";
	var dtFim = $("#year_fim").val() + "-" + $("#month_fim").val() + "-" + $("#day_fim").val() + " " + $("#horario_fim option:selected").text() + ":00";

	var dataString = "action=" + action +
					"&idReserva=" + idReserva +
					"&idSala=" + idSala +
					"&responsavel=" + responsavel +
					"&descricao=" + descricao +
					"&nrPessoas=" + nrPessoas +
					"&cafe=" + cafe +
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
	var rows = document.getElementById("lista").rows;
	if ( row_table != undefined && row_table != "" && row_table < (rows.length - 1) ){
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
        
        success: function( data, textStatus, jqXHR) {
        	for(var i=document.getElementById("lista").rows.length - 1; i > 0; i--){
        		document.getElementById("lista").deleteRow(i);
        	}

        	for(var r = 0; r < data.length; r++){
        		$("#lista").append( "<tr>" + 
					        		"<td>" + data[r].nmLocal + "</td>" +
					        		"<td>" + data[r].nmSala + "</td>" + 
					        		"<td>" + data[r].nmResponsavel + "</td>" + 
					        		"<td>" + data[r].dtInicio + "</td>" + 
					        		"<td>" + data[r].dtTermino + "</td>" + 
					        		"<td>" + data[r].descricao + "</td>" +
					        		"<td><a href='#'" + " id='delete_" + data[r].idReserva + "_" + (r+1) + "'><img src='images/icons/delete.png' width=12></a></td>" +
					        		"<td><a href='#'" + " id='edit_" + data[r].idReserva  + "_" + (r+1) + "'><img src='images/icons/edit.png' width=12></a></td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].idLocal + '">'+ "</td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].idSala + '">'+ "</td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].cafe + '">'+ "</td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].nrPessoas + '">'+ "</td>" +
					        		"<td>" + '<input type="hidden" value="' + data[r].idReserva + '">'+ "</td>" +
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
	alignColumnTable();
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
		if ( result ){
			deleteReserva( id_reserva );
			fillReservas();
			activeEventsDeleteEdit();
		}else{
			changeBackground(row_table, '#ffffff');
		}
		$('#btn_insert').show();
	} else if ( operation == "edit" || operation == "insert"){
		$("#data_edit").show();
		if ( operation == "edit" )
			fillDataEdit(id_reserva, row_table);
		else{
			$('#id_reserva').val('0');
			setPeriodosInitial();
		}
	}
}

function fillDataEdit( id_reserva, row_table ){
	var rows = document.getElementById("lista").rows;
	var idLocal = $(rows[row_table].cells[8].innerHTML).val();
	var idSala = $(rows[row_table].cells[9].innerHTML).val();
	
	$('#locais').val( idLocal );
	fillSalas( idLocal, idSala );
	
	var responsavel = rows[row_table].cells[2].innerHTML;
	var dtInicio = rows[row_table].cells[3].innerHTML;
	var dtTermino = rows[row_table].cells[4].innerHTML;
	var descricao = rows[row_table].cells[5].innerHTML;
	var cafe = $(rows[row_table].cells[10].innerHTML).val();
	var nrPessoas = $(rows[row_table].cells[11].innerHTML).val();
	
	$('#descricao').val( descricao );
	$('#responsavel').val( responsavel );
	$('#nr_pessoas').val( nrPessoas );
	
	if ( cafe == 'S' ){
		$('#cafe').prop('checked', true);
		$('#div_nr_pessoas').show();
	}else{
		$('#cafe').prop('checked', false);
		$('#div_nr_pessoas').hide();
	}
	
	$('#day_ini').val( parseInt(dtInicio.substr(0,2)) );
	$('#month_ini').val( parseInt(dtInicio.substr(3,2)) );
	$('#year_ini').val( parseInt(dtInicio.substr(6,4)) );
	$('#horario_ini').val( parseInt(dtInicio.substr(11,2)) );
	
	$('#day_fim').val( parseInt(dtTermino.substr(0,2)) );
	$('#month_fim').val( parseInt(dtTermino.substr(3,2)) );
	$('#year_fim').val( parseInt(dtTermino.substr(6,4)) );
	$('#horario_fim').val( parseInt(dtTermino.substr(11,2)) );
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
        	if ( !data.sucess ){
        		alert('Erro da esclusão do registro!');
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

function setPeriodosInitial(){
	var currentTime = new Date();
	var currentDay = currentTime.getDate();
	var currentMonth = currentTime.getMonth() + 1;
	var currentYear = currentTime.getFullYear();
	
	$("#day_ini").val(currentDay);
	$("#day_fim").val(currentDay);
	
	$("#month_ini").val(currentMonth);
	$("#month_fim").val(currentMonth);
		
	$('#horario_ini').val( currentTime.getHours() );
	$('#horario_fim').val( currentTime.getHours()+1 );
}

function fillPeriodos(){
	var arrayMonth = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
	
	for(var d=1; d < 32; d++){
		$("#day_ini").append('<option value="' + d + '">' + d + '</option>');
		$("#day_fim").append('<option value="' + d + '">' + d + '</option>');
	}
	
	for(var m=1; m < 13; m++){
		$("#month_ini").append('<option value="' + m + '">' + arrayMonth[m - 1] + '</option>');
		$("#month_fim").append('<option value="' + m + '">' + arrayMonth[m - 1] + '</option>');
	}
	
	var currentTime = new Date();
	var currentYear = currentTime.getFullYear();
	for(var y=currentYear; y < currentYear+10; y++){
		$("#year_ini").append('<option value="' + y + '">' + y + '</option>');
		$("#year_fim").append('<option value="' + y + '">' + y + '</option>');
	}
	
	for(var h=0; h < 24; h++){
		$("#horario_ini").append('<option value="' + h + '">' + (h < 10 ? '0'+h+':00' : h+':00') + '</option>');
		$("#horario_fim").append('<option value="' + h + '">' + (h < 10 ? '0'+h+':00' : h+':00') + '</option>');
	}	
}

function validate( action, idReserva ){
	var idSala = $('#salas').val();
	var nmResponsavel = $('#responsavel').val();
	var descricao = $('#descricao').val();
	var dayIni = $('#day_ini').val();
	var monthIni = $('#month_ini').val();
	var yearIni = $('#year_ini').val();
	var dayFim = $('#day_fim').val();
	var monthFim = $('#month_fim').val();
	var yearFim = $('#year_fim').val();
	var hrIni = $('#horario_ini').val();
	var hrFim = $('#horario_fim').val();
	
	var result = true;
	var dateIni = new Date(yearIni, parseInt(monthIni) - 1, dayIni, hrIni.substr(0,2), 0, 0);
	var dateFim = new Date(yearFim, parseInt(monthFim) - 1, dayFim, hrFim.substr(0,2), 0, 0);
	
	if ( idSala == null || idSala == "" ){
		result = false;
		alert("Você deve informar a sala.");
	} else if ( nmResponsavel == null || nmResponsavel == "" ){
		result = false;
		alert("Você deve informar o nome do responsável.");
	} else if ( descricao == null || descricao == "" ){
		result = false;
		alert("Você deve informar a descrição.");
	} else if ( dateFim.getTime() <= dateIni.getTime() ){
		result = false;
		alert("Data/hora final da reserva deve ser maior que inicial.");
	} else if ( existsReserva(action, dateIni, dateFim, idSala, idReserva) ){
		result = false;
		alert("Essa sala já está reserva para outro horário.");
	} else if ( $('#cafe').is(':checked') ){
		if ( isNaN($('#nr_pessoas').val()) || (!isNaN($('#nr_pessoas').val()) && parseInt($('#nr_pessoas').val()) == 0) ){
			result = false;
			alert("Você deve informar o número de pessoas.");
		}
	}
	
	return result;
}

function existsReserva(action, pDateIni, pDateFim, pIdSala, pIdReserva){
	var rows =  document.getElementById('lista').rows;
	var result = false;
	
	for(var r=1; r < rows.length; r++){
		var dataCells = rows[r].cells;
		var dInicio = dataCells[3].innerHTML;
		var dTermino = dataCells[4].innerHTML;
		var idSala = $(dataCells[9].innerHTML).val();
		var idReserva = $(dataCells[12].innerHTML).val();
		var dateIni = new Date(dInicio.substr(6,4), parseInt(dInicio.substr(3,2)) - 1, dInicio.substr(0,2), dInicio.substr(11,2), 0, 0);
		var dateFim = new Date(dTermino.substr(6,4), parseInt(dTermino.substr(3,2) - 1), dTermino.substr(0,2), dTermino.substr(11,2), 0, 0);
		
		if ( pIdSala == idSala && idReserva != pIdReserva && ((dateIni.getTime() <= pDateIni.getTime() && pDateIni.getTime() < dateFim.getTime()) || (dateIni.getTime() < pDateFim.getTime() && pDateFim.getTime() <= dateFim.getTime())) ){
			result = true;
			break;
		}
	}
	return result;	
}