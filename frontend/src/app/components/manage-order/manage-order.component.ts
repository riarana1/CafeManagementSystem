import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BillService } from '@/app/services/bill.service';
import { CategoryService } from '@/app/services/category.service';
import { ProductService } from '@/app/services/product.service';
import { SnackbarService } from '@/app/services/snackbar.service';
import { GlobalConstants } from '@/app/shared/global-constants';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatIcon,
    MatTableModule,
    MatFormFieldModule,
    MatOption,
    MatSelect,
    MatInputModule,
    MatButtonModule,
  ],
})
export class ManageOrderComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource = new MatTableDataSource<any>([]);
  manageOrderForm!: FormGroup;
  categories: any = [];
  products: any = [];
  price: number = 0;
  totalAmount: number = 0;
  responseMessage: string = '';

  private formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private billService = inject(BillService);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.manageOrderForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required]],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
    });
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getFilteredCategories().subscribe(
      (response: any) => {
        this.categories = response;
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }

  getProductsByCategory(value: any) {
    this.productService.getProductByCategory(value.id).subscribe(
      (response: any) => {
        this.products = response;
        this.manageOrderForm.controls['price'].setValue('');
        this.manageOrderForm.controls['quantity'].setValue('');
        this.manageOrderForm.controls['total'].setValue(0);
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }

  getProductDetails(value: any) {
    //console.log("inside getProductDetails");
    this.productService.getById(value.id).subscribe(
      (response: any) => {
        this.price = response.price;
        this.manageOrderForm.controls['price'].setValue(response.price);
        this.manageOrderForm.controls['quantity'].setValue('1');
        this.manageOrderForm.controls['total'].setValue(this.price * 1);
        this.cdr.detectChanges();
      },
      (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }

  setQuantity(value: any) {
    var temp = this.manageOrderForm.controls['quantity'].value;
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value,
      );
    } else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(
        this.manageOrderForm.controls['quantity'].value *
          this.manageOrderForm.controls['price'].value,
      );
    }
  }

  validateProductAdd() {
    var formData = this.manageOrderForm.value;

    var priceValue = this.manageOrderForm.controls['price'].value;
    if (
      priceValue === null ||
      formData.total === 0 ||
      formData.total === '' ||
      formData.quantity <= 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  validateSubmit() {
    var formData = this.manageOrderForm.value;
    if (
      this.totalAmount === 0 ||
      !formData.product?.name ||
      this.manageOrderForm.controls['email'].value === null ||
      formData.contactNumber === null ||
      formData.paymentMethod === null
    ) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    var fromData = this.manageOrderForm.value;
    var productName = this.dataSource.data.find(
      (e: { id: number }) => e.id === fromData.product.id,
    );
    if (productName === undefined) {
      this.totalAmount = this.totalAmount + fromData.total;
      this.dataSource.data.push({
        id: fromData.product.id,
        name: fromData.product.name,
        category: fromData.category.name,
        quantity: fromData.quantity,
        price: fromData.price,
        total: fromData.total,
      });
      this.dataSource.data = [...this.dataSource.data];
      this.snackbarService.openSnackBar(GlobalConstants.productAdded, 'Success');
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error);
    }
  }

  handleDeleteAction(value: any, element: any) {
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.data.splice(value, 1);
    this.dataSource.data = [...this.dataSource.data];
  }

  submitAction() {
    var formData = this.manageOrderForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount.toString(),
      productDetails: JSON.stringify(this.dataSource.data),
    };

    this.billService.generateReport(data).subscribe(
      (response: any) => {
        this.downloadFile(response?.uuid);
        this.manageOrderForm.reset();
        this.dataSource.data = [];
        this.totalAmount = 0;
      },
      (error: any) => {
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }
  downloadFile(fileName: string) {
    var data = {
      uuid: fileName,
    };
    this.billService.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
    });
  }
}
