import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../Models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() item!: any;
  id!:number;

  constructor(
    private route: ActivatedRoute, 
    private productService:ProductService,
    private location:Location
    ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => this.id=params['id']);
    this.productService.getSingleProduct(this.id).subscribe(
      (res:Product)=>{
        this.item=res;
      }
    );
  }

  goToProductList() {
    this.location.back();
  
  }

  
}
