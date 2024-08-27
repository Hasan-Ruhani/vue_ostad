import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Nprogress from "nprogress";            // for loading bar
import { router } from '@inertiajs/vue3';     // for route

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    return pages[`./Pages/${name}.vue`]
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})

router.on('start', () => Nprogress.start());    // for loading bar
router.on('finish', () => Nprogress.done());