package com.swapskill.api;

import com.swapskill.dto.SkillDTO;
import com.swapskill.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillAPI {

    @Autowired
    private SkillService skillService;

    @PostMapping("/{userId}")
    public ResponseEntity<SkillDTO> addSkill(@PathVariable Long userId,
                                              @Valid @RequestBody SkillDTO skillDTO) throws Exception {
        SkillDTO saved = skillService.addSkill(userId, skillDTO);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<SkillDTO>> getSkills(@PathVariable Long userId,
                                                      @RequestParam String type) throws Exception {
        List<SkillDTO> skills = skillService.getSkillsByType(userId, type);
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/{skillId}")
    public ResponseEntity<String> deleteSkill(
            @PathVariable Long userId,
            @PathVariable Long skillId) {

        skillService.deleteSkill(userId, skillId);

        return ResponseEntity.ok("Deleted");
    }
}