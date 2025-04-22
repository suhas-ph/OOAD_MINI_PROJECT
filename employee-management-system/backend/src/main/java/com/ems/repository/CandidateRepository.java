package com.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ems.model.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    // Additional custom queries (if needed) can be added here
}
