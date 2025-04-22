package com.ems.repository;

import com.ems.model.Leave;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    // No extra methods needed now, can add if needed later ✅
}
