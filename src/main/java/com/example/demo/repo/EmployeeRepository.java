package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Employee;



@Repository("employeeRepository")
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
	@Query("FROM Employee  WHERE name like  %:value% OR email like %:value% OR phone like %:value%")
	List<Employee> getEmployeeSearch(@Param("value") String value );

}