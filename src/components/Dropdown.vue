<template>
	<div tabindex="0" @click="onClickDropDown" @blur="toggleDropDown(false)">
		<div class="dropdown-select" :class="{active: dropDownStatus}">
			<div class="dropdown-select__current_value">
				{{ currentValue.label }}
			</div>
			<div class="dropdown-select__toggler"></div>
			<div class="dropdown-select__drop" v-if="dropDownStatus">
				<ul>
					<li
						@click="onSelected(defaultValue)"
						:class="{active: defaultValue.value === currentValue.value}"
						>Не выбрано</li>
					<li
						v-for="_option in data"
						:key="_option.label"
						@click="onSelected(_option)"
						:class="{active: _option.value === currentValue.value}"
						>{{_option.label}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
type OptionValue = string | number | null;

const props = defineProps<{
	modelValue: OptionValue
	data: IListSelectable[]
}>()
const emit = defineEmits<{
	(e: 'update:modelValue', value: OptionValue): void
}>()

const dropDownStatus = ref<null|boolean>(null);
const toggleDropDown = (show: null|boolean = null)=>{
	if (show === null)
	{
		dropDownStatus.value = !dropDownStatus.value;
	}
	else
	{
		dropDownStatus.value = show;
	}
};
/**
 * Переключаем элемент, если кликнули по dropdown, но не по списку выбора
 * @param e MouseEvent Событие мышти
 */
const onClickDropDown = (e: MouseEvent)=>{
	if ((e.target as Element).nodeName !== 'UL' &&
		(e.target as Element).nodeName !== 'LI')
	{
		toggleDropDown();
	}
}

const defaultValue = ref<IListSelectable>({
	value: null,
	label: 'Не выбрано'
});
const currentValue = ref<IListSelectable>(defaultValue.value);
const onSelected = (value: IListSelectable) => {
	currentValue.value = value;
	toggleDropDown(false);
	emit('update:modelValue', currentValue.value.value);
};
</script>

<style lang="scss" scoped>
@import '../colors.scss';
.form-input {

	.dropdown-select {
		cursor: pointer;
		display: flex;
		width: 100%;
		position: relative;

		.dropdown-select__current_value {
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.dropdown-select__toggler {
			flex-shrink: 1;
			width: 20px;
			background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktY2hldnJvbi1kb3duIiB2aWV3Qm94PSIwIDAgMTYgMTYiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTEuNjQ2IDQuNjQ2YS41LjUgMCAwIDEgLjcwOCAwTDggMTAuMjkzbDUuNjQ2LTUuNjQ3YS41LjUgMCAwIDEgLjcwOC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDggMGwtNi02YS41LjUgMCAwIDEgMC0uNzA4eiIvPgo8L3N2Zz4=") no-repeat;
			background-position: center center;
		}

		.dropdown-select__drop {
			display: block;
			position: absolute;
			background: white;
			top: 100%;
			width: 100%;
			border: 1px solid lighten($color_input_border, 10%);
			border-radius: 0.25rem;
			margin-top: 0.5rem;

			ul {
				margin: 0;
				padding: 0;

				li {
					list-style: none;
					padding: 0.25rem 1rem;
					margin: 0;
				}

				li:hover {
					background: darken(#FFF, 5%);
				}

				li.active {
					color: white;
					background: lighten($color_primary, 20%);
				}
			}
		}
	}

	.dropdown-select.active {
		.dropdown-select__toggler {
			transform: rotate(180deg);
		}
	}
}
</style>