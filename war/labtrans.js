$(document).ready(function(e){
	fillReservas();
	fillLocais();
	
	$('#locais').on('change', function(e){
		var id_local = $(this).val();
		fillSalas( id_local );
	});
	
	$('#lista a').on('click', function(e){
		var id = $(this).attr('id');
		var parts = id.split('_');
		var operation = parts[0];
		var id_reserva = parts[1];
		var row_table = parts[2];
		
		executeOperation( operation, id_reserva, row_table );
	});
});


function fillReservas(){
	var dataString = "action=getReservas";
	
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
					        		"<td><a href='#'" + " id='delete_" + data[r].idReserva + "_" + r + "'><img src='images/icons/delete.png' width=12></a></td>" +
					        		"<td><a href='#'" + " id='edit_" + data[r].idReserva  + "_" + r + "'><img src='images/icons/edit.png' width=12></a></td>" +
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
	var dataString = "action=getListLocal";
	
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

function fillSalas( id_local ){
	var dataString = "action=getListSala&id_local=" + id_local;
	
	$.ajax({
        type: "POST",
        url: "Controller",
        data: dataString,
        dataType: "json",
       
        //if received a response from the server
        success: function( data, textStatus, jqXHR) {
        	$("#salas").empty();
        	for(var r = 0; r < data.length; r++){
        		$("#salas").append('<option value="' + data[r].idLocal + '">' + data[r].nmLocal + '</option>');
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
	} else if ( operation == "edit" ){
		
	}
}

function deleteReserva( id_reserva ){
	var dataString = "operation=delete&id_reserva=" + id_reserva;
	
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