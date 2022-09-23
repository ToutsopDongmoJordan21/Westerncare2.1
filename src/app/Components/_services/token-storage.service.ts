import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_IMAGE = 'user-image';
const USER_KEY = 'auth-user';
const CLIENT_KEY = 'auth-client';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUserImage(url: string) {
    window.sessionStorage.removeItem(USER_IMAGE);
    window.sessionStorage.setItem(USER_IMAGE, url);
  }

  public getUserImage(): string {
    return sessionStorage.getItem(USER_IMAGE)!;
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveClient(client: any) {
    window.sessionStorage.removeItem(CLIENT_KEY);
    window.sessionStorage.setItem(CLIENT_KEY, JSON.stringify(client));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }

  public getClient() {
    return JSON.parse(sessionStorage.getItem(CLIENT_KEY)!);
  }
}
