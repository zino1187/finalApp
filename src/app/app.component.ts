import { Component } from '@angular/core';

//사용하고자 하는 클래스 가져오기
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  //생성자에서 사용하고자 하는 모듈을 인수로 받는다
  constructor(private http:HttpClient){
  }
  
  //등록요청 
  regist(_name, _age,_job):void{
    console.log(_name, _age, _job);
    //서버에 post 요청하기!!!!
    this.http.post("/profile/regist",{
      name:_name,
      age:_age,
      job:_job
    }).subscribe(data =>{
      //이따가 서버에서 전송된 결과를 처리...
    });
  }
}
