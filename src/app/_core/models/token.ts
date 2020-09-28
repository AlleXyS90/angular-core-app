export class Token {
  token: string;
  expiration: Date;

  constructor(obj?: any) {
    this.token = obj && obj.token || null;
    this.expiration = obj && obj.expiration || null;
  }
}
