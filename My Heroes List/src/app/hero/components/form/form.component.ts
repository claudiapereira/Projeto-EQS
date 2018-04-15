import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../models/heroe.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class HeroDetailComponent {
  @Input() array: Hero[];
  @Input() set hero(v: Hero) {
    if (v) {
      this.id = v.id;
      this.name = v.name;
      this.image = v.image;
      this.telefone = v.telefone;
      this.email = v.email;
    }
  }

  @Output() save = new EventEmitter<Hero>();

  @ViewChild('image') someInput: any;

  private id;
  private name;
  private email;
  private telefone;
  private change;
  private image;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  saveHero(): void {
    this.save.emit({
      id: this.id,
      name: this.name,
      telefone: this.telefone,
      email: this.email,
      image: (this.change) ? document.getElementById('image')['value'] : this.image
    });
  }

  fileChanged($event) {
    const file = $event.target.files[0];
    this.fileBase64(file);
    this.change = true;
  }

  fileBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      document.getElementById('image')['value'] = reader.result;
    };
  }
}
