package com.swapskill.service;

import com.swapskill.dto.SkillDTO;
import java.util.List;

public interface SkillService {
    SkillDTO addSkill(Long userId, SkillDTO skillDTO);
    List<SkillDTO> getSkillsByType(Long userId, String type);
    void deleteSkill(Long userId, Long skillId);
}
