import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "react-js-pagination";


function PartyAccept(){
    let history = useNavigate();
    const [id, setId] = useState('');
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const [partyList, setPartyList] = useState([]); 
          // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if(login !== undefined){ // 빈칸이 아닐때
        
        setId(login.id);
        
        
      
    }else{
       // alert('로그인해 주십시오');
       history('/login');
    }
    

       
}, [history]);

function myPartyList(page){    
    axios.get("http://localhost:3000/myPartyList", { params:{ "pageNumber":page, "id":id } })
    .then(function(resp){
        //console.log(resp.data);
        setPartyList(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);
       
         //console.log(requestlist);
    })
    .catch(function(err){
        alert(err);
    })
    
}
const check = (partySeq, applyMem) =>{    
    axios.get("http://localhost:3000/updateCheck", { params:{ "partySeq":partySeq, "applyMem":applyMem } })
    .then(function(resp){
        document.location.href='/partyAccept';
    })
    .catch(function(err){
        alert(err);
    })
    
}

useEffect(function(){
    if(id){

        myPartyList(0);
    
    }
                   
}, [id]);

function pageChange(page){
    setPage(page);
   

    myPartyList(page-1);

   
    
}

if(partyList.length > 0){
    return(

        
        <>
        <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyList">내파티 보기</Link>
          <br></br>
          <br></br>
        
          <Link to="/partyAccept">파티 수락</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRequest">파티 요청</Link>&nbsp;&nbsp;&nbsp;
          <br></br>
          <br></br>

          <table border="1" style={{ margin:'0 auto'}}>
        <colgroup>
            <col width='70'/><col width='600'/><col width='200'/><col width='100'/><col width='100'/>
        </colgroup>
        <thead>
            <tr>
              <th>아이디</th><th>파티제목</th><th>날짜</th><th>인원수</th><th>수락여부</th>
            </tr>
        </thead>

        <tbody>
            {
                partyList.map(function(bbs, i){
                    return(
                        <tr key={i}>
                            <td align="center">{bbs.applyMem}</td>
                            <td align="center">{bbs.title}</td>
                            <td align="center">{bbs.wdate}</td>
                             <td align="center">{bbs.countMem}/{bbs.totalMem}</td> 

                             {
                                bbs.countMem === bbs.totalMem ?
                                <td align="center">파티완료</td> 
                                :(bbs.check === 1 ?
                                <td align="center">수락됨</td> :
                                <td align="center"><button onClick={()=>{check(bbs.partySeq, bbs.applyMem)}}>수락하기</button></td>)
                             }
                           
                            
                           
                           
                        </tr>
                    )
                })
            }

        </tbody>

    </table>


    <br></br>
    <Pagination activePage={page}
       itemsCountPerPage={10}
       totalItemsCount={totalCnt}
       pageRangeDisplayed={5}
       prevPageText={"이전"}
       nextPageText={"다음"}
       onChange={pageChange}/> 
 </>

   
    )
}else{


    return(

        
        <>
  <Link to="/accountInfo">회원정보 수정</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/mybbsList">내가 쓴 글</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyAccept">파티원 승인</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyList">내파티 보기</Link>
          <br></br>
          <br></br>
  
<Link to="/partyAccept">파티 수락</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partyRequest">파티 요청</Link>&nbsp;&nbsp;&nbsp;

  <br></br>
  <br></br>

        <h3>작성된 내용이 없습니다.</h3>
     
      
        <br>
</br>

<Pagination activePage={page}
itemsCountPerPage={10}
totalItemsCount={totalCnt}
pageRangeDisplayed={5}
prevPageText={"이전"}
nextPageText={"다음"}
onChange={pageChange}/> 
   


<br>
</br>

  

  </>
    )
}
}

export default PartyAccept;