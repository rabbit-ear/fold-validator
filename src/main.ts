import { mount } from 'svelte';
import "./reset.css";
import "./ui.css";
import "./app.css";
import App from "./components/App.svelte";

const app = mount(App, { target: document.getElementById("app") });

export default app
