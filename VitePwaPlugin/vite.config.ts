import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		vueDevTools(),
		VitePWA({
			registerType: "autoUpdate",
			injectRegister: "auto",
			devOptions: { enabled: true },
			workbox: {
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
			},
			includeAssets: ["fonts/*.ttf", "images/*.png", "css/*.css"],
			manifest: {
				short_name: "PWA Example",
				name: "Progressive Web Application Example",
				start_url: "/",
				display: "standalone",
				theme_color: "#333333",
				background_color: "#000000",
				orientation: "portrait",
				prefer_related_applications: false
			}
		})
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	}
});
