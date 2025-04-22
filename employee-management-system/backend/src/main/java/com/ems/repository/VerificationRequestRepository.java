package com.ems.repository;

import com.ems.model.VerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationRequestRepository extends JpaRepository<VerificationRequest, Long> {
}
