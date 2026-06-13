import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  auth = inject(AuthService);
  user$ = this.auth.currentUser$;

  navItems = [
    { label: 'Dashboard', icon: '⊞', route: '/dashboard' },
    { label: 'My Skills', icon: '✦', route: '/skills' },
    { label: 'Find Matches', icon: '◎', route: '/matching' },
    { label: 'AI Roadmap', icon: '◈', route: '/roadmap' },
    { label: 'Chat', icon: '◻', route: '/chat' },
    { label: 'Sessions', icon: '▷', route: '/session' }
  ];

  logout(): void { this.auth.logout(); }
}