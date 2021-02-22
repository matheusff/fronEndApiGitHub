import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class GenericService {
    
    private headers: HttpHeaders;

    constructor(protected http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    obter<T>(url: string) {
        return this.http.get<T[]>(url);
    }

    postView<T>(obj: T, url:string) {
        return this.http.post(url, obj);//, { headers: this.headers });
    }

    delete<T>(url:string) {
        return this.http.delete(url);
    }

}
