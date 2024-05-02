import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable } from "rxjs";
type HttpResAny = HttpResponse<any>;

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl: string = 'http://localhost:3001/api'
    private headers: HttpHeaders;
    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders();
    }

    public set bearerToken(bearerToken: string) {
        this.headers?.set('Authorization', `Bearer ${bearerToken}`);
    }
    

    async get(url: string): Promise<any> {
        const ans$: Observable<any> = this.httpClient.get<HttpResAny>(`${this.baseUrl}${url}`, { 
            headers: this.headers, 
            observe: 'response' 
        });
        try {
            return await lastValueFrom(ans$);
        } catch(err) {
            return new Error(String(err));
        }
    }
    
    async post(url: string, data: any): Promise<any> {
        const ans$: Observable<any> = this.httpClient.post<HttpResAny>(`${this.baseUrl}${url}`, data, { 
            headers: this.headers,
            observe: 'response' 
        });
        try {
            return await lastValueFrom(ans$);
        } catch(err) {
            return new Error(String(err));
        }
    }
    
    async patch(url: string, data: any): Promise<any> {
        const ans$: Observable<any> = this.httpClient.patch<HttpResAny>(`${this.baseUrl}${url}`, data, { 
            headers: this.headers,
            observe: 'response' 
        });
        try {
            return await lastValueFrom(ans$);
        } catch(err) {
            return new Error('SERVER_DOWN');
        }
    }
    
    async delete(url: string): Promise<any> {
        const ans$: Observable<any> = this.httpClient.delete<HttpResAny>(`${this.baseUrl}${url}`, { 
            headers: this.headers,
            observe: 'response' 
        });
        try {
            return await lastValueFrom(ans$);
        } catch(err) {
            return new Error('SERVER_DOWN');
        }
    }
}