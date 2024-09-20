import { Component, OnInit } from '@angular/core';
import { MurliStoryService } from 'app/shared/services/murli-story.service';
import { MurliPager } from 'app/shared/interface/murli/murli-pager';
import { MurliStoryVM } from 'app/shared/interface/murli/murli-story-vm';
import { MurliStory, MurliStoryPage } from 'app/shared/interface/murli/murli-story';
import { environment } from 'environments/environment';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  rows = 20;
  pager: MurliPager;
  viewModel: MurliStoryVM;
  isOpenPopup: boolean;
  relativePath: string;
  isAddedNewStory: boolean;
  isAddedNewPage: boolean;
  selectedStory: MurliStory;
  selectedStoryPage: MurliStoryPage;
  url: string;
  isFormInvalid: boolean;
  constructor(private murliStoryService: MurliStoryService
    , private messageService: MessageService
    , private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.isFormInvalid = false;
    this.url = environment.apiURL + '/api/MurliStory/PostUserImage';
    this.selectedStory = null;
    this.isOpenPopup = false;
    this.pager = {
      Take: 10,
      Skip: 0,
      Keyword: ''
    };
    this.getStory(null);

  }


  getStory(event) {
    if (event != null) {
      this.pager = {
        Take: event.rows,
        Skip: event.first,
        Keyword: ''
      };
    }

    this.murliStoryService.getBypager(this.pager).subscribe(result => {
      this.viewModel = result;
      console.log('this.viewModel: ', this.viewModel);
      if (this.viewModel && this.viewModel.StoryList && this.viewModel.StoryList.length > 0) {
        this.viewModel.StoryList.forEach(x => {
          x.ValidFrom = new Date(x.ValidFrom);
          x.ValidTo = new Date(x.ValidTo);
        });
      }
    });
  }

  addNewStory() {
    this.isAddedNewStory = true;
    this.selectedStory = {
      Id: 0,
      Deleted: false,
      IsActive: true,
      IsPublished: false,
      Title: '',
      ValidFrom: null,
      ValidTo: null,
      MurliStoryPageList: []
    };
    this.isOpenPopup = true;
  }

  onBasicUploadAuto(event) {
    if (event.originalEvent.status == 201) {
      this.relativePath = environment.apiURL + event.originalEvent.body.Message;
      this.selectedStoryPage.ImagePath = event.originalEvent.body.Message;
      this.selectedStoryPage.PathToShowImage = this.relativePath;
    }
  }

  addNewPage() {
    this.selectedStoryPage = {
      Deleted: false,
      Id: 0,
      ImagePath: '',
      IsActive: true,
      PageNumber: 0,
      IsPublished: false
    }
    this.isAddedNewPage = true;
  }

  saveNewPage() {
    this.selectedStory.MurliStoryPageList.push(this.selectedStoryPage);
    this.selectedStoryPage = null;
    this.isAddedNewPage = false;
    this.relativePath = null;
  }
  onError(event) {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.selectedStory.MurliStoryPageList, event.previousIndex, event.currentIndex);
  }

  SaveStory(form, titleInput) {
    console.log('form: ', titleInput);
    if (form.invalid) {
      this.isFormInvalid = true;
    }
    else {
      this.isFormInvalid = false;
      this.murliStoryService.saveMurliStory(this.selectedStory)
        .subscribe(result => {
          let story = this.viewModel.StoryList.find(x => x.Id == this.selectedStory.Id);

          let index = this.viewModel.StoryList.indexOf(story);
          if (index > -1) {
            this.selectedStory = result;
            this.viewModel.StoryList.splice(index, 1, result);
          } else {
            this.viewModel.StoryList.splice(this.viewModel.StoryList.length, 0, result);
          }

          this.isOpenPopup = false;
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: 'Story Saved Successfully!!!' });
        });
    }

  }

  edit(story: MurliStory) {
    this.murliStoryService.getById(story.Id).subscribe(result => {
      this.selectedStory = result;

      if (this.selectedStory.MurliStoryPageList && this.selectedStory.MurliStoryPageList.length > 0) {
        this.selectedStory.MurliStoryPageList.forEach(x => {
          x.PathToShowImage = environment.apiURL + x.ImagePath;
        })
      }

      this.selectedStory.ValidFrom = new Date(this.selectedStory.ValidFrom);
      this.selectedStory.ValidTo = new Date(this.selectedStory.ValidTo);
      this.isOpenPopup = true;
    });
  }

  delete(story: MurliStory) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        if (story.MurliStoryPageList && story.MurliStoryPageList.length > 0) {
          story.MurliStoryPageList.forEach(x => {
            x.IsActive = false;
          });
        }
        story.IsActive = false;
        this.murliStoryService.saveMurliStory(story).subscribe(story => {
          let index = this.viewModel.StoryList.indexOf(story);
          this.viewModel.StoryList.splice(index, 1);
        });

        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Story Deleted Successfully!!!' });
      }
    });
  }

  publishStory(story: MurliStory) {
    this.murliStoryService.publish(story.Id, story.IsPublished).subscribe(result => {
      this.viewModel.StoryList.forEach(x => {
        if (x.Id != story.Id) {
          x.IsPublished = false;
        }
      })

      this.messageService.add({ severity: 'success', summary: 'Published', detail: 'Story Published Successfully!!!' });
    });
  }

  deletePage(page: MurliStoryPage, story: MurliStory) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      accept: () => {
        let index = story.MurliStoryPageList.indexOf(page);
        

        if (!page.Id ) {
          story.MurliStoryPageList.splice(index, 1);
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Page Deleted Successfully!!!' });
        } else {

          this.murliStoryService.deletePage(page.Id).subscribe(result => {
            story.MurliStoryPageList.splice(index, 1);
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Page Deleted Successfully!!!' });
          });
        }
    
      }
    });


  }

}
