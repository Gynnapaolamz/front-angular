import { ProfileType } from "./profile-type.enum";


export interface UserProfile {
  id: string;
  user_id: number;
  profile_type: ProfileType;
  company_id: number;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}
