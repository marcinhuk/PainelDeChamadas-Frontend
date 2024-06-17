import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core'

import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'

import { OrdersService } from '../../../../services/orders/orders.service'

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
	standalone: true,
	imports: [MatTableModule, MatIconModule]
})

export class TableComponent implements AfterViewInit {
	displayedColumns = ['id', 'order', 'actions']
	@Input() dataSource: any
	@Output("list") list: EventEmitter<any> = new EventEmitter()

	constructor(private ordersService: OrdersService){}

	ngAfterViewInit(): void {}

	delete = (id: string) => {
		this.ordersService.deleteOrder(id).subscribe(() => {
			this.list.emit()
		})
	}
}