
class Cookie {
    // cookies: any;
    // constructor(document) {
    //     this.cookies = document.cookie;
    // 

    parse(cookies) {
        // const content = this.cookies.push()
        // const cookies = this.cookies.split('=').join('}').split('}').join('{').split('{');
        // let parsedCookies = [];
        // for (let i = 0; i < cookies.length; i++) {
        //     if(i%2 === 0) {
        //         const cookie = 
        //         Object.assign(parsedCookies, cookies[i])
        //         Object.assign(parsedCookies, {cookies[i]: JSON.parse(cookies[i+1])} );
        //     }
        // };
        const parsedCookies = cookies;
        return parsedCookies;
    }

    exists(name: string) {

    }

    get(name: string) {

    }
}

export default new Cookie();