import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { Category } from 'shared/models/category';
import { Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categoriesList:Category[];  
  @Input('category') category;

  constructor(private categoryService:CategoryService) {
    categoryService.getAll().snapshotChanges().subscribe(item => {
      this.categoriesList = [];      
      item.forEach(category => {              
        var y = category.payload.toJSON();
        y["$key"] = category.key;
        this.categoriesList.push(y as Category);                
      });        
    });
   }

  ngOnInit() {
  }

}
