import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface SkillDTO {
  skillid?: number;
  name: string;
  level: string;
  type: string; // OFFERED or WANTED
}

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css']
})
export class MySkillsComponent implements OnInit {

  skillForm: FormGroup;
  showAddForm = false;

  offeredSkills: SkillDTO[] = [];
  wantedSkills: SkillDTO[] = [];

  levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // TODO: replace with actual logged-in user id

  userId = Number(localStorage.getItem('userId'));

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.http.get<SkillDTO[]>(
      `http://localhost:8764/api/skills/${this.userId}?type=OFFERED`
    ).subscribe({
      next: (data) => this.offeredSkills = data,
      error: (err) => console.error('Failed to load offered skills', err)
    });

    this.http.get<SkillDTO[]>(
      `http://localhost:8764/api/skills/${this.userId}?type=WANTED`
    ).subscribe({
      next: (data) => this.wantedSkills = data,
      error: (err) => console.error('Failed to load wanted skills', err)
    });
  }

  openAddSkillForm(): void {
    this.skillForm.reset({
      name: '',
      level: '',
      type: ''
    });
    this.showAddForm = true;
  }

  closeAddSkillForm(): void {
    this.showAddForm = false;
  }

  setType(type: string): void {
    this.skillForm.patchValue({ type });
  }

  setLevel(level: string): void {
    this.skillForm.patchValue({ level });
  }

  getLevelValue(level: string): number {
    const map: { [key: string]: number } = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
      Expert: 4
    };

    return map[level] || 0;
  }

  submitSkill(): void {
    if (this.skillForm.invalid) {
      return;
    }

    const skillDTO: SkillDTO = this.skillForm.value;

    this.http.post<SkillDTO>(
      `http://localhost:8764/api/skills/${this.userId}`,
      skillDTO
    ).subscribe({
      next: (saved) => {
        if (saved.type === 'OFFERED') {
          this.offeredSkills.push(saved);
        } else {
          this.wantedSkills.push(saved);
        }

        this.closeAddSkillForm();
      },
      error: (err) => console.error('Failed to add skill', err)
    });
  }

  removeSkill(skill: SkillDTO, type: 'OFFERED' | 'WANTED'): void {
    if (!skill.skillid) {
      return;
    }

    this.http.delete(
      `http://localhost:8764/api/skills/${this.userId}/${skill.skillid}`
    ).subscribe({
      next: () => {
        if (type === 'OFFERED') {
          this.offeredSkills = this.offeredSkills.filter(
            s => s.skillid !== skill.skillid
          );
        } else {
          this.wantedSkills = this.wantedSkills.filter(
            s => s.skillid !== skill.skillid
          );
        }
      },
      error: (err) => console.error('Failed to delete skill', err)
    });
  }
}