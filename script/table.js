import { connection } from "./connection/connection.js";
import { list } from "./render/list.js";

const con = new connection();
const lists = []
let headerElement;
document.addEventListener('render', async (e) => {
    headerElement = document.getElementById('load-table-header');
    await initHeader();
    const entities = await addEntities();
    await setMiddleValues(entities);
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
    text += '<th>Arithmetic middle</th>'
    document.getElementById('load-table-header').innerHTML = text;
}

async function addEntities() {
    const getLine = async (element) => {
        const response = await con.loadGrades();
        const json = await response.json();
        const entity = json.find(x => x.id === element.id);
        let count = 0;
        let sum = 0;
        for(const key in entity.subjects) {
            sum += entity.subjects[key];
            count++;
        }
        const { english, programming, german, accounting, company_management, history, sport, math, networking, software_knowledge, computer_architecture, wmc } = entity.subjects;
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
            computer_architecture: computer_architecture,
            wmc: wmc,
            middle: sum / count
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
    json.push("middle");
    return json;
}

function setId(id, value) {
    document.getElementById(id).innerHTML = value;
}

function calculateArithmeticMiddle(entities, key) {
    let sum = 0;
    entities.forEach(element => {
        sum += element[key];
    });
    return sum / entities.length;
}

async function setMiddleValues(entities) {
    let text = ''
    const subjects = await con.loadSubjects();
    const json = await subjects.json();
    const middleValues = []
    const contextValues = [];
    json.forEach((element, i) => {
        let sum = 0;
        const key = element.replace(' ', '_');
        entities.forEach(e => {
            sum += parseInt(e[key]);
        });
        text += `<span>${element}: ${(sum / entities.length).toFixed(2)}</span>`;
    });
    document.getElementById('arithmetic-middle').innerHTML = text;
}