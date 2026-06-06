import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { CategoryService } from '@/app/services/category.service';
import { ProductService } from '@/app/services/product.service';
import { GlobalConstants } from '@/app/shared/global-constants';
import { SnackbarService } from '@/app/services/snackbar.service';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormField, MatLabel, MatError } from '@angular/material/input';
import { MatOption } from '@angular/material/select';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatDialogContent,
    MatTableModule,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogActions,
    MatOption,
  ],
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  categorys: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBulider: FormBuilder,
    protected productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBulider.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categorys = response;
      },
      (error) => {
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }
  add() {
    var formData = this.productForm.value;
    var data = {
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };

    this.productService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        alert('Successfully Add Product');
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        alert(this.responseMessage + ' ' + GlobalConstants.error);
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }
  edit() {
    var formData = this.productForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };
    this.productService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        alert('Successfully Update Product');
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
        console.error(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        alert(this.responseMessage + ' ' + GlobalConstants.error);
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }
}
