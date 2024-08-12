import { reactive } from "vue";
import Modal from "./Modal.vue";

const _current = reactive({
		name: "",
		resolve: null,
		reject: null
	}) as any,
	api = {
		active() {
			return _current.name;
		},
		show(name: any) {
			_current.name = name;
			return new Promise((resolve = () => {}, reject = () => {}) => {
				_current.resolve = resolve;
				_current.reject = reject;
			});
		},
		accept() {
			_current.resolve();
			_current.name = "";
		},
		cancel() {
			_current.reject();
			_current.name = "";
		}
	},
	plugin = {
		install(App: any, options: any) {
			// Register global component
			App.component("Modal", Modal);

			// Provide API
			App.provide("$modals", api);
		}
	};

export default plugin;
