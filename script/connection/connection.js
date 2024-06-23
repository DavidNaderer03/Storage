export class connection {
    #baseUrl = "http://us2.waifly.com:1561/"
    #localUrl = ""
    async fetchData(url) {
        const promise = await fetch(this.#baseUrl + url);
        let statusCode = promise.status;
        if(promise.ok) {
            return promise;
        }
        throw new Error(`Response from url:${url} has the status code:${statusCode}`)
    }

    async loadUser() {
        return await this.fetchData(`student/user?username=2&password=2`);
    }

    async loadSubjects() {
        return await this.fetchData("student/subjects?username=2&password=2");
    }

    async loadPages() {
        return await this.fetchData("student/pages?username=2&password=2");
    }

    async loadGrades() {
        return await this.fetchData('student/grade?username=2&password=2');
    }
}