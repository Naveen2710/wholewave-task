import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {

  @Input() info: Record<string, any> = {};

  constructor(
    public modalCtrl: ModalController
  ) { }

}
