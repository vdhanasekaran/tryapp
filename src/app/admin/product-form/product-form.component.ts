import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categoriesList:Category[];
  product= {};
  id;
  constructor(
    categoryService: CategoryService,
    private router:Router,
    private route:ActivatedRoute,
    private productService:ProductService) {
    this.id = this.route.snapshot.paramMap.get('id');    
    
    categoryService.getCategories().snapshotChanges().subscribe(item => {
      this.categoriesList = [];      
      item.forEach(category => {
        var y = category.payload.toJSON();
        y["$key"] = category.key;
        this.categoriesList.push(y as Category);                
      })
      console.log("Cat complete");
      if(this.id) {
        this.productService.get(this.id).snapshotChanges().subscribe(res => {
          var y = res.payload.toJSON();
          y["$key"] = res.key;        
          this.product = y as Product;         
        });
      }
    });
  }

  ngOnInit() {
  }

  save(product) {    
    if(this.id) {
      this.productService.update(this.id,product);      
    } else {
      this.productService.create(product);      
    }
    this.router.navigate(['/admin/products']);
  }
  
}
