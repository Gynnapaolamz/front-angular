import { visibility } from "./visibility.enum";

export interface KeywordGroup {
  id: string;
  group_name: string;
  visibility: visibility;
  created_at: Date;
  updated_at: Date;
  content_type_id: number;
}

