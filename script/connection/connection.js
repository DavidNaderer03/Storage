export class connection {
    async fetchData(url) {
        const promise = await fetch(url);
        let statusCode = promise.status;
        if(promise.ok) {
            return promise;
        }
        throw new Error(`Response from url:${url} has the status code:${statusCode}`)
    }

    async loadDirectories() {
        return await this.fetchData("api/file.json");
    }

    async loadUser() {
        return await this.fetchData(`api/user.json`);
    }

    async loadSubjects() {
        return await this.fetchData("api/subjects.json");
    }

    async loadPages() {
        return await this.fetchData("api/pages.json");
    }

    async loadGrades() {
        return await this.fetchData('api/grade.json');
    }
}