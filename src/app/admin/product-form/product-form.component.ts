import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product= {};

  user:string="Bread";
  constructor(
    categoryService: CategoryService,
    private router:Router,
    private route:ActivatedRoute,
    private productService:ProductService) {
    this.categories$ =categoryService.getCategories();   
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id) {
      this.productService.get(id).subscribe(p => {         
         this.product = p[0];
         console.log(this.product);
      });
    }
  }

  ngOnInit() {
  }

  save(product) {        
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  
}
