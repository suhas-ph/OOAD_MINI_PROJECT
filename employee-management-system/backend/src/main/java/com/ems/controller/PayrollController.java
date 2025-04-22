package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.model.Employee;
import com.ems.model.Payroll;
import com.ems.service.PayrollService;

@RestController
@RequestMapping("/api/payrolls")
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    // Get all payroll records (optional, if you want to see payroll table)
    @GetMapping
    public List<Payroll> getPayrolls() {
        return payrollService.getAllPayrolls();
    }

    // Apply hike to employee salary
    @PutMapping("/hike/{employeeId}")
    public Employee giveHike(@PathVariable Long employeeId) {
        return payrollService.giveHike(employeeId);
    }

    // Update employee salary directly
    @PutMapping("/update-salary/{employeeId}")
    public Employee updateSalary(@PathVariable Long employeeId, @RequestBody Employee employeeDetails) {
        return payrollService.updateSalary(employeeId, employeeDetails.getSalary());
    }
}
