import React, {useState} from "react";
import axios from "axios";
import { Container, Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";

function PwdSearch() {
    const [id, setId] = useState('');

    const pwdInfo = async() => {
        await axios
            .post("http://118.67.132.98:3000/idcheck", null, { params: { id: id } })
            .then(function(res) {
                //console.log(res);
                if (res.data === "YES") {
                    alert("입력하신 아이디와 일치하는 계정이 없습니다.");
                    setId("");
                } else {
                    // 임의 비밀번호
                    const randomString = Math.random().toString(36).slice(2);

                    axios.post("http://118.67.132.98:3000/pwdsearch", null, { params: { id: id, password: randomString } })
                        .then(function(res) {
                            //console.log(res);
                            if(res.data === "YES") {
                                alert('임시로 설정한 비밀번호는 ' + randomString + '입니다.');
                                document.location.href = '/login';
                            }else {
                                alert('임시 비밀번호 발급에 실패했습니다.');
                            }
                        })
                        .catch(function(err) {
                            alert(err);
                            alert("임시 비밀번호 변경 실패!");
                        });
                }
            })
            .catch(function(err) {
            alert(err);
            alert("아이디 찾기");
            });
    }

    return(
        <Container fluid>
            <Form>
            <h1>비밀번호 찾기</h1>
            <Row className="justify-content-md-center">
                <Col md={3}>
            <FloatingLabel
                controlId="floatingInput"
                label="아이디"
            >
                <Form.Control type="id" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
            </FloatingLabel>
            </Col>
            </Row><br/>
            <Button variant="primary" onClick={() => pwdInfo()}>비밀번호 찾기</Button>
            {/* <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디 입력"
            />
            <br/><br/> */}
            {/* <button onClick={() => pwdInfo()}>비밀번호 찾기</button> */}
            </Form>
        </Container>
    );
}

export default PwdSearch;