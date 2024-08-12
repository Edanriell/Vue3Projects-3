<script lang="ts" setup>
	import { computed } from "vue";
	import todoService from "../../services/todo.js";

	const $props = defineProps({
			items: { type: Array, default: () => [] }
		}),
		_status = computed(() => {
			let status: any = {};
			todoService.getStatusList().forEach((stat) => {
				status[stat.id] = 0;
			});
			$props.items.forEach((todo: any) => {
				status[todo.status] += 1;
			});
			return status;
		});
</script>

<template>
	<div class="summary-wrapper">
		<div class="w3-light-gray">
			<strong>Pending</strong>
			<h2>{{ _status?.not_started }}</h2>
		</div>
		<div class="w3-teal">
			<strong>In progress</strong>
			<h2>{{ _status?.in_progress }}</h2>
		</div>
		<div class="w3-green">
			<strong>Completed</strong>
			<h2>{{ _status?.completed }}</h2>
		</div>
	</div>
</template>

<style scoped>
	.summary-wrapper {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.summary-wrapper div {
		padding: 1rem;
	}

	h2 {
		font-size: 3rem;
		margin: 0;
	}
</style>
