import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class SaveAsFileService {

  constructor() { }

  download(url: string, fileName: string) {
    fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
      .then(res => res.blob()) // Gets the response and returns it as a blob
      .then(blob => {
        
        saveAs(blob, "pretty image.png");

      });


  }
}
