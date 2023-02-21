import axios from 'axios';
import { defineStore } from 'pinia'

/**
 * Структура сущности
 */
export interface IEntity{
	id: number,
	name: string
}
/**
 * структура хранилища
 */
interface IStore{
	entityList: IEntity[],
}
/**
 * Интерфейс ошибки
 */
export interface ICreateError
{
	code: number,
	detail: string
}

/**
 * типы ресурсов
 */
export enum ResTypes {
	Deal = 'deal',
	Contact = 'contact',
  	Company = 'company',
}
/**
 * Эндпоинты api
 */
const endPoints = {
	deal: '/api/v4/leads',
	contact: '/api/v4/contacts',
	company: '/api/v4/companies'
}
/**
 * Имена ресурсов
 */
const resNames = {
	deal: 'Сделка',
	contact: 'Контакт',
	company: 'Компания',
};

/**
 * Содержимое хранилища
 */
const state:IStore = {
	entityList: [],
}

const useStore = defineStore('store', {
	state: ():IStore => state,
	actions: {
		addEntity(entity: IEntity): void
		{
			this.entityList.push(entity);
		},
		
		async createEntity(intityType: ResTypes, entityName: string): Promise<boolean | ICreateError>
		{
			return axios.post(endPoints[intityType] as string, {
				entityName
			}, {
				headers: {
					'Content-Type': 'application/json',
				},
				validateStatus: function (status: number) {
					return status < 300;
				},
			}).then(result => {
				//Добавляем сущность
				this.addEntity({
					id: result.data.id as number,
					name: `${entityName} (${resNames[intityType]})`,
				})
				return Promise.resolve(true);
			})
			.catch((e) => {
				//Маппинг ошибок
				let mesage = '';
				switch(e.response.status) {
					case 400: mesage = e.response.data.message ?? 'Ошибка создания сущности'; break;
					case 401: mesage = 'Необходима авторизация'; break;
					default: mesage = e.mesage; break;
				}
				return Promise.reject({
					code: e.response.status,
					detail: mesage
				});
			})
		}
	},
});

export default useStore;