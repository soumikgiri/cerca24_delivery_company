import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { FileUploadComponent } from './components/file-upload.component';
import { MediaService } from './service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FileUploadModule
  ],
  exports: [
    FileUploadComponent
  ],
  declarations: [
    FileUploadComponent
  ],
  entryComponents: [],
  providers: [
    MediaService
  ]
})

export class MediaModule {}
