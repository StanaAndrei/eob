import { Injectable } from "@angular/core";
import { HttpService } from "../../services/http.service";
import { LocalStorageService } from "../../services/localstorage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private bearerToken: string | null;

    constructor(private httpService: HttpService, private localStorageService: LocalStorageService) {
        this.bearerToken = localStorageService.getData('authtok');
    }

    login(email: string, password: string) {
        const res = this.httpService.post('/auth', {
            email, password
        });
        console.log(res);
        
    }

    get isLoggedIn(): boolean {
        return this.bearerToken !== '';
    }

    logout(): void {
        this.bearerToken = '';
    }
}