import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentTypeService } from '../../services/content-type.service';
import { ContentType } from '../../interfaces/content-type.model';
import { visibility } from '../../interfaces/visibility.enum';


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
    content_type_id: 0,
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
    this.contentTypeService.getContentTypes().subscribe(
      contentTypes => {
        this.contentTypes = contentTypes;
      },
      error => {
        console.error('Error loading content types', error);
      }
    );
  }

  addContentType(): void {
    this.contentTypeService.addContentType(this.newContentType).subscribe(
      contentType => {
        this.contentTypes.push(contentType);
        this.newContentType = {
          content_type_id: 0,
          content_type_name: '',
          description: '',
          visibility: visibility.private,
          profile_id: 0,
          created_at: new Date(),
          updated_at: new Date()
        };
      },
      error => {
        console.error('Error adding content type', error);
      }
    );
  }

  selectContentType(contentType: ContentType): void {
    this.selectedContentType = { ...contentType };
  }

  updateContentType(): void {
    if (this.selectedContentType && this.selectedContentType.content_type_id) {
      this.selectedContentType.updated_at = new Date();
      this.contentTypeService.updateContentType(this.selectedContentType.content_type_id, this.selectedContentType).subscribe(
        () => {
          this.loadContentTypes();
          this.selectedContentType = null;
        },
        error => {
          console.error('Error updating content type', error);
        }
      );
    } else {
      console.error('Selected content type or content type ID is invalid');
    }
  }

  deleteContentType(content_type_id: number): void {
    if (content_type_id) {
      this.contentTypeService.deleteContentType(content_type_id).subscribe(
        () => {
          this.loadContentTypes();
        },
        error => {
          console.error('Error deleting content type', error);
        }
      );
    } else {
      console.error('Content type ID is invalid');
    }
  }
}
