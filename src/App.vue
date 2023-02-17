<template>
	<div>
		<div class="form-row">
			<Dropdown class="form-input mr-1" v-model="typeResource" :data="selectionList"></Dropdown>
			<button
				:disabled="typeResource === null"
				@click="careateResotce()"
				class="btn">
				<i class="spinner" v-if="requestAnimation"></i>
				<template v-else>
					Создать
				</template>
			</button>
		</div>
		<div class="form-row" v-if="validStatus">
			<div class="notice error">{{ validStatus }}</div>
		</div>

	</div>
</template>

<script setup lang="ts">
import Dropdown from './components/Dropdown.vue';
import { ref, reactive } from 'vue';
/**
 * Тип создаваемго ресурса
 */
const typeResource = ref<string|number|null>(null);
/**
 * Варианты создаваемого ресурса
 */
 enum ResTypes {
	Deal = 1,
	Contact,
  	Company,
}
const selectionList = reactive<IListSelectable[]>([
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

//ключ для api 30878566

const requestAnimation = ref<boolean>(false);
const validStatus = ref<string|null>(null);
const careateResotce = function(){
	validStatus.value = null;
	if (typeResource === null)
	{
		validStatus.value = 'Вы не выбрали тип создаваемого ресурса';
		return;
	}
	requestAnimation.value = true;
};
</script>
