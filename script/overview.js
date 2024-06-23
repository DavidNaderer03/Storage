import { connection } from "./connection/connection.js";
import {paging} from "./render/render.js";

const con = new connection();
const pages = new paging();

let contentList;

async function init() {
    let text = '';
    const response = await con.loadDirectories();
    const json = await response.json();
    json.Directory.forEach(element => {
        text += `<li><a href="${element.url}">${element.name}</a></li>`
    });
    contentList.innerHTML = text;
}

document.addEventListener('render', async (e) => {
    contentList = document.getElementById('content-list');
    await init();
});