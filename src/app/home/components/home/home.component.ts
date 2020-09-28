import {Component, OnInit} from '@angular/core';

import {MetaService} from '../../../_shared/services/meta.service';
import {Meta, MetaList} from '../../../_shared/models/meta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private metaService: MetaService) {
  }

  ngOnInit(): void {
    this.metaService.set(MetaList.get(Meta.HOMEPAGE));
  }

}
