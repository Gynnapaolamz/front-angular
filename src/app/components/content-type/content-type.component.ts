import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentTypeService } from '../../services/content-type.service';
import { ContentType } from '../../interfaces/content-type.model';
import { visibility } from '../../interfaces/visibility.enum';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-content-type',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './content-type.component.html',
  styles: ``
})
export class ContentTypeComponent  implements OnInit{

  visibility = visibility;
  contentTypes: ContentType[] = [];
  newContentType: ContentType = {
    id: '',
    content_type_name: '',
    description: '',
    visibility: visibility.private,
    profile_id: 0,
    created_at: new Date(),
    updated_at: new Date()
  };
  selectedContentType: ContentType | null = null;

  constructor(private contentTypeService: ContentTypeService) {}

  ngOnInit(): void {
    this.loadContentTypes();
  }

  loadContentTypes(): void {
    this.contentTypeService.getContentTypes().subscribe({
      next: (contentTypes) => {
        this.contentTypes = contentTypes;
      },
      error: (error) => {
        console.error('Error loading content types', error);
      }
    });
  }

  addContentType(): void {
    this.newContentType.id = uuidv4();
    this.contentTypeService.addContentType(this.newContentType).subscribe({
      next: (contentType) => {
        this.contentTypes.push(contentType);
        this.newContentType = {
          id: '',
          content_type_name: '',
          description: '',
          visibility: visibility.private,
          profile_id: 0,
          created_at: new Date(),
          updated_at: new Date()
        };
      },
      error: (error) => {
        console.error('Error adding content type', error);
      }
    });
  }

  selectContentType(contentType: ContentType): void {
    this.selectedContentType = { ...contentType };
  }

  updateContentType(): void {
    if (this.selectedContentType && this.selectedContentType.id) {
      this.selectedContentType.updated_at = new Date();
      this.contentTypeService.updateContentType(this.selectedContentType.id, this.selectedContentType).subscribe({
        next: () => {
          this.loadContentTypes();
          this.selectedContentType = null;
        },
        error: (error) => {
          console.error('Error updating content type', error);
        }
      });
    } else {
      console.error('Selected content type or content type ID is invalid');
    }
  }

  deleteContentType(id: string): void {
    if (id) {
      this.contentTypeService.deleteContentType(id).subscribe({
        next: () => {
          this.loadContentTypes();
        },
        error: (error) => {
          console.error('Error deleting content type', error);
        }
      });
    } else {
      console.error('Content type ID is invalid');
    }
  }
}
