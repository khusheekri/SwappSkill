package com.swapskill.repository;

import com.swapskill.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUserIdAndType(Long userId, String type);
    List<Skill> findByUserId(Long userId);
}