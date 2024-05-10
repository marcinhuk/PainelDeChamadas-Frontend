import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, map } from 'rxjs'

import { io } from 'socket.io-client'

import { API_BASE_URL } from '../../../environments/environment.pd'
import { SOCKET_IO_BASE_URL } from '../../../environments/environment.pd'

@Injectable({
	providedIn: 'root'
})

export class PedidosService {

	socket = io(SOCKET_IO_BASE_URL)
	sound$: Subject<any> = new  Subject<any>()
	layout$: Subject<any> = new  Subject<any>()
	orders$: Subject<any> = new  Subject<any>()

	httpClient = inject(HttpClient)

	getOrders = (): Observable<any> => {
		return this.httpClient.get<any>(API_BASE_URL+'/orders/?_sort=id&_order=desc').pipe(
			map(obj => obj)
		)
	}

	deleteOrder = (id: string): Observable<any> => {
		return this.httpClient.delete<any>(API_BASE_URL+'/orders/'+id).pipe(
			map(obj => obj)
		)
	}

	postOrder = (order: number): Observable<any> => {
		const id = Number(Date.now())
		return this.httpClient.post<any>(API_BASE_URL+'/orders', { id, order }).pipe(
			map(obj => obj)
		)
	}

	getConfigs = (): Observable<any> => {
		return this.httpClient.get<any>(API_BASE_URL+'/configs').pipe(
			map(obj => obj)
		)
	}

	patchSound = (value: boolean): Observable<any> => {
		return this.httpClient.patch<any>(API_BASE_URL+'/configs/sound', { value }).pipe(
			map(obj => obj)
		)
	}

	patchLayout = (quantidade: number): Observable<any> => {
		return this.httpClient.patch<any>(API_BASE_URL+'/configs/layout', {value: quantidade}).pipe(
			map(obj => obj)
		)
	}

	listenerSound = (): Observable<any> => {
		this.socket.on('receivedSound', (sound) => {
			this.sound$.next(sound)
		})

		return this.sound$.asObservable()
	}

	listenerLayout = (): Observable<any> => {
		this.socket.on('receivedLayout', (layout) => {
			this.layout$.next(layout)
		})

		return this.layout$.asObservable()
	}

	listenerOrders = (): Observable<any> => {
		this.socket.on('receivedOrders', (orders) => {
			this.orders$.next(orders)
		})

		return this.orders$.asObservable()
	}

	getInicialInformations = () => {
		this.socket.emit('inicialInformations')
	}
}