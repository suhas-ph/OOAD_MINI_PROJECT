package com.ems.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor // Lombok will automatically generate the no-argument constructor
@AllArgsConstructor
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long employeeId; // ID of the employee for whom the payroll is created
    private Double amount;   // Amount of the salary, will be updated as needed
    private LocalDate date;  // Date when the payroll record is created (usually the month or date of salary)

    // Optional validation method to check if the payroll data is valid
    public boolean isValid() {
        return employeeId != null && amount != null && amount > 0;
    }
}
