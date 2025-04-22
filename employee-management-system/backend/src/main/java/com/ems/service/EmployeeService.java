package com.ems.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee saveEmployee(Employee employee) {
        if (employee.getJoinDate() == null) {
            employee.setJoinDate(LocalDate.now());
        }
        return repository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

        // Update fields only if they are non-null
        if (employeeDetails.getName() != null) employee.setName(employeeDetails.getName());
        if (employeeDetails.getDepartment() != null) employee.setDepartment(employeeDetails.getDepartment());
        if (employeeDetails.getEmail() != null) employee.setEmail(employeeDetails.getEmail());
        if (employeeDetails.getSalary() != null) employee.setSalary(employeeDetails.getSalary());
        if (employeeDetails.getJoinDate() != null) {
            employee.setJoinDate(employeeDetails.getJoinDate());
        } else if (employee.getJoinDate() == null) {
            employee.setJoinDate(LocalDate.now());
        }

        return repository.save(employee);
    }

    public void deleteEmployee(Long id) {
        try {
            repository.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Cannot delete employee with id " + id + " due to related records in payroll.");
        }
    }

    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }

    public List<Employee> searchEmployeesByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}
