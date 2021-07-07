package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Employee;
import com.example.demo.repo.EmployeeRepository;
import com.example.demo.service.EmployeeJsonRespone;
import com.example.demo.service.EmployeeService;



@RestController
public class EmployeeRestController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private EmployeeRepository empRepo;
	
	@RequestMapping(path="/employees", method=RequestMethod.GET)
	public List<Employee> getAllEmployees(){
		return employeeService.getAllEmployees();
	}
    @RequestMapping(value = "/employee/{value}", method = RequestMethod.POST)
	public List<Employee> getEmployeeById(@PathVariable("value") String value){
    	return employeeService.getEmployeeSearch(value);
	}
    @RequestMapping(value = "/employee/edit/{id}", method = RequestMethod.POST)
  	public List<Employee> employeeEdit(@PathVariable("id") int id){
    	List<Employee> list=new ArrayList<Employee>();
        list.add(employeeService.getEmployeeById(id));
        return list;
  	}
    @RequestMapping(value = "/employee/delete/{id}", method = RequestMethod.POST)
  	public List<Employee> deleteEmployee(@PathVariable("id") int id){
    	
    	List<Employee> list=new ArrayList<Employee>();
    	empRepo.deleteById((long) id);
        return list;
  	}
    
    

    @PostMapping(value = "/saveEmployee", produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public EmployeeJsonRespone saveEmployee(@ModelAttribute  Employee employee,
          BindingResult result) {
    	
       empRepo.save(employee);
       EmployeeJsonRespone respone = new EmployeeJsonRespone();
       respone.setEmployee(employee);
       respone.setValidated(true);
       return respone;
    }
 }

   
