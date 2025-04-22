package com.ems.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ems.model.Candidate;
import com.ems.service.CandidateService;

@RestController
@RequestMapping("/api/candidates")
@CrossOrigin(origins = "http://localhost:5173")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    // ✅ Fetch all candidates
    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    // ✅ Apply for a job with 3 certificate uploads
    @PostMapping("/apply")
    public Candidate applyForJob(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("position") String position,
            @RequestParam("degreeCertificate") MultipartFile degreeCertificate,
            @RequestParam("tenthGradeSheet") MultipartFile tenthGradeSheet,
            @RequestParam("twelfthGradeSheet") MultipartFile twelfthGradeSheet
    ) throws IOException {

        Candidate candidate = new Candidate();
        candidate.setName(name);
        candidate.setEmail(email);
        candidate.setPosition(position);

        return candidateService.saveCandidate(candidate, degreeCertificate, tenthGradeSheet, twelfthGradeSheet);
    }
}
