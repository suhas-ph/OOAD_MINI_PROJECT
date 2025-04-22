package com.ems.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ems.model.Candidate;
import com.ems.model.Employee;
import com.ems.model.VerificationRequest;
import com.ems.repository.CandidateRepository;
import com.ems.repository.EmployeeRepository;
import com.ems.repository.VerificationRequestRepository;

@Service
public class VerificationRequestService {

    @Autowired
    private VerificationRequestRepository verificationRequestRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * Optional fallback – create a verification request manually from candidate
     */
    public VerificationRequest createRequestFromCandidate(Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        VerificationRequest request = new VerificationRequest();
        request.setCandidateName(candidate.getName());
        request.setEmail(candidate.getEmail());
        request.setPosition(candidate.getPosition());
        request.setDegreeCertificatePath(candidate.getDegreeCertificatePath());
        request.setTenthMarksheetPath(candidate.getTenthGradeSheetPath());
        request.setTwelfthMarksheetPath(candidate.getTwelfthGradeSheetPath());
        request.setStatus(VerificationRequest.Status.PENDING);
        request.setRemarks("Awaiting review");

        return verificationRequestRepository.save(request);
    }

    /**
     * Get all verification requests
     */
    public List<VerificationRequest> getAllRequests() {
        return verificationRequestRepository.findAll();
    }

    /**
     * Update status of a verification request
     */
    public VerificationRequest updateStatus(Long id, VerificationRequest.Status status, String remarks) {
        VerificationRequest request = verificationRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Verification request not found"));

        request.setStatus(status);
        request.setRemarks(remarks);

        // ✅ If APPROVED → promote to Employee if not already exists
        if (status == VerificationRequest.Status.APPROVED) {
            boolean alreadyExists = employeeRepository.findAll().stream()
                    .anyMatch(emp -> emp.getEmail() != null &&
                            emp.getEmail().equalsIgnoreCase(request.getEmail()));

            if (!alreadyExists) {
                Employee employee = new Employee();
                employee.setName(request.getCandidateName());
                employee.setEmail(request.getEmail());
                employee.setDepartment(request.getPosition());
                employee.setJoinDate(LocalDate.now());
                employee.setSalary(500000.0); // Default starting salary

                employeeRepository.save(employee);
            }
        }

        return verificationRequestRepository.save(request);
    }
}
