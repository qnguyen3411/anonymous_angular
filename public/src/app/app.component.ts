import { Component } from '@angular/core';
import { HttpService } from './http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postData = {"content": ""};
  error = "";
  notes: Array<Object> = []
  constructor(private _httpService: HttpService){
    this.fetchNotes();
  }

  fetchNotes() {
    this._httpService
    .getNotes()
    .subscribe(response => {
      if (response['status'] == "success") {
        this.notes = (response['data'] as Array<Object>).reverse()
      }
    })
  }

  submit() {
    this._httpService
    .postNote(this.postData)
    .subscribe(response => {
      if (response['status'] == "success") {
        this.postData = {"content": ""};
        this.notes.unshift(response['data']);
        this.error = "";
      } else {
        console.log(response)
        this.error = response['data'][0]['message'];
      }
    })
  }
}
