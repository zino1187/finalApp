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
      //typescript 는 자료형이 존재한다..따라서 data의 자료형을 
      //알아야 함...Object 형임..
      console.log(data);
      //pase의 대상이 되려면 string 이어야 하는데 data는 오브젝트형
      //이므로 string으로 변환을 먼저 해준후에 parse 시키자!!
      var str=JSON.stringify(data);
      var obj=JSON.parse(str);//객체기 때문에 이 시점부터는 요소들
      //.쩜찍고 접근이 가능하다...
      alert(obj.msg);

    });
  }
}
