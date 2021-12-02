/**
 * 시스템 컴파일러
 */
const config = {
    version : "0.0.1",
}

/**
 * 명령 구문분석
 * @param {*} line 
 */
function getCommand(line, callback){
    line = line.trim().split("."); 
    let param = line.pop();
    if(param[0] != "(" || param[param.length -1] != ")"){ // 파라메타 인지 확인
        param = param.slice(1,-1).split(",");
    }
}

function error(msg, code, state = -1){
    return {
        error : msg,
        code : code,
        state : state,
    }
}
/**
 * 명령 캐스팅
 */
const commands = {
    // 임배드{제목 : "", 설명 :"", 링크 : "", };
    "임베드" : function(){ },
    "버튼" : {// 큰 클래스

        "수정" : {

        },
        "제작" : {// 버튼.제작("내용","아이디","이모티콘")
            exec(code){
            }
        },
        "링크" : {// 버튼.링크("","","")
            exec(...args){
                
            }
        },

    },
    "매뉴" : {
        
    },
    "메세지" : {
        "답장" : {
            "수정": {

            },
            "삭제" : {

            },
            exec(){

            }
        }
    }
}

module.exports = function compile(script){


    return;
}