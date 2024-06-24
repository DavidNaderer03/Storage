import { render } from "./script/Event/loadHandler.js";
import {paging} from "./script/render/render.js";
import {connection} from "./script/connection/connection.js";

const pages = new paging();
const con = new connection();

document.addEventListener('DOMContentLoaded', async () => {
    await initMenu();
    await pages.renderPage("Home");
    document.dispatchEvent(render);
});

async function initMenu() {
    let text = '';
    const response = await con.loadPages();
    const json = await response.json();
    json.forEach(element => {
        text += `<li class="nav-item" val="${element.name}"><i class="bi ${element.icon}"></i></li>`;
    });
    document.getElementsByClassName('nav-menu-items')[0].innerHTML = text;
    setListener();
}

function setListener() {
    document.querySelectorAll('.nav-item').forEach(element => {
        element.addEventListener('click', async () => {
            await pages.renderPage(element.getAttribute('val'));
        })
    });
}