import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(private location: Location) { }

  selected: string = "";

  ngOnInit() {
    this.selected = (this.location.path().split("/"))[2];
    this.location.onUrlChange(val => {
        this.selected = (val.split("/"))[2];
        console.log(this.selected)
    });
  }

}
