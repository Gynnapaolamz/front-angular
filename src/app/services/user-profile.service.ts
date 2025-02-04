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

  getUserProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.apiUrl).pipe(
      catchError(this.handleError<UserProfile[]>([]))
    );
  }

  getUserProfileById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<UserProfile>())
    );
  }

  addUserProfile(userProfile: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.apiUrl, userProfile).pipe(
      catchError(this.handleError<UserProfile>())
    );
  }

  updateUserProfile(id: string, userProfile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/${id}`, userProfile).pipe(
      catchError(this.handleError<UserProfile>())
    );
  }

  deleteUserProfile(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
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
