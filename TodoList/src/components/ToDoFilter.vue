<script lang="ts" setup>
	import { onMounted, ref } from "vue";

	const $props = defineProps(["modelValue"]);
	const $emit: any = defineEmits(["update:modelValue"]);
	const _value: any = ref("");

	onMounted(() => {
		_value.text = $props.modelValue;
	});

	function clear() {
		_value.value = "";
		publishValue();
	}

	function publishValue() {
		$emit("update:modelValue", _value.value);
	}
</script>

<template>
	<div class="flex-container w3-border">
		<input
			v-model="_value"
			class="w3-input w3-border-0"
			placeholder="Enter filter text here..."
			type="text"
			@keyup="publishValue()"
		/>
		<button class="w3-border-0" @click="clear()">
			<i class="fas fa-fw fa-times"></i>
		</button>
	</div>
</template>

<style scoped></style>
