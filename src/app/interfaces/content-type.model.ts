import { visibility } from "./visibility.enum";

export interface ContentType {
  content_type_id: number;
  content_type_name: string;
  description: string;
  visibility: visibility;
  profile_id: number;
  created_at: Date;
  updated_at: Date;
}
