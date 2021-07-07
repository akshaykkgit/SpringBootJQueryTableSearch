$(document).ready( function () {
	
	 $("#editForm").hide();
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
				  { "data": "active" },  
			]
	 })
	
}


function searchByValue() {
	
	$("#editForm").hide();
	var searchVal =document.getElementById("search").value;
	$('#employeesTable').dataTable().fnClearTable();
   // $('#employeesTable').dataTable().fnDestroy();
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/employee/"+searchVal,
        data: searchVal,
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
        var jsonString = JSON.stringify(searchVal);     
        $("#employeesTable").empty();     
        $.each(data, (i, employee) => {  
            let tr_id = 'tr_' + employee.id;
            let url ="/employee/edit/"+ employee.id;
            var obj = {};
            obj=employee;
            let employeeRow = '<tr>' +
      	  						  '<td>' + employee.id + '</td>' +
		                		  '<td>' + employee.name + '</td>' +
		                		  '<td>' + employee.lastName + '</td>' +
		                		  '<td>' + employee.email + '</td>' +
		                          '<td>' + employee.phone + '</td>' +
		                          '<td>' + employee.active + '</td>' +     
		                          '<td>' + '<input type="hidden" name = "eid" value="'+employee.id+'"><input type="button" value ="Edit" id="EditRecord">' + '</td>' +
		                          '<td>' + '<input type="button" value ="Delete" id="ButtonDeleteRecord">' + '</td>' +
		                       '</tr>';  
            $('#employeesTable').append(employeeRow);
          });
          
          $('#employeesTable tr').click(function(a) {
          var id = $(this).closest('tr').children('td:eq(0)').text(); //get the text from first col of current row
          var url= a.target.id ==="EditRecord" ? "/employee/edit/"+id : "/employee/delete/"+id;
		  $.ajax({
		        type: "POST",
		        contentType: "application/json",
		        url: url,
		        data: id,
		        dataType: 'json',
		        cache: false,
		        timeout: 600000,
		        success: function (data) {
		            if(data.length>0) {
			           $("#tabledata").hide();
			           $("#editForm").show();
			           $('#id').val( data[0].id);
			           $('#name').val( data[0].name);
			           $('#lastName').val( data[0].lastName);
			           $('#email').val( data[0].email);
			           $('#phone').val( data[0].phone);
			           let emp=data; 
			        } else {
			        	alert("record deleted");
			            window.location.reload();
			        }  
		        },
		        error: function (e) {
			        alert(e);
		            console.log("ERROR : ", e);
		        }
            });       

       });
   
      },
      error: function (e) {
	
            console.log("ERROR : ", e);
      }
 });

}

function formSubmit(){

	 $.post({
         url : 'saveEmployee',
         data : $('form[name=employeeForm]').serialize(),
         success : function(res) {
         
            if(res.validated){  
               alert( "'"+res.employee.name +"' employee Data updated.");
               window.location.reload();
 
            }else{
              //Set error messages
              alert( "Not a valid data");
            }
         }
         
      });    
}

