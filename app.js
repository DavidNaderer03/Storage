import {connection} from "./script/connection/connection.js";

const con = new connection();
let scriptLoaded = "";

async function renderPage(name) {
    const response = await con.loadPages();
    const json = await response.json();
    for (const element of json) {
        if(element.name === name)
        {
            document.title = element.name
            const content = await fileContent(element.url);
            document.getElementById('content').innerHTML = content;
        }
    }
}

async function fileContent(url) {
    return (await fetch(url)).text();
}

document.addEventListener('DOMContentLoaded', async () => {
    await renderPage("index");
});