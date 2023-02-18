<template>
	<button
		class="btn"
		:class="{btn_disable: disable}"
		@click.prevent="customClick">
		<i class="spinner" v-if="animate"></i>
		<template v-else>
			<slot></slot>
		</template>
	</button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
/**
 * Обявление свойств компонента
 */
interface Props{
	disable?: boolean,
	animate?: boolean,
}
/**
 * Дефолтные значения для свойств
 */
const props = withDefaults(
	defineProps<Props>(),
	{
		disable: false,
		animate: false
	}
)

const disable = computed(()=>props.disable);
const animate = computed(()=>props.animate);

const emit = defineEmits<{
	(e: 'click', value: MouseEvent): void
}>()

/**
 * Генерируем свойство только если кнопка активна
 * @param e MouseEvent
 */
const customClick = (e: MouseEvent) => {
	if (!props.disable)
	{
		emit('click', e)
	}
}
</script>

<style  lang="scss" scoped>
@import '../colors.scss';
button.btn {
	// display: inline-block;
	display: inline-flex;
	align-items: center;
	color: white;
	text-align: center;
	vertical-align: middle;
	background-color: $color_primary;
	border: 1px solid darken($color_primary, 10%);
	padding: 0.438rem 1rem;
	font-size: .894rem;
	line-height: 1.54;
	border-radius: 0.15rem;
}

button.btn:hover {
	background-color: lighten($color_primary, 2%);
}

button.btn:active {
	background-color: darken($color_primary, 5%);
}

button.btn.btn_disable {
	background-color: $color_secondary !important;
	color: black;
	border-color: darken($color_secondary, 10%) !important;
}

button.btn:hover {
	border-color: #646cff;
}

i.spinner {
	display: inline-block;
	width: 0.5rem;
	height: 0.5rem;
	vertical-align: text-bottom;
	border: 0.15rem solid white;
	border-right-color: transparent;
	border-top-color: transparent;
	border-radius: 50%;
	animation: .75s linear infinite spinner;
}



@keyframes spinner {
	to {
		transform: rotate(360deg)
	}
}

</style>
