import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface UserDTO {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userDTO: UserDTO | null = null;
  isDark = false;
  showProfileModal = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: replace with real API call to fetch logged-in user
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userDTO = JSON.parse(stored);
    } else {
      this.userDTO = {
        name: 'Khushee',
        email: 'khushee@example.com',
        role: 'Student'
      };
    }

    const theme = localStorage.getItem('theme');
    this.isDark = theme === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.isDark);
  }

  openProfile(): void {
    this.showProfileModal = true;
  }

  closeProfile(): void {
    this.showProfileModal = false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}