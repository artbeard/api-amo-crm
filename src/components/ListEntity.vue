<template>
	<table class="results">
		<thead>
			<tr>
				<td
					v-for="_colunm in tableColunnms"
					:key="_colunm[0]">{{ _colunm[1] }}</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(entity, index) in entities" :key="getParamByKey('id', entity) ?? index">
				<td
					v-for="_colunm in tableColunnms"
					:key="index + _colunm[0]" >{{ getParamByKey(_colunm[0], entity) }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
<script lang="ts">
export interface IColumns{
	[key:string]: string
}
export interface IEntity{
	[key:string] : string|number
}
</script>
<script setup lang="ts">
import { computed, toRaw } from 'vue';
/**
 * Обявление свойств компонента
 */
interface Props{
	primaryKey?: string | null,
	columns?: IColumns,
	entityList?: IEntity[],
}
/**
 * Дефолтные значения для свойств
 */
const props = withDefaults(
	defineProps<Props>(),
	{
		primaryKey: () => null,
		columns: ():IColumns => <IColumns>{id: 'id сущности', title: 'Название сущности'},
		entityList: ():IEntity[] => <IEntity[]>[]
	}
)
/**
 * Массив с колонками колонок 
 */
const tableColunnms = computed(()=>{
	return Object.entries( <IColumns>toRaw(props.columns) );
});
/**
 * Список сущностей
 */
const entities = computed(()=>{
	return props.entityList;
})
/**
 * Выводит значение свойства
 * @param key string
 * @param obj IEntity
 */
const getParamByKey = function(key: string, obj: IEntity):string | number | null {
	if (obj.hasOwnProperty(key))
	{
		return obj[key]
	}
	return null;
}
//TODO сделать генерацию уникального ключа для выводв списков без id
</script>
<style lang="scss">
@import '../colors.scss';
$boder_color: lighten($color_input_border, 45%);
table.results{
	margin: 1rem;
	padding: 0;
	width: 100%;
	tr{
		td{
			border-bottom: 1px solid $boder_color;
			border-right: 1px solid $boder_color;
			padding: 0.25rem 1rem;
		}
		td:last-child{
			border-right: none;
		}
	}
	thead {
		tr{
			td{
				border-top: 1px solid $boder_color;
				font-weight: 600;
			}
		}
	}
}
</style>