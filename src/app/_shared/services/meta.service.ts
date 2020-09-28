import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {MetaData} from '../models/meta-data';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  set(meta: MetaData): void {
    this.titleService.setTitle(meta.title);
    this.metaService.updateTag({ name: 'description', content: meta.description });
  }
}
