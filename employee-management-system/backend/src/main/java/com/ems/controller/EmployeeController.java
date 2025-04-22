package com.ems.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.model.Employee;
import com.ems.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173") // ✅ CORS Handling
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    // ✅ Get all employees
    @GetMapping
    public List<Employee> getEmployees() {
        return service.getAllEmployees();
    }

    // ✅ Create employee
    @PostMapping
    public Employee saveEmployee(@RequestBody Employee employee) {
        System.out.println("Received Employee: " + employee);

        // ✅ Ensure joinDate is not null, set it to current date if missing
        if (employee.getJoinDate() == null) {
            employee.setJoinDate(LocalDate.now());
        }

        // ✅ Ensure salary is set during creation (if not already set)
        if (employee.getSalary() == null || employee.getSalary() <= 0) {
            throw new RuntimeException("Salary must be a positive value");
        }

        return service.saveEmployee(employee);
    }

    // ✅ Update employee
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = service.getEmployeeById(id);

        if (employee == null) {
            throw new RuntimeException("Employee not found with id " + id);
        }

        // Update employee details
        employee.setName(employeeDetails.getName());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setEmail(employeeDetails.getEmail());

        // Update salary, if a new salary is provided
        if (employeeDetails.getSalary() != null && employeeDetails.getSalary() > 0) {
            employee.setSalary(employeeDetails.getSalary());
        }

        // Update joinDate, if provided
        if (employeeDetails.getJoinDate() != null) {
            employee.setJoinDate(employeeDetails.getJoinDate());
        }

        // Save the updated employee
        return service.saveEmployee(employee);
    }

    // ✅ Delete employee
    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        service.deleteEmployee(id);
    }
}
