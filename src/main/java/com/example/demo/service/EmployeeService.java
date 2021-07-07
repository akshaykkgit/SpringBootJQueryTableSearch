package com.example.demo.service;


import java.util.List;

import com.example.demo.entity.Employee;



public interface EmployeeService {
	
	public List<Employee> getAllEmployees();
	public Employee getEmployeeById(long id);
	public List<Employee> getEmployeeSearch(String value);
	
	
	
}