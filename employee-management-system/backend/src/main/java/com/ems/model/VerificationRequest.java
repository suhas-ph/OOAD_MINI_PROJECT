package com.ems.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerificationRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateName;
    private String email;
    private String position;

    private String degreeCertificatePath;
    private String tenthMarksheetPath;
    private String twelfthMarksheetPath;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private String remarks;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}
