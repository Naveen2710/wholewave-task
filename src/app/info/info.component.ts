import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent  implements OnInit {

  @Input() info: Record<string, any> = {};

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('ers ', this.info);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
