import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClProducto } from '../model/ClProducto';
import { ProductServiceService } from 'src/app/producto/producto-service.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  productForm!: FormGroup;
  producto: ClProducto = {
    id: 1, nombreprod: '', categoria: '', precio: 0,
    codigo: '',
    cantidad: '',
    fechaNacimiento: '',
    rut: null,
    dv: '',
    enfermedad: '',
    fonocontacto: 0,
    editorial: '',
    raza: '',
    edad: 0,
    altura: 0,
    hrini: '',
    hrfin: '',
    direccion: '',
    fCreacion: ''
  };
  id: any = '';


  constructor(
    public restApi: ProductServiceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    console.log("ngOnInit ID:" + this.route.snapshot.params['id']);
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'prod_name': [null, Validators.required],
      'prod_desc': [null, Validators.required],
      'prod_price': [null, Validators.required]
    });
  }


  async onFormSubmit() {
    console.log("onFormSubmit ID:" + this.id);


    if (this.productForm.valid) {
      this.producto.id = this.id;
      this.producto.nombreprod = this.productForm.value.prod_name;
      this.producto.categoria = this.productForm.value.prod_desc;
      this.producto.precio = this.productForm.value.prod_price;


      await this.restApi.updateProduct(this.id, this.producto).subscribe({
        next: (res) => {
          let id = res['id'];
          this.presentAlertConfirm('Producto actualizado exitosamente.');
        },
        complete: () => {},
        error: (err) => {
          console.log(err);
        },
      });
    }
  }


  async getProduct(id: number) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });


    await loading.present();


    await this.restApi.getProduct(id + '').subscribe({
      next: (data) => {
        console.log("getProductID data****");
        console.log(data);


        this.id = data.id;


        this.productForm.setValue({
          prod_name: data.nombreprod,
          prod_desc: data.categoria,
          prod_price: data.precio
        });


        loading.dismiss();
      },
      complete: () => {},
      error: (err) => {
        console.log("getProductID Errr****+");
        console.log(err);
        loading.dismiss();
      },
    });
  }


  async presentAlertConfirm(msg: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/product-list/']);
          }
        }
      ]
    });
    await alert.present();
  }
}







