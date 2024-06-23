import { connection } from "./connection/connection.js";
import {paging} from "./render/render.js";

const con = new connection();
const pages = new paging();

let contentList;

async function init() {
    console.log("init");
}

document.addEventListener('render', async (e) => {
    contentList = document.getElementById('content-list');
    await init();
});