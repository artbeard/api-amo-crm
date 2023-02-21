<template>
	<table class="results">
		<thead>
			<tr>
				<td>id</td>
				<td>Наименование сузности</td>
			</tr>
		</thead>
		<tbody>
			<tr v-for="entity in entities" :key="entity.id">
				<td>{{ entity.id }}</td>
				<td>{{ entity.name }}</td>
			</tr>
		</tbody>
	</table>
</template>
<script setup lang="ts">
import { IEntity } from '../store/store';
import { computed } from 'vue';
/**
 * Обявление свойств компонента
 */
interface Props{
	entityList: IEntity[],
}
/**
 * Дефолтные значения для свойств
 */
const props = withDefaults(
	defineProps<Props>(),
	{
		entityList: ():IEntity[] => <IEntity[]>[]
	}
)
/**
 * Список сущностей
 */
const entities = computed<IEntity[]>(()=>{
	return props.entityList;
})
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