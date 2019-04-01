import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  result: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.calculateResult(params.get('lives')));
  }

  calculateResult(lives: string) {
    if (!lives) {
      this.restart();
      return;
    }

    const livesInt = parseInt(lives, 10);

    switch (livesInt) {
      case 0:
        this.result = 'Oh man! You are too experienced for this game!';
        break;

      case 1:
        this.result = 'Oh man! You are too cool!';
        break;

      case 2:
        this.result = 'Not bad, not bad';
        break;

      case 3:
        this.result = 'Good, very good';
        break;

      case 4:
        this.result = 'Hm...';
        break;

      default:
        this.result = 'Well, you should learn more';
        break;
    }
  }

  restart() {
    this.router.navigate(['']);
  }
}
