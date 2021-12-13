export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _expirationDate: Date
    ) {}

    get token() {
        const currentDate = new Date();
        if (this._token && currentDate < this._expirationDate) {
            return this._token;
        }
        return null;
    }
}