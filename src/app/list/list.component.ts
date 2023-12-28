import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, lastValueFrom } from 'rxjs';
import { AppService } from './../service/app.service';
import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoComponent } from '../info/info.component';
// import { AppService } from '../service/app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  app = inject(AppService)
  imageList: any[] = [];
  searchKey = '';

  searchKeyword$: Subject<string> = new BehaviorSubject<string>('');

  constructor(
    private modalctrl: ModalController
  ) {
    this.searchKeyword$.subscribe(val => this.filterList(val));
    // this.searchKeyword$.pipe(
    //   debounceTime(600),
    //   distinctUntilChanged(),
    // )
    // .subscribe(val => this.filterList(val));
  }

  async getList() {
    try {
      const res: any = await lastValueFrom(this.app.getList());
      this.imageList = res;
      console.log(res);
    }
    catch(e) {
      console.log(e);
    }
  }

  async details(item: Record<string, any>) {
    try {
      const res: any = await lastValueFrom(this.app.imageInfo(item['id']));

      const modal = await this.modalctrl.create({
        component: InfoComponent,
        cssClass: 'modalCss',
        componentProps: {
          info: res
        }
      })

      modal.present();
    }
    catch(e) {
      console.log(e);
    }
  }

  search(val: any) {
    this.searchKeyword$.next(val?.value);
  }

  async filterList(val: any) {
    try {
      if(val) {
        this.imageList = [];
        await lastValueFrom(this.app.imageSearch(val));
      }
      else {
        this.getList();
      }
    }
    catch(e: any) {
      try {
        if(e.status === 200) {
          console.log(e.url);
          const image: Blob = await lastValueFrom(this.app.getImageById(e.url));

          let reader = new FileReader();
          const img =  await new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(image);
          })
          if(img) {
            this.imageList.push({'img': img});
          }
        }
      }
      catch(e) {
        console.log(e);
      }
    }
  }

}
