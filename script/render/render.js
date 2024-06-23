import {connection} from "../connection/connection.js";
import {render} from "../Event/loadHandler.js";

export class paging {
    constructor() {
        this.con = new connection();
    }
    async renderPage(name) {
        const response = await this.con.loadPages();
        const json = await response.json();
        for (const element of json) {
            if(element.name === name)
            {
                document.title = element.name;
                const content = await this.#fileContent(element.url);
                document.getElementById('content').innerHTML = content;
                const head = document.head;
                const script = document.createElement('script');
                script.src = element.script;
                script.type = "module";
                script.setAttribute('render-id', 'true');
                try {
                    await this.#removeScript();
                }
                catch (e) {
                    console.debug(e);
                }
                head.appendChild(script);
                localStorage.setItem("script", element.script);
                document.dispatchEvent(render);
            }
        }
    }

    async #fileContent(url) {
        return (await fetch(url)).text();
    }

    async #removeScript() {
        const scripts = document.querySelectorAll('script[type="module"][render-id="true"]');
        scripts.forEach(element => {
            element.parentElement.removeChild(element);
        });
    }
}