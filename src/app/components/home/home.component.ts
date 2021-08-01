import {Component, OnDestroy, OnInit} from '@angular/core';
import {APIResponse, Game} from '../../models';
import {Subscription} from 'rxjs';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort = 'metacrit';
  public searchCode: string;
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  public pageNumber = 1;
  public isGamEListAvailable = false;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isGamEListAvailable = false;
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.pageNumber = 1;
        this.searchCode = params['game-search'];
        this.searchGames(this.sort,  params['game-search']);
      } else {
        this.searchGames(this.sort );
      }
    });
  }


  searchGamesFromFront(sort: string): void{
    this.pageNumber = 1;
    this.searchGames(sort, this.searchCode);
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, this.pageNumber.toString(), search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        if (this.games.length > 0) {
          this.isGamEListAvailable = true;
        }
        console.log(gameList);
      });
  }

  openGameDetails(id: string): void {
    // this.router.navigate(['details', id]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/details/${id}`])
    );
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  paginationSearch(upOrDown: number): void {
    if (upOrDown === 0) {
      this.pageNumber = 1;
    } else if (!(upOrDown === -1 && this.pageNumber === 1)) {
      this.pageNumber += upOrDown;
    } else {
      return;
    }
    this.searchGames(this.sort, this.searchCode);
  }
}
