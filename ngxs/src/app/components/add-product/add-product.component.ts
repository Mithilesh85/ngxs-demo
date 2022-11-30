import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm!:FormGroup;
  invalidField!:boolean;

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.addProductForm=this.formBuilder.group({

      productName:['',[Validators.required,Validators.maxLength(15)]],
      brand:['',[Validators.required,Validators.maxLength(15)]],
      availableCount:['',[Validators.required,Validators.pattern("^[0-9]{1,3}$")]],

    });
  }

  submitAddProductForm(){
    if(this.addProductForm.valid){
      this.invalidField=false;
      this.productService.addProduct(this.addProductForm.value).subscribe(
        ()=>{
          this.router.navigate(['product-list']);
        }
      );
    }
    else{
      this.invalidField=true;
    }

  }

}
