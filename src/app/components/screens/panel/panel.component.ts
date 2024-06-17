import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Subscription } from 'rxjs'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { SocketService } from '../../../services/socket/socket.service'

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
	maxClients: boolean = false

	socketService = inject(SocketService)

	constructor(){

		this.socketService.socketConnect()

		const subListenerMaxClients = this.socketService.listenerMaxClients().subscribe({
			next: (data) => {
				if (data){
					this.maxClients = true
					this.subscribes.unsubscribe()
				} else {
					this.listenerSound()
					this.listenerLayout()
					this.listenerOrders()

					this.socketService.getInicialInformations()
				}
			}
		})

		this.subscribes.add(subListenerMaxClients)
	}

	ngOnDestroy(){
		this.subscribes.unsubscribe()

		this.socketService.socketDisconnect()
	}

	listenerSound = () => {
		const subListenerSound = this.socketService.listenerSound().subscribe((data) => {
			this.sound = data.sound.value
		})

		this.subscribes.add(subListenerSound)
	}

	listenerLayout = () => {
		const subListenerLayout = this.socketService.listenerLayout().subscribe((data) => {
			this.layout = data.layout.value

			const fator = data.layout.value.split('x')

			this.amountOrders = fator[0] * fator[1]
		})

		this.subscribes.add(subListenerLayout)
	}

	listenerOrders = () => {
		const subListenerOrders = this.socketService.listenerOrders().subscribe((data) => {
			if (data.verb == 'POST' && this.sound){
				const song = new Audio()
				song.src = "../../../assets/songs/Fanfarra2.wav"
				song.load()
				song.play()
			}

			//data.orders(9).fill('')
			data.orders.push('', '', '', '', '', '', '', '', '')

			this.dataSource = data.orders
		})

		this.subscribes.add(subListenerOrders)
	}
}