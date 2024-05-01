import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl: string = 'localhost:3001/api'
    private headers: HttpHeaders;
    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders();
    }

    public set bearerToken(bearerToken: string) {
        this.headers?.set('Authorization', `Bearer ${bearerToken}`);
    }
    
    async get(url: string): Promise<any> {
        return await firstValueFrom(this.httpClient.get(`${this.baseUrl}${url}`, { headers: this.headers }));
    }
    
    async post(url: string, data: any): Promise<any> {
        return await firstValueFrom(this.httpClient.post(`${this.baseUrl}${url}`, data, { headers: this.headers }));
    }
    
    async patch(url: string, data: any): Promise<any> {
        return await firstValueFrom(this.httpClient.patch(`${this.baseUrl}${url}`, data, { headers: this.headers }));
    }
    
    async delete(url: string): Promise<any> {
        return await firstValueFrom(this.httpClient.delete(`${this.baseUrl}${url}`, { headers: this.headers }));
    }
}