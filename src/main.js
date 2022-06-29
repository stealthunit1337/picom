import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import router from '@/router/router'

const app = createApp(App)

components.forEach(comp => {app.component(comp.name, comp)})

app
    .use(router)
    .mount('#app')
