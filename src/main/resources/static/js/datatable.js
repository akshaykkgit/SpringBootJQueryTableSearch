$(document).ready( function () {
	
	
	 var table = $('#employeesTable').DataTable({
			//"sAjaxSource":[],
			"destroy": true,
			"sAjaxDataProp": "",
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			    { "data": "id"},
		      { "data": "name" },
				  { "data": "lastName" },
				  { "data": "email" },
				  { "data": "phone" },
				  { "data": "active" }
			]
	 })
	 
	 $('#employeesTable').DataTable( {
    destroy: true,
    searching: false } );
});

function clearAll() {
		$("#employeesTable").empty();
}

function loadAll() {
	
	
    $('#employeesTable').dataTable().fnClearTable();
    $('#employeesTable').dataTable().fnDestroy();
    
	$("#employeesTable").empty();
	
	 var table = $('#employeesTable').DataTable({
			"sAjaxSource": "/employees",
			"sAjaxDataProp": "",
			"order": [[ 0, "asc" ]],
			"aoColumns": [
			    { "data": "id"},
		      { "data": "name" },
				  { "data": "lastName" },
				  { "data": "email" },
				  { "data": "phone" },
				  { "data": "active" }
			]
	 })
	
}


function searchByValue() {
	
	var id =document.getElementById("search").value;
	//$("#employeesTable").empty();
	
	$('#employeesTable').dataTable().fnClearTable();
   // $('#employeesTable').dataTable().fnDestroy();
	
	
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/employee/"+id,
        data: id,
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

           var jsonString = JSON.stringify(data);
           
           $("#employeesTable").empty();
          
           
       $.each(data, (i, employee) => {  
            let tr_id = 'tr_' + employee.id;
            let employeeRow = '<tr>' +
      	  						  '<td>' + employee.id + '</td>' +
		                		  '<td>' + employee.name + '</td>' +
		                		  '<td>' + employee.lastName + '</td>' +
		                		  '<td>' + employee.email + '</td>' +
		                          '<td>' +  employee.phone + '</td>' +
		                          '<td>' + employee.active + '</td>' +
		                          
		                       '</tr>';
            $('#employeesTable').append(employeeRow);
          });              
          
           
         

        },
        error: function (e) {

         

            console.log("ERROR : ", e);
           

        }
    });

}



