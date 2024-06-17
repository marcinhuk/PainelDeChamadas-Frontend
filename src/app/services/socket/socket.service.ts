import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';

import { SOCKET_IO_BASE_URL } from '../../../environments/environment.pd';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

	private socket = io()
	maxClients$: Subject<any> = new  Subject<any>()
	sound$: Subject<any> = new  Subject<any>()
	layout$: Subject<any> = new  Subject<any>()
	orders$: Subject<any> = new  Subject<any>()

	socketConnect = () => {
		this.socket = io(SOCKET_IO_BASE_URL)
	}

	socketDisconnect = () => {
		this.socket.disconnect()
	}

	listenerSound = (): Observable<any> => {
		this.socket.on('receivedSound', (sound) => {
			this.sound$.next(sound)
		})

		return this.sound$
	}

	listenerLayout = (): Observable<any> => {
		this.socket.on('receivedLayout', (layout) => {
			this.layout$.next(layout)
		})

		return this.layout$
	}

	listenerOrders = (): Observable<any> => {
		this.socket.on('receivedOrders', (orders) => {
			this.orders$.next(orders)
		})

		return this.orders$
	}

	listenerMaxClients = () => {
		this.socket.on('maxClients', (data) => {
			this.maxClients$.next(data)
		})

		return this.maxClients$
	}

	getInicialInformations = () => {
		this.socket.emit('inicialInformations')
	}
}