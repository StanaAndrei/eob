import { Injectable } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { LocalStorageService } from "../../services/localstorage.service";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private bearerToken: string | null;

    constructor(private httpService: HttpService, private localStorageService: LocalStorageService) {
        this.bearerToken = localStorageService.getData('authtok');
    }

    async login(email: string, password: string) {
        const res = await this.httpService.post('/auth', {
            email, password
        });
        if (res.status !== HttpStatusCode.Ok) {
            return null;
        }
        return res.body;     
    }

    get isLoggedIn(): boolean {
        return this.bearerToken !== '';
    }

    logout(): void {
        this.bearerToken = '';
    }
}