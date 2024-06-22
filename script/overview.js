import { connection} from "./connection/connection.js";

const con = new connection();

let contentList;
async function initPage(){
    contentList = document.getElementById('content-list');
    await init();
}

async function init() {
    let text = '';
    const response = await con.loadDirectories();
    const json = await response.json();
    json.Directory.forEach(element => {
        text += `<li><a href="${element.url}">${element.name}</a></li>`
    });
    contentList.innerHTML = text;
}