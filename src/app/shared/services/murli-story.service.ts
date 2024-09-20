import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { MurliStory } from '../interface/murli/murli-story';
import { MurliPager } from '../interface/murli/murli-pager';
import { Observable } from 'rxjs';
import { MurliStoryVM } from '../interface/murli/murli-story-vm';

@Injectable({
  providedIn: 'root'
})
export class MurliStoryService {

  apiURL: string;
 
  constructor( private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  getBypager(pager: MurliPager): Observable<MurliStoryVM>{
    return this.http.post<MurliStoryVM>(this.apiURL + '/api/MurliStory/GetBypager', pager );
  }

  saveMurliStory(murliStory: MurliStory): Observable<MurliStory> {
    return this.http.post<MurliStory>(this.apiURL + '/api/MurliStory/SaveMurliStory', murliStory );
  }

  postRaw(raw: string){
    return this.http.post(this.apiURL + '/api/MurliStory/PostRaw', raw );
  }

  getById(storyId: number): Observable<MurliStory>{
    return this.http.get<MurliStory>(this.apiURL + '/api/MurliStory/GetById/'+ storyId );
  }

  publish(storyId: number, ispublish: boolean): Observable<boolean>{
    return this.http.get<boolean>(this.apiURL + '/api/MurliStory/Publish/murliStoryId/'+ storyId + '/IsPublish/' +  ispublish);
  
  }

  deletePage(pageId: number): Observable<boolean>{
    return this.http.get<boolean>(this.apiURL + '/api/MurliStory/DeletePage/'+ pageId);
  
  }
  
}
