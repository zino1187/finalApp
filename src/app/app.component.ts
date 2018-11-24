import { Component } from '@angular/core';

//사용하고자 하는 클래스 가져오기
import { HttpClient } from '@angular/common/http';

//확장자 .ts 는 명시하지 않는다
import { Profile } from './profile.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  profiles:Profile[]=new Array(); //여러건을 받을 변수
  profile:Profile;//한건을 보관할 변수
  p:number;
  n:string;
  a:number;
  j:string;

  //생성자에서 사용하고자 하는 모듈을 인수로 받는다
  constructor(private http:HttpClient){
  }

  ngOnInit(){
    this.getList();
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
      if(obj.result==1){
        this.getList();
      }

    });
  }

  /* 목록 요청  */
  getList():void{
    this.http.get("/profile/list").subscribe(data=>{
      var str=JSON.stringify(data); //object --> string
      var obj=JSON.parse(str);//string --> json 객체
      console.log("길이는 ",obj.rows.length);
      console.log("받은 데이터는 ",obj.rows);

      var len=obj.rows.length;
      for(var i=0; i<len;i++){
        this.profiles[i]=new Profile(
            obj.rows[i][0],
            obj.rows[i][1],
            obj.rows[i][2],
            obj.rows[i][3]);
      }
      console.log(this.profiles);
    });

  }

  //상세보기 요청
  getDetail(pid):void{
    this.http.get("/profile/detail?profile_id="+pid).subscribe(data=>{
      var str=JSON.stringify(data);
      var obj=JSON.parse(str);
      console.log(obj);
      this.p=obj.row[0];
      this.n=obj.row[1];
      this.a=obj.row[2];
      this.j=obj.row[3];

    /* 
      this.profile = new Profile(
        obj.row[0],
        obj.row[1],
        obj.row[2],
        obj.row[3]
      );
    */      
    });
  console.log("profile은 ",this.profile);
  }

  del(pid):void{
    this.http.get("/profile/del?profile_id="+pid).subscribe(data=>{
      var str=JSON.stringify(data);
      var obj=JSON.parse(str);

      if(obj.result==0){
        alert("삭제실패");
      }else{
        alert("삭제성공");
        this.getList();
      }
    });
  }

  edit(_p, _n, _a, _j):void{
    if(!confirm("삭제하시겠습니까?")){
      return;
    }
    alert("수정할께요");
    this.http.post("/profile/edit",{
      profile_id:_p,
      name:_n,
      age:_a,
      job:_j
    }).subscribe(data=>{
      var str=JSON.stringify(data);
      var obj=JSON.parse(str);
      if(obj.result==0){
        alert("수정실패");
      }else{
        this.getList();
      }
    });
  }
}
