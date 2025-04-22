package com.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Custom query method to search by name (case-insensitive partial match)
    List<Employee> findByNameContainingIgnoreCase(String name);

   
}
