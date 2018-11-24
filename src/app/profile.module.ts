
/* 로직이 아니라, 데이터만 담을 단순 클래스 
앵귤러의 모듈은 클래스앞에 export 라는 키워드 붙임
*/
export class Profile{
    constructor(
        public profile_id:number,
        public name:string,
        public age:number,
        public job:string
    ){
    }    
}