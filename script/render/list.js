
class icon {
    constructor(id) {
        this.id = id;
    }

    search = "bi-search"

    getSearchField() {
        return `<div class="input-group w-25 ml--3"><div class="input-group-prepend"><span class="input-group-text"><i class="bi ${this.search}"></i></span></div><input type="text" id="${this.id + '-field'}" class="form-control"></div>`;
    }

    getOptions(headers) {
        let text = `<div class="input-group w-25 ml--3"><div class="input-group-prepend"><span class="input-group-text">Options</span></div><select class="form-select" id="${this.id + '-select'}">`
        for(const single of headers) {
            text += `<option>${single}</option>`
        }
        return text + "</select></div>";
    }
}

export class list extends icon {
    constructor(elements, parseElements, parseHeader, header, headerId, elementId, searchId) {
        super(searchId);
        this.header = header;
        this.elements = elements;
        this.actual = elements;
        this.parseElements = parseElements;
        this.parseHeader = parseHeader;
        this.headerId = headerId;
        this.elementId = elementId;
        this.searchId = searchId;
    }

    render() {
        this.#renderHeader();
        this.#renderElements();
        this.#renderSearchField();
        this.#setEventListener();
    }

    #renderElements() {
        let text = '';
        this.actual.forEach(element => {
            if(typeof this.parseElements === "function") {
                text += this.parseElements(element);
            } else {
                text += this.#defaultElement(element);
            }
        });
        document.getElementById(this.elementId).innerHTML = text;
    }

    #renderHeader() {
        if(typeof this.parseHeader === "function") {
            this.parseHeader();
        } else {
            this.#defaultHeader();
        }
    }

    #setEventListener() {
        const select = document.getElementById(this.searchId + "-select");
        const input = document.getElementById(this.searchId + "-field");
        input.addEventListener('input', e => {
            if(this.actual.length === 0) {
                this.actual = this.elements;
            } else {
                this.#findByKey(input.value, select.value);
            }
            this.#renderElements();
        });
    }

    #defaultElement(element) {
        let text = '';
        for(const key in element) {
            text += `<td class="text-center">${element[key]}</td>`;
        }
        return text;
    }

    #defaultHeader() {
        let text = '';
        for(const key of this.header) {
            text += `<th>${key}</th>`;
        }
        document.getElementById(this.headerId).innerHTML = text;
    }

    #renderSearchField() {
        document.getElementById(this.searchId).innerHTML =
            super.getSearchField(this.searchId + "-field") + super.getOptions(this.header);
    }

    #findByKey(value, index) {
        this.actual = this.elements.filter(x => {
            const element = this.#getElementAtIndex(x, index);
            return element.toString().includes(value);
        });
    }

    #getElementAtIndex(element, index) {
        index = index.replace(' ', '_');
        for(const e in element) {
            if(e === index) {
                return element[e];
            }
        }
        throw Error("Cannot find property");
    }
}