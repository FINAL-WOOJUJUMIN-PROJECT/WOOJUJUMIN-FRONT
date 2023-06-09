import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MsgModal from "../modals/MsgModal";
import { Button } from "react-bootstrap";

import crown from "../image/crown.png";

import "../modals/MsgModal.css";

function PartyRoom() {
  let history = useNavigate();

  const [id, setId] = useState("");
  const [targetId, setTargetId] = useState("");

  const [memberlist, setMemberlist] = useState([]); // 게시판은 배열로 넘어오니까

  const [msgModal, setMsgModal] = useState(false); // 기본적으로 모달창이 꺼져있어서 false
  let params = useParams();

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
  // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때
      setId(login.id);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);
  const getMemberlist = async (seq) => {
    //alert(seq);
    axios
      .get("http://118.67.132.98:3000/memberlist", { params: { applyMem: id, partySeq: seq } })
      .then(function(resp) {
        setMemberlist(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  };

  useEffect(
    function() {
      if (id) {
        getMemberlist(); // 실행할 내용 => 컴포넌트가 처음으로 마운트되었을때 실행. 이경우에만 실행되고 다른 경우는 실행 안되므로 초기에 한번만 실행시
      }
      getMemberlist(params.seq);
    },
    [id],
    [params.seq]
  ); // 한번만 호출


  return (
    <>
      <MsgModal sendId={id} targetId={targetId} show={msgModal} onHide={() => setMsgModal(false)} />

    

      <div className="gamssagi3">
        <h3>내파티 정보</h3>

        <br></br>
        <table border="1" style={{ margin: "0 auto" }} className='ttable'>
          <colgroup>
            <col width="200" />
            <col width="200" />
            <col width="200" />
          </colgroup>
          <thead>
            <tr>
              <th>아이디</th>
              <th>닉네임</th>
              <th>메시지</th>
            </tr>
          </thead>

          <tbody>
            {memberlist &&
              memberlist.map(function(mem, i) {
                return (
                  <tr key={i}>
                    <td align="center"> 
                    {mem.id === mem.masterId &&
                    
                    <img src={crown} alt="" style={{ width: "40px" }} />
                     }

                    {mem.id} </td>
                   
                  <td align="center">{mem.nickname}</td>

                    <td align="center">
                      {mem.id !== id && (
                        <Button
                          className="msgButton"
                          variant="primary"
                          type="button"
                          onClick={() => {
                            setMsgModal(true);
                            setTargetId(mem.id);
                          }}
                        >
                          보내기{" "}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <br></br>

        <br></br>
      </div>
    </>
  );
}

export default PartyRoom;
