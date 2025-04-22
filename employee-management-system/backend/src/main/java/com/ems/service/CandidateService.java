package com.ems.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ems.model.Candidate;
import com.ems.model.VerificationRequest;
import com.ems.model.VerificationRequest.Status;
import com.ems.repository.CandidateRepository;
import com.ems.repository.VerificationRequestRepository;

@Service
public class CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VerificationRequestRepository verificationRequestRepository;

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate saveCandidate(Candidate candidate, MultipartFile degreeFile, MultipartFile tenthFile, MultipartFile twelfthFile) throws IOException {
        // Set upload directory
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        // Save files
        String degreePath = saveFile(uploadDir, degreeFile);
        String tenthPath = saveFile(uploadDir, tenthFile);
        String twelfthPath = saveFile(uploadDir, twelfthFile);

        candidate.setDegreeCertificatePath(degreePath);
        candidate.setTenthGradeSheetPath(tenthPath);
        candidate.setTwelfthGradeSheetPath(twelfthPath);
        candidate.setVerificationStatus("PENDING");

        Candidate savedCandidate = candidateRepository.save(candidate);

        // Automatically create a verification request
        VerificationRequest request = new VerificationRequest();
        request.setCandidateName(savedCandidate.getName());
        request.setEmail(savedCandidate.getEmail());
        request.setPosition(savedCandidate.getPosition());
        request.setDegreeCertificatePath(degreePath);
        request.setTenthMarksheetPath(tenthPath);
        request.setTwelfthMarksheetPath(twelfthPath);
        request.setStatus(Status.PENDING);
        request.setRemarks("");

        verificationRequestRepository.save(request);

        return savedCandidate;
    }

    private String saveFile(String uploadDir, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename().replaceAll("\\s+", "_");
        File destinationFile = new File(uploadDir, fileName);
        file.transferTo(destinationFile);
        return "uploads/" + fileName;
    }
}
