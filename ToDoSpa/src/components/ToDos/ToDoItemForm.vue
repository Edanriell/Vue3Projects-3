<script lang="ts" setup>
	import { ref } from "vue";
	import todoService from "../../services/todo.js";

	const $props = defineProps({
		modelValue: {
			type: Object,
			default: () => {
				return {};
			}
		}
	});
	const $emit: any = defineEmits(["update:modelValue"]);
	const _item: any = ref({});

	_item.value = { ...$props.modelValue };

	function emitUpdate() {
		$emit("update:modelValue", _item.value);
	}
</script>

<template>
	<div class="w3-cell-row w3-padding">
		<div class="w3-cell w3-padding">
			<strong>Description</strong>
			<input
				v-model.string="_item.text"
				class="w3-input w3-border"
				type="text"
				@blur="emitUpdate()"
			/>
		</div>

		<div class="w3-cell w3-padding">
			<strong>Status</strong>
			<select v-model.string="_item.status" class="w3-select w3-border" @change="emitUpdate()">
				<option v-for="state in todoService.getStatusList()" :key="state.id" :value="state.id">
					{{ state.label }}
				</option>
			</select>
		</div>
	</div>
</template>

<style scoped></style>
