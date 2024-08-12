<script lang="ts" setup>
	import { inject, ref } from "vue";
	import TodoItemForm from "./ToDoItemForm.vue";
	import TodoList from "./ToDoList.vue";
	import TodoFilter from "./ToDoFilter.vue";
	import TodoSummary from "./ToDoSummary.vue";
	import todoService from "../services/todo.js";

	const $modals: any = inject("$modals");
	const _filter: any = ref("");
	const _item: any = ref(todoService.getDefault());
	const _items: any = ref([]);

	// Shows a modal to create or edit a to-do item
	function showModal(new_item = true, item = {}) {
		if (new_item) {
			// Prepare a new item
			_item.value = todoService.getDefault();
		} else {
			// Make a copy of the item for editing
			_item.value = todoService.makeCopy(item);
		}

		// Open the modal
		$modals.show("newEditItem").then(
			() => {
				if (new_item) {
					// Add to the list
					_items.value.push(_item.value);
				} else {
					// Replace item
					let index = getIndex(item);
					if (index >= 0) {
						_items.value[index] = _item.value;
					} else {
						alert("Error updating the item");
					}
				}
			},
			() => {
				// Handle cancellation, in this case, just ignore.
			}
		);
	}

	function deleteItem(item: any) {
		$modals.show("deleteItem").then(
			() => {
				let index = getIndex(item);
				if (index >= 0) {
					_items.value.splice(index, 1);
				}
			},
			() => {}
		);
	}

	function getIndex(item: any) {
		let index = _items.value.findIndex((it: any) => {
			return it.id == item.id;
		});
		if (index == -1) {
			return false;
		} else {
			return index;
		}
	}

	function toggleStatus(item: any) {
		item.status = todoService.toggleStatus(item.status);
	}
</script>

<template>
	<div class="project-container">
		<!-- Summary -->
		<TodoSummary :items="_items" class="w3-margin-bottom"></TodoSummary>

		<!-- Filter bar -->
		<div class="w3-margin-bottom">
			<TodoFilter v-model="_filter" class="flex-grow"></TodoFilter>
		</div>

		<!-- Todo list -->
		<TodoList
			v-model="_items"
			:filter="_filter"
			@delete="deleteItem"
			@edit="showModal(false, $event)"
			@toggle="toggleStatus"
		>
			<button class="w3-button w3-blue w3-round-xxlarge" @click="showModal(true)">
				<i class="fa-solid fa-square-plus"></i>
				New item
			</button>
		</TodoList>

		<!-- Modals -->
		<Modal name="newEditItem" title="To Do Item">
			<TodoItemForm v-model="_item"></TodoItemForm>
		</Modal>

		<Modal name="deleteItem" title="Delete To-Do Item">
			<p>
				This action will delete the item:<br />
				<strong>{{ _item.text }}</strong>
			</p>
			<p class="w3-text-red w3-pale-red">This action cannot be undone.</p>
		</Modal>
	</div>
</template>

<style scoped>
	.project-container {
		max-width: 56rem;
		padding: 1rem;
		margin: 0 auto;
	}
</style>
