<script setup>
	import { ref } from "vue";

	const _value = ref(false);
	const $props = defineProps({ modelValue: { type: Boolean, default: false } });
	const $emit = defineEmits(["update:modelValue"]);
	_value.value = $props.modelValue;
</script>

<template>
	<input
		v-model="_value"
		class="toggle"
		type="checkbox"
		@change="$emit('update:modelValue', _value)"
	/>
</template>

<style scoped>
	.toggle {
		--border-width: 2px;
		--toggle-width: 2rem;
		position: relative;
		border: 0;
		outline: 0;
		cursor: pointer;
		appearance: none;
		transition: all 200ms linear;
	}

	.toggle:before {
		content: " ";
		display: inline-block;
		border: var(--border-width) solid #ccc;
		width: var(--toggle-width);
		height: 1.2em;
		border-radius: 1rem;
		background-color: #eee;
		transition: all 200ms linear;
		vertical-align: middle;
	}

	.toggle:after {
		content: "";
		display: inline-block;
		position: absolute;
		width: calc(1rem - var(--border-width));
		height: calc(1rem - var(--border-width));
		border: 1px solid;
		top: var(--border-width);
		left: var(--border-width);
		border-radius: 100%;
		background-color: #fff;
		border-color: #ccc;
		transition: all 200ms linear;
	}

	.toggle:checked:before {
		background-color: #27b627;
		border-color: #177017;
	}

	.toggle:checked:after {
		left: calc(var(--toggle-width) - 1rem + var(--border-width));
	}
</style>
