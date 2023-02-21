<template>
	<div>
		<div class="form-row form-center">
			<Dropdown
				class="form-input mr-1"
				v-model="typeResource"
				:data="selectionList"
				></Dropdown>
			<Button
				:disable="disableButton"
				:animate="isRequest"
				@click="createResource">
				Создать
			</Button>
		</div>
		<div class="form-row form-center" v-if="validationMessage">
			<div class="notice error">{{ validationMessage }}</div>
		</div>
		<ListEntity
			:entity-list="listEntity"
			v-if="listEntity.length > 0"></ListEntity>
	</div>
</template>
<script setup lang="ts">
import Dropdown, { IListSelectable, OptionValue } from './components/Dropdown.vue';
import Button from './components/Button.vue';
import ListEntity from './components/ListEntity.vue'
import { ref, computed, markRaw } from 'vue';
import useStore, { IEntity, ResTypes, ICreateError } from './store/store'
/**
 * Хранилище
 */
const store = useStore();
/**
 * Тип создаваемго ресурса
 */
const typeResource = ref<OptionValue>(null);
/**
 * простой список для выбора создаваемых сущностей,
 * реактивность не нужна
 */
const selectionList = markRaw<IListSelectable[]>([
	{
		value: ResTypes.Deal,
		label: 'Сделка'
	},
	{
		value: ResTypes.Contact,
		label: 'Контакт'
	},
	{
		value: ResTypes.Company,
		label: 'Компания'
	},
]);
/**
 * Список сущностей для отображения
 */
const listEntity = computed<IEntity[]>(() => {
	return store.entityList;
})
/**
 * Флаг выполнения запроса (для анимации)
 */
const isRequest = ref<boolean>(false);
/**
 * активация/деактивация кнопки
 */
const disableButton = computed(()=>{
	return typeResource.value === null;
})
/**
 * сообщение об ошибке
 */
const validationMessage = ref<string|null>(null);
/**
 * Функция создания сущности
 */
const createResource = function(){
	//Если запрос уже выполняется, ждем его окончания
	if (isRequest.value)
		return;
	validationMessage.value = null;
	if (typeResource.value === null)
	{
		validationMessage.value = 'Вы не выбрали тип создаваемого ресурса';
		return;
	}
	isRequest.value = true;

	let newCompanyName = 'Ресурс';
	/**
	 * Можно попросить пользователя ввести имя создаваемой сущности
	 */
	newCompanyName = prompt('Вы можете ввести имя для создания именованой сущности', '') as string;
	// if (!newCompanyName)
	// {
	// 	validationMessage.value = 'Введите имя ресурса';
	// 	return;
	// }
	store.createEntity(typeResource.value as ResTypes, newCompanyName as string)
		.catch((err: ICreateError) => {
			validationMessage.value = err.detail;
		})
		.finally(()=>{
			isRequest.value = false;
		});
};


</script>
