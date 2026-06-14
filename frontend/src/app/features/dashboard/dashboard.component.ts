import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Match {
  name: string;
  teaches: string;
  wants: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId = Number(localStorage.getItem('userId'));

  stats = {
    offered: 0,
    wanted: 0,
    matches: 0,
    sessions: 0
  };

  recentMatches: Match[] = [];

  requests = {
    pending: 0,
    accepted: 0,
    rejected: 0
  };

  feedbackEmail = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {

    this.http.get<any[]>(
      `http://localhost:8764/api/skills/${this.userId}?type=OFFERED`
    ).subscribe({
      next: (offered) => {
        this.stats.offered = offered.length;
      },
      error: (err) => {
        console.error('Failed to load offered skills', err);
      }
    });

    this.http.get<any[]>(
      `http://localhost:8764/api/skills/${this.userId}?type=WANTED`
    ).subscribe({
      next: (wanted) => {
        this.stats.wanted = wanted.length;
      },
      error: (err) => {
        console.error('Failed to load wanted skills', err);
      }
    });

  }

  sendFeedback(): void {

    if (!this.feedbackEmail) {
      return;
    }

    this.http.post(
      'http://localhost:8764/feedback',
      { email: this.feedbackEmail }
    ).subscribe({
      next: () => {
        console.log('Feedback submitted');
        this.feedbackEmail = '';
      },
      error: (err) => {
        console.error('Failed to submit feedback', err);
      }
    });

  }

}