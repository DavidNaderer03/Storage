import { connection } from "./connection/connection.js";

const con = new connection();
let headerElement;
document.addEventListener('DOMContentLoaded', async () => {
    headerElement = document.getElementById('load-table-header');
    await initHeader();
});

async function initHeader() {
    let text = "<th>Name</th>";
    const header = await con.loadSubjects();
    header.forEach(element => {
        text += `<th>${element}</th>`;
    });
    headerElement.innerHTML = text;
}