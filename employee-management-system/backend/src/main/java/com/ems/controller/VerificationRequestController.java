package com.ems.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ems.model.VerificationRequest;
import com.ems.service.VerificationRequestService;

@RestController
@RequestMapping("/api/verifications")
@CrossOrigin(origins = "http://localhost:5173")
public class VerificationRequestController {

    @Autowired
    private VerificationRequestService service;

    @PostMapping("/candidate/{id}")
    public VerificationRequest createFromCandidate(@PathVariable Long id) {
        return service.createRequestFromCandidate(id);
    }

    @GetMapping
    public List<VerificationRequest> getAll() {
        return service.getAllRequests();
    }

    @PutMapping("/{id}")
    public VerificationRequest updateStatus(
            @PathVariable Long id,
            @RequestParam VerificationRequest.Status status,
            @RequestParam String remarks
    ) {
        return service.updateStatus(id, status, remarks);
    }
}
