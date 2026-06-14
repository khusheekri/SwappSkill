package com.swapskill.service;

import com.swapskill.dto.SkillDTO;
import com.swapskill.entity.Skill;
import com.swapskill.entity.User;
import com.swapskill.repository.SkillRepository;
import com.swapskill.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public SkillDTO addSkill(Long userId, SkillDTO skillDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Skill skill = new Skill();
        skill.setName(skillDTO.getName());
        skill.setLevel(skillDTO.getLevel());
        skill.setType(skillDTO.getType());
        skill.setUser(user);

        Skill saved = skillRepository.save(skill);

        SkillDTO result = new SkillDTO();
        result.setSkillId(saved.getSkillId());
        result.setName(saved.getName());
        result.setLevel(saved.getLevel());
        result.setType(saved.getType());
        return result;
    }

    @Override
    public List<SkillDTO> getSkillsByType(Long userId, String type) {
        return skillRepository.findByUserIdAndType(userId, type)
                .stream()
                .map(skill -> {
                    SkillDTO dto = new SkillDTO();
                    dto.setSkillId(skill.getSkillId());
                    dto.setName(skill.getName());
                    dto.setLevel(skill.getLevel());
                    dto.setType(skill.getType());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSkill(Long userId, Long skillId) {
        skillRepository.deleteById(skillId);
    }
}