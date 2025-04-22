package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ems.model.Leave;
import com.ems.service.LeaveService;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    @Autowired
    private LeaveService service;

    @GetMapping
    public List<Leave> getLeaves() {
        return service.getAllLeaves();
    }

    @PostMapping
    public Leave saveLeave(@RequestBody Leave leave) {
        return service.saveLeave(leave);
    }

    @DeleteMapping("/{id}")
    public void deleteLeave(@PathVariable Long id) {
        service.deleteLeave(id);
    }

    // ✅ Add this for updating leave
    @PutMapping("/{id}")
    public Leave updateLeave(@PathVariable Long id, @RequestBody Leave leaveDetails) {
        Leave existingLeave = service.getLeaveById(id);
        existingLeave.setEmployeeId(leaveDetails.getEmployeeId());
        existingLeave.setStartDate(leaveDetails.getStartDate());
        existingLeave.setEndDate(leaveDetails.getEndDate());
        existingLeave.setReason(leaveDetails.getReason());
        existingLeave.setStatus(leaveDetails.getStatus());

        return service.saveLeave(existingLeave);
    }
}
