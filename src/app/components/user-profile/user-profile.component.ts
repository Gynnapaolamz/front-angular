import { Component, OnInit } from '@angular/core';
import { ProfileType, UserProfile } from '../../interfaces/user-profile.model';
import { UserProfileService } from '../../services/user-profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styles: ``
})
export class UserProfileComponent implements OnInit{

  userProfiles: UserProfile[] = [];
  newUserProfile: UserProfile = {
    profile_id: 0,
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
    this.userProfileService.getUserProfiles().subscribe(
      userProfiles => {
        this.userProfiles = userProfiles;
      },
      error => {
        console.error('Error loading user profiles', error);
      }
    );
  }

  addUserProfile(): void {
    this.userProfileService.addUserProfile(this.newUserProfile).subscribe(
      userProfile => {
        if (userProfile) {
          this.userProfiles.push(userProfile);
          this.newUserProfile = {
            profile_id: 0,
            user_id: 0,
            profile_type: ProfileType.personal,
            company_id: 0,
            is_active: 1,
            created_at: new Date(),
            updated_at: new Date()
          };
        }
      },
      error => {
        console.error('Error adding user profile', error);
      }
    );
  }

  selectUserProfile(userProfile: UserProfile): void {
    this.selectedUserProfile = { ...userProfile };
  }

  updateUserProfile(): void {
    if (this.selectedUserProfile && this.selectedUserProfile.profile_id) {
      this.selectedUserProfile.updated_at = new Date();
      this.userProfileService.updateUserProfile(this.selectedUserProfile.profile_id, this.selectedUserProfile).subscribe(
        () => {
          this.loadUserProfiles();
          this.selectedUserProfile = null;
        },
        error => {
          console.error('Error updating user profile', error);
        }
      );
    } else {
      console.error('Selected user profile or profile ID is invalid');
    }
  }

  deleteUserProfile(profile_id: number): void {
    if (profile_id) {
      this.userProfileService.deleteUserProfile(profile_id).subscribe(
        () => {
          this.loadUserProfiles();
        },
        error => {
          console.error('Error deleting user profile', error);
        }
      );
    } else {
      console.error('Profile ID is invalid');
    }
  }
}
