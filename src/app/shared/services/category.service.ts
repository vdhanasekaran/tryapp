import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import { AngularFireList } from 'angularfire2/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryList:AngularFireList<any>;
  constructor(private db:AngularFireDatabase) { }
  
  getAll()  {
    this.categoryList =  this.db.list('categories');  
    return this.categoryList;
  }
}
