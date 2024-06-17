import { Component, HostListener } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'

import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

import { OrdersService } from '../../../services/orders/orders.service'

import { TableComponent } from './table/table.component'

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [
		CommonModule, ReactiveFormsModule, MatSelectModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, TableComponent,
		MatSlideToggleModule
	],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss'
})

export class AdminComponent {

	formGroupOrder: FormGroup
	formGroupLayout: FormGroup
	dataSource: Array<any> = []
	sound: boolean = true
	layout: string = ''
	dataGridHeight: number = 0
	qtdRegistro: string = ''

	constructor(private ordersService: OrdersService, private formBuilder: FormBuilder){
		this.formGroupOrder = this.formBuilder.group({
			order: ['', Validators.required]
		})

		this.formGroupLayout = this.formBuilder.group({
			layout: ['', Validators.required]
		})
	}

	ngOnInit(){
		this.dataGridHeight = window.innerHeight - 145

		this.getConfigs()
		this.getOrders()
	}

	@HostListener("window: resize")
	resizeScreen(): void {
		this.dataGridHeight = window.innerHeight - 145
	}

	getOrders = () => {
		this.ordersService.getOrders().subscribe((data) => {
			this.dataSource = data
			this.qtdRegistro = data.length == 0 ? 'No orders.' : data.length == 1 ? `${data.length} order.` : `${data.length} orders.`
		})
	}

	getConfigs = () => {
		this.ordersService.getConfigs().subscribe((data) => {
			this.sound = data[1].value
			this.layout = data[0].value
			this.formGroupLayout.controls['layout'].setValue(this.layout)
		})
	}

	postOrder = () => {
		this.ordersService.postOrder(this.formGroupOrder.controls['order'].value).subscribe((data) => {
			this.getOrders()
			this.formGroupOrder.reset()
		})
	}

	deleteOrder = (id: string) => {
		this.ordersService.deleteOrder(id).subscribe((data) => {
			this.getOrders()
		})
	}

	patchLayout = () => {
		this.ordersService.patchLayout(this.formGroupLayout.controls['layout'].value).subscribe()
	}

	patchSound = () => {
		this.ordersService.patchSound(!this.sound).subscribe(() => {
			this.sound = !this.sound
		})
	}
}