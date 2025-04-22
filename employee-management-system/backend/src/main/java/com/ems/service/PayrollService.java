package com.ems.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.model.Employee;
import com.ems.model.Payroll;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.PayrollRepository;

@Service
public class PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    public Employee updateSalary(Long employeeId, Double newSalary) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setSalary(newSalary);
        Employee updatedEmployee = employeeRepository.save(employee);

        Payroll payroll = new Payroll();
        payroll.setEmployeeId(employeeId);
        payroll.setAmount(newSalary);
        payroll.setDate(LocalDate.now());
        payrollRepository.save(payroll);

        return updatedEmployee;
    }

    public Employee giveHike(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        double currentSalary = employee.getSalary();
        double hike = currentSalary * 0.10;
        employee.setSalary(currentSalary + hike);
        Employee updatedEmployee = employeeRepository.save(employee);

        Payroll payroll = new Payroll();
        payroll.setEmployeeId(employeeId);
        payroll.setAmount(employee.getSalary());
        payroll.setDate(LocalDate.now());
        payrollRepository.save(payroll);

        return updatedEmployee;
    }
}
