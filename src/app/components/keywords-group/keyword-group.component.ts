import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KeywordsGroupService } from '../../services/keyword-group.service';
import { visibility } from '../../interfaces/visibility.enum';
import { KeywordGroup } from '../../interfaces/keywords-group.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-keyword-group',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './keyword-group.component.html',
  styles: ``
})
export class KeywordsGroupComponent implements OnInit{

  visibility = visibility;

  keywordGroups: KeywordGroup[] = [];
  newKeywordGroup: KeywordGroup = {
    id: '',
    group_name: '',
    visibility: visibility.private,
    created_at: new Date(),
    updated_at: new Date(),
    content_type_id: 0
  };
  selectedKeywordGroup: KeywordGroup | null = null;

  constructor(private keywordGroupService: KeywordsGroupService) {}

  ngOnInit(): void {
    this.loadKeywordGroups();
  }

  loadKeywordGroups(): void {
    this.keywordGroupService.getKeywordGroups().subscribe({
    next: (keywordGroups) => {
        this.keywordGroups = keywordGroups;
      },
      error: (error) => {
        console.error('Error loading keyword groups', error);
      }
  });
  }

  addKeywordGroup(): void {
    this.newKeywordGroup.id = uuidv4();
    this.keywordGroupService.addKeywordGroup(this.newKeywordGroup).subscribe({
      next: (keywordGroup) => {
        this.keywordGroups.push(keywordGroup);
        this.newKeywordGroup = {
          id: '',
          group_name: '',
          visibility: visibility.private,
          created_at: new Date(),
          updated_at: new Date(),
          content_type_id: 0
        };
      },
      error: (error) => {
        console.error('Error adding keyword group', error);
      }
  });
  }

  selectKeywordGroup(keywordGroup: KeywordGroup): void {
    this.selectedKeywordGroup = { ...keywordGroup };
  }

  updateKeywordGroup(): void {
    if (this.selectedKeywordGroup && this.selectedKeywordGroup.id) {
      this.selectedKeywordGroup.updated_at = new Date();
      this.keywordGroupService.updateKeywordGroup(this.selectedKeywordGroup.id, this.selectedKeywordGroup).subscribe({
        next: () => {
          this.loadKeywordGroups();
          this.selectedKeywordGroup = null;
        },
        error: (error) => {
          console.error('Error updating keyword group', error);
        }
    });
    } else {
      console.error('Selected keyword group or keyword group ID is invalid');
    }
  }

  deleteKeywordGroup(id: string): void {
    if (id) {
      this.keywordGroupService.deleteKeywordGroup(id).subscribe({
        next: () => {
          this.loadKeywordGroups();
        },
        error: (error) => {
          console.error('Error deleting keyword group', error);
        }
    });
    } else {
      console.error('Keyword group ID is invalid');
    }
  }

}
