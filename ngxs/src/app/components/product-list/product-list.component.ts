import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../Models/product';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];
  product!: Product;
  show: boolean = false;
  invalidField: boolean = false;
  editProductForm!: FormGroup;
  editableProduct!: Product;
  editProductId!: number;
  deleteProductId!: number;
  loading = new BehaviorSubject<boolean>(false);

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.initForm();
  }

  initForm() {
    this.editProductForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.maxLength(15)]],
      brand: ['', [Validators.required, Validators.maxLength(15)]],
      availableCount: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{1,3}$')],
      ],
    });
  }

  submitEditProductForm() {
    this.loading.next(true);
    if (this.editProductForm.valid) {
      this.invalidField = false;
      this.productService
        .editProduct(this.editProductId, this.editProductForm.value)
        .subscribe(() => {
          this.loading.next(false);
          this.router.navigate(['product-list']).then(() => {
            this.ngOnInit();
          });
        });
    }

    if (this.editProductForm.invalid) {
      this.invalidField = true;
    }
  }

  closeModel() {
    this.editProductForm.reset();
  }

  getProduct() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.loading.next(false);
      this.productList = res;
      console.log(this.productList);
      console.log("this is else block so apic call hogi");
      this.productService.product=res;
      
    });
  }

  getDeleteProductId(productId: number) {
    this.deleteProductId = productId;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.deleteProductId).subscribe(() => {
      this.getProduct();
      // this.ngOnInit();
    });
  }

  getSingleProduct(productId: number) {
    this.productService.getSingleProduct(productId).subscribe((res) => {
      this.product = res;
      this.show = true;
    });
  }

  goToProductList() {
    this.show = false;
  }

  editProduct(productId: number) {
    this.editProductId = productId;
    this.productService
      .getSingleProduct(productId)
      .subscribe((res: Product) => {
        this.editProductForm.patchValue(res);
      });
  }
}
