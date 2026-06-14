package com.swapskill.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "skills")
@Data
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skillId;

    private String name;

    private String level; // Beginner, Intermediate, Advanced, Expert

    private String type; // OFFERED or WANTED

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

   
}
