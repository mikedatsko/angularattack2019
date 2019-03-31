import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import random from 'lodash/random';

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.scss']
})
export class PlaygameComponent implements OnInit {
  public fields: any[] = [];
  public experience: number = 0;
  public experienceAccumulated: number = 0;
  public cubeValue: number = 1;
  public isCubeSpinning: boolean = false;
  public userChipLeft: number = 1;
  public userChipTop: number = 1;
  public lives: number = 0;
  private fieldTypes = {
    empty: {title: 'empty', color: '#eee'},
    0: {title: 'start', color: 'gray'},
    1: {title: '3 years', cost: 100, color: 'Aquamarine'},
    2: {title: '6 years', cost: 120, color: 'Aquamarine'},
    3: {title: '9 years', cost: 140, color: 'Aquamarine'},
    4: {title: 'x2', color: 'gray'},
    5: {title: '12 years', cost: 180, color: 'Turquoise'},
    6: {title: '15 years', cost: 200, color: 'Turquoise'},
    7: {title: '18 years', cost: 220, color: 'Turquoise'},
    8: {title: 'teleport', color: 'gray'},
    17: {title: '21 years', cost: 260, color: 'MediumSeaGreen'},
    26: {title: '24 years', cost: 280, color: 'MediumSeaGreen'},
    35: {title: '27 years', cost: 300, color: 'MediumSeaGreen'},
    44: {title: 'x2', color: 'gray'},
    53: {title: '30 years', cost: 340, color: 'Gold'},
    62: {title: '33 years', cost: 360, color: 'Gold'},
    71: {title: '36 years', cost: 380, color: 'Gold'},
    80: {title: 'lost', color: 'gray'},
    79: {title: '39 years', cost: 420, color: 'Orange'},
    78: {title: '42 years', cost: 440, color: 'Orange'},
    77: {title: '45 years', cost: 460, color: 'Orange'},
    76: {title: 'x2', color: 'gray'},
    75: {title: '48 years', cost: 500, color: 'OrangeRed'},
    74: {title: '51 years', cost: 520, color: 'OrangeRed'},
    73: {title: '54 years', cost: 540, color: 'OrangeRed'},
    72: {title: 'rest', color: 'gray'},
    63: {title: '57 years', cost: 580, color: 'Violet'},
    54: {title: '60 years', cost: 600, color: 'Violet'},
    45: {title: '63 years', cost: 620, color: 'Violet'},
    36: {title: 'x2', color: 'gray'},
    27: {title: '66 years', cost: 640, color: 'MediumPurple'},
    18: {title: '69 years', cost: 660, color: 'MediumPurple'},
    9: {title: '72 years', cost: 680, color: 'MediumPurple'}
  };
  private id: number = 0;
  private isNewLife: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.setFields();
  }

  setFields() {
    this.fields = [];

    for (let i = 0; i < 81; i++) {
      this.fields.push({
        id: i,
        type: this.fieldTypes[i] || this.fieldTypes.empty,
        title: `${i}`
      });
    }
  }

  run() {
    this.isCubeSpinning = true;

    setTimeout(() => {
      this.cubeValue = random(1, 6);
      this.isCubeSpinning = false;
      this.calcUserChipPosition();
    }, 1000);
  }

  calcUserChipPosition() {
    if (this.userChipLeft === 1 && this.userChipTop === 1) {
      this.userChipLeft = this.userChipLeft + this.cubeValue * (3.3);
      this.calculateExperience();
    } else if (this.userChipLeft === 27.4 && this.userChipTop === 1) {
      this.userChipTop = this.userChipTop + this.cubeValue * (3.3);
      this.calculateExperience();
    } else if (this.userChipLeft === 27.4 && this.userChipTop === 27.4) {
      this.userChipLeft = this.userChipLeft - this.cubeValue * (3.3);
      this.calculateExperience();
    } else if (this.userChipLeft === 1 && this.userChipTop === 27.4) {
      this.userChipTop = this.userChipTop - this.cubeValue * (3.3);
      this.calculateExperience();
    } else if (this.userChipLeft > 1 && this.userChipLeft < 27.4 && this.userChipTop === 1) {
      const userChipLeft = this.userChipLeft + this.cubeValue * (3.3);

      if (userChipLeft > 27.4) {
        this.userChipLeft = 27.4;
        const diff = Math.round((userChipLeft - 27.4) / 3.3);

        setTimeout(() => {
          this.userChipTop = this.userChipTop + diff * (3.3);
          this.calculateExperience();
        }, 1000);
      } else {
        this.userChipLeft = userChipLeft;
        this.calculateExperience();
      }
    } else if (this.userChipLeft === 27.4 && this.userChipTop > 1 && this.userChipTop < 27.4) {
      const userChipTop = this.userChipTop + this.cubeValue * (3.3);

      if (userChipTop > 27.4) {
        this.userChipTop = 27.4;
        const diff = Math.round((userChipTop - 27.4) / 3.3);

        setTimeout(() => {
          this.userChipLeft = this.userChipLeft - diff * (3.3);
          this.calculateExperience();
        }, 1000);
      } else {
        this.userChipTop = userChipTop;
        this.calculateExperience();
      }
    } else if (this.userChipLeft > 1 && this.userChipLeft < 27.4 && this.userChipTop === 27.4) {
      const userChipLeft = this.userChipLeft - this.cubeValue * (3.3);

      if (userChipLeft < 1) {
        this.userChipLeft = 1;
        const diff = Math.round(Math.abs(userChipLeft) / 3.3);

        setTimeout(() => {
          this.userChipTop = this.userChipTop - diff * (3.3);
          this.calculateExperience();
        }, 1000);
      } else {
        this.userChipLeft = userChipLeft;
        this.calculateExperience();
      }
    } else if (this.userChipLeft === 1 && this.userChipTop > 1 && this.userChipTop < 27.4) {
      const userChipTop = this.userChipTop - this.cubeValue * (3.3);

      if (userChipTop < 1) {
        this.isNewLife = true;
        this.userChipTop = 1;
        const diff = Math.round(Math.abs(userChipTop) / 3.3);

        setTimeout(() => {
          this.userChipLeft = this.userChipLeft + diff * (3.3);
          this.calculateExperience();
        }, 1000);
      } else {
        this.userChipTop = userChipTop;
        this.calculateExperience();
      }
    }
  }

  calculateExperience() {
    if (this.userChipLeft === 1 && this.userChipTop === 1) {
      this.id = 0;
    } else if (this.userChipLeft === 27.4 && this.userChipTop === 1) {
      this.id = 8;
    } else if (this.userChipLeft === 27.4 && this.userChipTop === 27.4) {
      this.id = 80;
    } else if (this.userChipLeft === 1 && this.userChipTop === 27.4) {
      this.id = 72;
    } else if (this.userChipLeft > 1 && this.userChipTop === 1) {
      this.id = Math.round((this.userChipLeft - 1) / 3.3);
    } else if (this.userChipLeft === 27.4 && this.userChipTop > 1) {
      this.id = Math.round((this.userChipTop - 1) / 3.3) * 9 + 8;
    } else if (this.userChipLeft < 27.4 && this.userChipTop === 27.4) {
      this.id = Math.round((this.userChipLeft - 1) / 3.3) + 72;
    } else if (this.userChipLeft === 1 && this.userChipTop < 27.4) {
      this.id = Math.round((this.userChipTop - 1) / 3.3) * 9;
    }

    setTimeout(() => this.calculateExperienceValue(), 1000);
  }

  calculateExperienceValue() {
    const field = this.fields[this.id];

    this.router.navigate(['/playgame', 'final', this.lives]);

    if (this.isNewLife === true) {
      this.isNewLife = false;
      this.experienceAccumulated += this.experience;
      this.experience = 0;

      if (this.experienceAccumulated >= 10000) {
        this.router.navigate(['/playgame', 'final', this.lives]);
      } else {
        this.lives += 1;
      }
    }

    if (field.type.cost) {
      this.experience = this.experience + field.type.cost;
    } else if (field.type.title === 'x2') {
      this.experience = this.experience * 2;
    } else if (field.type.title === 'teleport') {
      this.run();
    } else if (field.type.title === 'lost') {
      this.experience = this.experience / 2;
    } else if (field.type.title === 'rest') {
      this.experience = this.experience * 4;
    }
  }
}
