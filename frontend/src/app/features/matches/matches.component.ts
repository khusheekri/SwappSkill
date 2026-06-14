import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface MatchDTO {
  matchId?: number;
  matchedUserId: number;
  matchedUserName: string;
  matchedUserEmail: string;
  userOfferedSkillId: number;
  userOfferedSkillName: string;
  matchedUserOfferedSkillId: number;
  matchedUserOfferedSkillName: string;
  status: string;
}

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  suggestions: MatchDTO[] = [];
  myMatches: MatchDTO[] = [];
  loadingSuggestions = false;

  // TODO: replace with actual logged-in user id
  userId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMyMatches();
  }

  findMatches(): void {
    this.loadingSuggestions = true;
    this.http.get<MatchDTO[]>(`http://localhost:8765/api/matches/suggestions/${this.userId}`)
      .subscribe({
        next: (data) => {
          this.suggestions = data;
          this.loadingSuggestions = false;
        },
        error: (err) => {
          console.error('Failed to load match suggestions', err);
          this.loadingSuggestions = false;
        }
      });
  }

  loadMyMatches(): void {
    this.http.get<MatchDTO[]>(`http://localhost:8765/api/matches/${this.userId}`)
      .subscribe({
        next: (data) => this.myMatches = data,
        error: (err) => console.error('Failed to load matches', err)
      });
  }

  sendMatchRequest(suggestion: MatchDTO): void {
    const payload = {
      matchedUserId: suggestion.matchedUserId,
      userOfferedSkillId: suggestion.userOfferedSkillId,
      matchedUserOfferedSkillId: suggestion.matchedUserOfferedSkillId
    };

    this.http.post<MatchDTO>(`http://localhost:8765/api/matches/${this.userId}/request`, payload)
      .subscribe({
        next: (created) => {
          this.myMatches.push(created);
          this.suggestions = this.suggestions.filter(s =>
            !(s.matchedUserId === suggestion.matchedUserId &&
              s.matchedUserOfferedSkillId === suggestion.matchedUserOfferedSkillId)
          );
        },
        error: (err) => console.error('Failed to send match request', err)
      });
  }

  respondToMatch(match: MatchDTO, status: 'ACCEPTED' | 'REJECTED'): void {
    if (!match.matchId) return;

    this.http.put<MatchDTO>(`http://localhost:8765/api/matches/${match.matchId}/status`, { status })
      .subscribe({
        next: (updated) => {
          const idx = this.myMatches.findIndex(m => m.matchId === updated.matchId);
          if (idx > -1) this.myMatches[idx] = updated;
        },
        error: (err) => console.error('Failed to update match status', err)
      });
  }
}