import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http=inject(HttpClient)

  public async getGithubProfileData(){
    let json=await firstValueFrom(this.http.get('https://api.github.com/users/marcoriv456')) as any
    return {img:json["avatar_url"],name:json["name"],username:json["login"]}
  }
}
