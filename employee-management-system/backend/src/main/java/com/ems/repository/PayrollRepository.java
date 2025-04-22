package com.ems.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Payroll;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    
    // 🔍 Fetch all payroll records for a specific employee
    List<Payroll> findByEmployeeId(Long employeeId);
    
    // ❌ Delete all payroll records for a specific employee
    void deleteByEmployeeId(Long employeeId);
}
