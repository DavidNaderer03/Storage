export class connection {
    #baseUrl = "https://davidnaderer03.github.io/Storage/"
    #localUrl = ""
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
}