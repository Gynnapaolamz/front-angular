import { visibility } from "./visibility.enum";

export interface ContentType {
  id: string;
  content_type_name: string;
  description: string;
  visibility: visibility;
  profile_id: number;
  created_at: Date;
  updated_at: Date;
}
