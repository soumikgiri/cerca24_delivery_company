import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadModule, FileSelectDirective, FileDropDirective, FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { AuthService } from '../../shared/services';
import { MediaService } from '../service';
import * as _ from 'lodash';

@Component({
  selector: 'file-upload',
	template: `
    <div class="text-center upload-zone">
      <div ng2FileDrop
         [ngClass]="{'nv-file-over': hasBaseDropZoneOver}"
         (fileOver)="fileOverBase($event)"
         [uploader]="uploader"
         class="well my-drop-zone">
        <p class="text-center">{{options.hintText || 'Drop or select file to here'}}</p>
        <label class="custom-file">
          <input type="file" ng2FileSelect [uploader]="uploader" name="mediaPath" [multiple]="multiple" (change)="fileSelect()" class="custom-file-input" />
          <span class="custom-file-control"></span>
        </label>
      </div>
      <div class="progress" [hidden]="!progress">
        <div class="progress-bar" [ngStyle]="{width: progress + '%'}"
          [ngClass]="{'bg-success': progress == 100}">
          <span *ngIf="progress === 100">File was uploaded</span>
        </div>
      </div>
      <p *ngIf="uploader.queue.length && !autoUpload">
        <button type="button" class="btn btn-primary" *ngIf="!uploadOnSelect" (click)="upload()">{{options.uploadText || 'Upload'}}</button>
      </p>
    </div>`
})
export class FileUploadComponent implements OnInit {
  /**
   * option format
   * {
   *  customFields: { key: value } // additional field will be added to the form
   *  query: { key: value } // custom query string
   * }
   */
  @Input() options: any;
  public hasBaseDropZoneOver:boolean = false;
  public uploader: FileUploader;
  public multiple: boolean = false;
  public uploadOnSelect: boolean = false;
  public autoUpload: boolean = false;
  public progress: any = 0;
  private uploadedItems: any = [];

  constructor(private authService: AuthService, private mediaService: MediaService) {
  }

  ngOnInit() {
    // TODO - upload default file url and custom field here
    this.multiple = this.options && this.options.multiple;
    this.uploadOnSelect = this.options && this.options.uploadOnSelect;
    this.autoUpload = this.options && this.options.autoUpload;
    if (!this.options) {
      this.options = {};
    }

    // https://github.com/valor-software/ng2-file-upload/blob/development/src/file-upload/file-uploader.class.ts
    this.uploader = new FileUploader({
      url: window.appConfig.apiBaseUrl + '/media',
      authToken: 'Bearer ' + this.authService.getAccessToken(),
      autoUpload: this.options.autoUpload || false
    });

    this.uploader.onBuildItemForm = (fileItem: FileItem, form: any) => {
      fileItem.alias = this.options.fileFieldName || 'file';
      // append the form
      if (this.options.customFields) {
        Object.keys(this.options.customFields).forEach(key => form.append(key, this.options.customFields[key]));
      }

      if  (this.options.url) {
        fileItem.url = this.options.url;
      } else {
        let ep = 'files';
        if (fileItem.file.type.indexOf('image') > -1) {
          ep = 'photos';
        } else if (fileItem.file.type.indexOf('video') > -1) {
          ep = 'videos';
        }

        fileItem.url = `${window.appConfig.apiBaseUrl}/media/${ep}`;
      }
    };

    this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => fileItem.progress = progress;

    this.uploader.onProgressAll = (progress: any) => this.progress = progress;

    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.uploader.removeFromQueue(item);

      // TODO - handle error event too
      const resp = JSON.parse(response);
      this.uploadedItems.push(resp);
      if (this.options.onCompleteItem) {
        this.options.onCompleteItem(resp);
      }
    };
    this.options.uploader = this.uploader;
  }

  ngAfterViewInit() {
    this.uploader.onAfterAddingFile = item => item.withCredentials = false;
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  fileSelect() {
    if (this.options.onFileSelect) {
      this.options.onFileSelect(this.uploader.queue);
    }
  }

  upload(frm: any) {
    if (!this.uploader.queue.length) {
      return alert('Please select file');
    }

    this.uploader.onCompleteAll = () => {
      // TODO - do something
      this.uploader.clearQueue();
      if (this.options.onFinish) {
        this.options.onFinish(this.options.multiple ? this.uploadedItems : this.uploadedItems[0]);
      }

      // reset because Queue reset too
      this.uploadedItems = [];
      this.progress = 0;
    }

    this.uploader.uploadAll();
  }
}
