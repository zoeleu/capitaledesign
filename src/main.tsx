import r2wc from "@r2wc/react-to-web-component";
import { App } from './app.tsx'

const WebApp = r2wc(App);



customElements.define('x-neon-builder', WebApp);