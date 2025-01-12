import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserProfileService } from '../../services/user-profile.service';
import { ProfileType } from '../../interfaces/profile-type.enum';
import { UserProfile } from '../../interfaces/user-profile.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styles: ``
})
export class UserProfileComponent implements OnInit {

  ProfileType = ProfileType;

  userProfiles: UserProfile[] = [];
  newUserProfile: UserProfile = {
    id: '',
    user_id: 0,
    profile_type: ProfileType.personal,
    company_id: 0,
    is_active: 1,
    created_at: new Date(),
    updated_at: new Date()
  };
  selectedUserProfile: UserProfile | null = null;

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUserProfiles();
  }

  loadUserProfiles(): void {
    this.userProfileService.getUserProfiles().subscribe({
      next: (userProfiles) => {
        this.userProfiles = userProfiles;
      },
      error: (error) => {
        console.error('Error loading user profiles', error);
      }
  });
  }

  addUserProfile(): void {
    this.newUserProfile.id = uuidv4();
    this.userProfileService.addUserProfile(this.newUserProfile).subscribe({
      next: (userProfile) => {
        if (userProfile) {
          this.userProfiles.push(userProfile);
          this.newUserProfile = {
            id: '',
            user_id: 0,
            profile_type: ProfileType.personal,
            company_id: 0,
            is_active: 1,
            created_at: new Date(),
            updated_at: new Date()
          };
        }
      },
      error: (error) => {
        console.error('Error adding user profile', error);
      }
  });
  }

  selectUserProfile(userProfile: UserProfile): void {
    this.selectedUserProfile = { ...userProfile };
  }

  updateUserProfile(): void {
    if (this.selectedUserProfile && this.selectedUserProfile.id) {
      this.selectedUserProfile.updated_at = new Date();
      this.userProfileService.updateUserProfile(this.selectedUserProfile.id, this.selectedUserProfile).subscribe({
        next: () => {
          this.loadUserProfiles();
          this.selectedUserProfile = null;
        },
        error: (error) => {
          console.error('Error updating user profile', error);
        }
    });
    } else {
      console.error('Selected user profile or profile ID is invalid');
    }
  }

  deleteUserProfile(id: string): void {
    if (id) {
      this.userProfileService.deleteUserProfile(id).subscribe({
        next: () => {
          this.loadUserProfiles();
        },
        error: (error) => {
          console.error('Error deleting user profile', error);
        }
    });
    } else {
      console.error('Profile ID is invalid');
    }
  }
}
