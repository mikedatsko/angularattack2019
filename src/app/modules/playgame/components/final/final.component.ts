import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
  result: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => this.calculateResult(params.get('lives')));
  }

  calculateResult(lives: string) {
    console.log('lives', lives);

    if (!lives) {

      return;
    }

    const livesInt = parseInt(lives, 10);

    switch (livesInt) {
      case 0:
        this.result = 'Oh man! You are too experienced for this game!';
        break;

      case 0:
        this.result = 'Oh man! You are too cool!';
        break;

      default:
        break;
    }
  }
}
