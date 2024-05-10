import { Component, ElementRef, HostListener, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { PedidosService } from '../../../services/pedidos/pedidos.service'
import { Observable, Subscription } from 'rxjs'

@Component({
	selector: 'app-panel',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, RouterLink],
	templateUrl: './panel.component.html',
	styleUrl: './panel.component.scss'
})

export class PanelComponent {

	dataSource: Array<any> = []
	amountOrders: number = 0
	layout: string = ''
	private subscribes = new Subscription()
	private sound: boolean = true

	pedidosService = inject(PedidosService)

	constructor(){
		this.listenerSound()
		this.listenerLayout()
		this.listenerOrders()

		this.pedidosService.getInicialInformations()
	}

	ngOnDestroy(){
		this.subscribes.unsubscribe()
	}

	listenerSound = () => {
		const subListenerSound = this.pedidosService.listenerSound().subscribe((data) => {
			this.sound = data.sound.value
		})

		this.subscribes.add(subListenerSound)
	}

	listenerLayout = () => {
		const subListenerLayout = this.pedidosService.listenerLayout().subscribe((data) => {
			this.layout = data.layout.value

			const fator = data.layout.value.split('x')

			this.amountOrders = fator[0] * fator[1]
		})

		this.subscribes.add(subListenerLayout)
	}

	listenerOrders = () => {
		const subListenerOrders = this.pedidosService.listenerOrders().subscribe((data) => {
			if (data.verb == 'POST' && this.sound){
				const song = new Audio()
				song.src = "../../../assets/songs/Fanfarra2.wav"
				song.load()
				song.play()
			}

			data.orders.push('', '', '', '', '', '', '', '', '')

			this.dataSource = data.orders
		})

		this.subscribes.add(subListenerOrders)
	}
}