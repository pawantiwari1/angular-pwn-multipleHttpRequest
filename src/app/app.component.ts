import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

  // <a href="https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs">Tutorial at coryrylan.com</a>

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedCharacter: {};
    loadedCharacter1: {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let character = this.http.get('https://swapi.co/api/people/1');
    let characterHomeworld = this.http.get('https://swapi.co/api/planets/1');
    forkJoin([character, characterHomeworld]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld
      console.log(results);
      (results[0] as any).homeworld = results[1];
      this.loadedCharacter1 =results[1]; //results[0];
      this.loadedCharacter=results[0];
       
    });
  }
}
