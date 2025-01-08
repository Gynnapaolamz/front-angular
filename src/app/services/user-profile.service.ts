import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { UserProfile } from '../interfaces/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private apiUrl = 'http://localhost:3000/user_profiles';

  constructor(private http: HttpClient) {}

  private isValidTinyint(value: number): boolean {
    return Number.isInteger(value) && value >= 0 && value <= 255;
  }

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.apiUrl).pipe(
      catchError(this.handleError<UserProfile[]>([]))
    );
  }

  getUserProfileById(profile_id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${profile_id}`).pipe(
      catchError(this.handleError<UserProfile>())
    );
  }

  addUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    if (!this.isValidTinyint(userProfile.is_active)) {
      console.error('Invalid is_active value. Must be between 0 and 255.');
      return of();
    }

    return this.http.post<UserProfile>(this.apiUrl, userProfile).pipe(
      catchError(this.handleError<UserProfile>())
    );
  }

  updateUserProfile(profile_id: number, userProfile: UserProfile): Observable<UserProfile> {
    if (!this.isValidTinyint(userProfile.is_active)) {
      console.error('Invalid is_active value. Must be between 0 and 255.');
      return of();
    }

    return this.http.put<UserProfile>(`${this.apiUrl}/${profile_id}`, userProfile).pipe(
      catchError(this.handleError<UserProfile>())
    );
  }

  deleteUserProfile(profile_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${profile_id}`).pipe(
      catchError(this.handleError<void>())
    );
  }

  private handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error('An error occurred:', error);
      return of(result as T);
    };
  }

}
