package com.ems.factory;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import com.ems.model.Employee;

public class EmployeeFactory {

    public static Employee createEmployee(String name, String department, String email, Double salary, String joinDate) {
        Employee employee = new Employee();
        employee.setName(name);
        employee.setDepartment(department);
        employee.setEmail(email);
        employee.setSalary(salary);

        // ✅ Parse the String joinDate to LocalDate
        if (joinDate != null && !joinDate.isEmpty()) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // 🧩 format your date string here
            employee.setJoinDate(LocalDate.parse(joinDate, formatter));
        } else {
            employee.setJoinDate(LocalDate.now()); // or you can handle null case separately
        }

        return employee;
    }
}
