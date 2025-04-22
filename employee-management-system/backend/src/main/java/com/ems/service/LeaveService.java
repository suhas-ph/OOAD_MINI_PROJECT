package com.ems.service;

import com.ems.model.Leave;
import com.ems.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository repository;

    // ✅ Get all leaves
    public List<Leave> getAllLeaves() {
        return repository.findAll();
    }

    // ✅ Save new leave
    public Leave saveLeave(Leave leave) {
        return repository.save(leave);
    }

    // ✅ Delete leave
    public void deleteLeave(Long id) {
        repository.deleteById(id);
    }

    // ✅ Get leave by ID (needed for edit)
    public Leave getLeaveById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found with id " + id));
    }

    // ✅ Update leave
    public Leave updateLeave(Long id, Leave leaveDetails) {
        Leave leave = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave not found with id " + id));

        leave.setEmployeeId(leaveDetails.getEmployeeId());
        leave.setStartDate(leaveDetails.getStartDate());
        leave.setEndDate(leaveDetails.getEndDate());
        leave.setReason(leaveDetails.getReason());
        leave.setStatus(leaveDetails.getStatus());

        return repository.save(leave);
    }
}
