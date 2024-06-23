import { connection } from "./connection/connection.js";
import { list } from "./render/list.js";

const con = new connection();
const lists = []
let headerElement;
document.addEventListener('render', async (e) => {
    headerElement = document.getElementById('load-table-header');
    await initHeader();
    const entities = await addEntities();
    const studentList = new list(entities, undefined, initHeader, await getHeader(), 'load-table-header', 'table-body', 'searchField');
    studentList.render();
});

async function initHeader() {
    let text = '<th>Name</th>';
    const header = await con.loadSubjects();
    const json = await header.json();
    json.forEach(element => {
        text += `<th>${element}</th>`;
    });
    document.getElementById('load-table-header').innerHTML = text;
}

async function addEntities() {
    const getLine = async (element) => {
        const response = await con.loadGrades();
        const json = await response.json();
        const entity = json.find(x => x.id === element.id);
        const { english, programming, german, accounting, company_management, history, sport, math, networking, software_knowledge, computer_architecture } = entity.subjects;
        return {
            name: element.name,
            english: english,
            programming: programming,
            german: german,
            accounting: accounting,
            company_management: company_management,
            history: history,
            sport: sport,
            math: math,
            networking: networking,
            software_knowledge: software_knowledge,
            computer_architecture: computer_architecture
        };
    };
    const entities = [];
    const response = await con.loadUser();
    const json = await response.json();
    for (const element of json.Users) {
        const entity = await getLine(element);
        entities.push(entity);
    }
    return entities;
}

async function getHeader() {
    const header = await con.loadSubjects();
    const json = await header.json();
    json.push("name");
    return json;
}