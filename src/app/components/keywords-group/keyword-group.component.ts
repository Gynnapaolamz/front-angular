import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { KeywordsGroupService } from '../../services/keyword-group.service';
import { visibility } from '../../interfaces/visibility.enum';
import { KeywordGroup } from '../../interfaces/keywords-group.model';
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
    keyword_group_id: 0,
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
    this.keywordGroupService.getKeywordGroups().subscribe(
      keywordGroups => {
        this.keywordGroups = keywordGroups;
      },
      error => {
        console.error('Error loading keyword groups', error);
      }
    );
  }

  addKeywordGroup(): void {
    this.keywordGroupService.addKeywordGroup(this.newKeywordGroup).subscribe(
      keywordGroup => {
        this.keywordGroups.push(keywordGroup);
        this.newKeywordGroup = {
          keyword_group_id: 0,
          group_name: '',
          visibility: visibility.private,
          created_at: new Date(),
          updated_at: new Date(),
          content_type_id: 0
        };
      },
      error => {
        console.error('Error adding keyword group', error);
      }
    );
  }

  selectKeywordGroup(keywordGroup: KeywordGroup): void {
    this.selectedKeywordGroup = { ...keywordGroup };
  }

  updateKeywordGroup(): void {
    if (this.selectedKeywordGroup && this.selectedKeywordGroup.keyword_group_id) {
      this.selectedKeywordGroup.updated_at = new Date();
      this.keywordGroupService.updateKeywordGroup(this.selectedKeywordGroup.keyword_group_id, this.selectedKeywordGroup).subscribe(
        () => {
          this.loadKeywordGroups();
          this.selectedKeywordGroup = null;
        },
        error => {
          console.error('Error updating keyword group', error);
        }
      );
    } else {
      console.error('Selected keyword group or keyword group ID is invalid');
    }
  }

  deleteKeywordGroup(keyword_group_id: number): void {
    if (keyword_group_id) {
      this.keywordGroupService.deleteKeywordGroup(keyword_group_id).subscribe(
        () => {
          this.loadKeywordGroups();
        },
        error => {
          console.error('Error deleting keyword group', error);
        }
      );
    } else {
      console.error('Keyword group ID is invalid');
    }
  }

}
