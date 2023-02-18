<template>
	<div>
		<div class="form-row">
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
		<div class="form-row" v-if="validationMessage">
			<div class="notice error">{{ validationMessage }}</div>
		</div>
		<ListEntity :columns="columns" :entity-list="listEntity"></ListEntity>
	</div>
</template>

<script setup lang="ts">
import Dropdown, { IListSelectable, OptionValue } from './components/Dropdown.vue';
import Button from './components/Button.vue';
import ListEntity, { IColumns, IEntity } from './components/ListEntity.vue'
import { ref, reactive, computed, markRaw } from 'vue';
/**
 * Тип создаваемго ресурса
 */
const typeResource = ref<OptionValue>(null);
/**
 * Варианты создаваемого ресурса
 */
 enum ResTypes {
	Deal = 1,
	Contact,
  	Company,
}
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
 * колонки для таблицы, которя будет выводить созданные сущности сущности
 */
const columns: IColumns = markRaw({
	id: 'Id Созданной сущности',
	title: 'Название созданной сущности',
})
//временное хранение моковых данных
const listEntity:IEntity[] = reactive([
	{
		id: 153, title: '1-я сущность'
	},
	{
		id: 154, title: '2-я сущность'
	},
	{
		id: 155, title: '3-я сущность'
	},

]);

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
};
</script>
