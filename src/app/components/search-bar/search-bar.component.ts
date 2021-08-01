import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  fbLink = environment.FB_LINK;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    const searchName: string = form.value.search;
    form.value.search = null;
    this.router.navigate(['game_info_app/search', searchName]);
  }
}
