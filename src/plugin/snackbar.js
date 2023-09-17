// snackbar.js
import { createApp } from 'vue';
// import Snackbar from '@/components/common/SnacbarComponent.vue';

const snackbarInstance = createApp(Snackbar);

const snackbarPlugin = {
  install(app) {
    const instance = snackbarInstance.mount(document.createElement('div'));

    app.config.globalProperties.$snackbar = {
      show(message) {
        instance.message = message;
      },
    };

    document.body.appendChild(instance.$el);
  },
};

export default snackbarPlugin;
