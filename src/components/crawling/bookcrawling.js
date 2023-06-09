import { useEffect, useState } from "react";
import axios from "axios";
import defaultimg from "../image/defaultnuill.png";
import { useNavigate } from "react-router-dom";
import story from "./story.jpg";
import bookpage from "./bookpage.png";
import loadingimg from "../mypage/loading.gif"

function BookCrawling() {
  let navigate = useNavigate();

  const [booktitles, setBooktitle] = useState([]);
  const [bookdatas, setBookdatas] = useState([]);
  const [bookimages, setBookimages] = useState([]);
  const [talks, setTalks] = useState([]);
  const [comment, setComment] = useState([]);

    const [alltalk, setAlltalk] = useState([]);
    const [indexCom, setIndexCom] = useState(1);

    const [firsrDel, setFirstDel] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const path = "/finalProject/WOOJUJUMIN-FRONT/src/components/crawlingimages";
      await axios
        .get("http://118.67.132.98:3000/bookchart", { params: {path:path} })
        .then(function(res) {
          console.log(res.data);
          setBooktitle(res.data.sendtitles);
          setBookdatas(res.data.senddatas);
          setBookimages(res.data.images);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    const talkData = async () => {
      await axios
        .get("http://118.67.132.98:3000/alltalkcomment", { params: { category: 2 } })
        .then(function(res) {
          console.log(res.data);
          console.log(res.data.slice(0, 10));
          setAlltalk(res.data);
          // setTalks(res.data.slice(0, 10));
          // setTalks(res.data.slice(indexCom, indexCom + 10));
          setTalks(res.data.slice(0, 10));
          // setIndexCom(indexCom + 1);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    fetchData();
    talkData();
  }, []);

  // let importimg = [];

  function Booklist(props) {
    const { titles, datas, images } = props;
  //   let imagePath = [];

    if (images.length === 0) {
      return (
        <div>
          <p>이미지를 불러오고 있습니다...</p>
          <img src={loadingimg} alt ="로딩중"/>
        </div>
      );
    }

  //   bookimages.map((img, index) => {
  //     let imageload = "";
  //     imageload = bookimages[index].split("\\");
  //     importimg.push(imageload[imageload.length - 1]);
  //   });

    // importimg.map((img, index) => {
    //     imagePath.push(require('../crawlingimages/' + importimg[index]));

    // })

    // importimg.map((img, index) => {
    //   try {
    //     imagePath.push(require("../crawlingimages/" + importimg[index]));
    //   } catch (error) {
    //     imagePath.push(defaultimg); // 이미지 대신 null 값을 추가합니다.
    //   }
    // });

    // console.log("확인용" + titles);
    // console.log("확인용" + datas);
    // console.log("확인용" + imagePath);
    return (
      <div className="bookcontent">
        {titles.map((title, index) => (
          <div key={index} className="bookOne">
            <p style={{ float: "left" }}>
              <i>{index + 1}</i>
            </p>
            <img src={bookimages[index]} alt={title} className="bookimg" />
            <div className="bookinform">
              {/* <p><i>{index + 1}</i></p> */}
              <h2>{title}</h2>
              <h3 className="booktitle">{datas[index].split("|")[0]}</h3>
              <h3>{datas[index].split("|")[1] + " " + datas[index].split("|")[2]}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function loginfnc() {
    // alert("확인용");
    if (localStorage.getItem("login") === null) {
      alert("로그인 후 작성해주세요!");
      navigate("/login");
    }
  }

  function commentSubmit(e) {
    // alert("확인용");

    // console.log(localStorage.getItem("login"));

        e.preventDefault();
        setFirstDel(true);

        if (typeof comment === "string" && comment.trim().length < 3) {
            alert("두 글자 이상으로 작성해주세요");
            return;
        }

    const loginData = JSON.parse(localStorage.getItem("login"));
    const id = loginData.id;

    // alert(id);

        axios.post("http://118.67.132.98:3000/talkcomment", null, { params: { "talkid": id, "talkcomment": comment, "category": 2 } })
            .then(function (res) {
                // alert(res.data);
                if (res.data === "YES") {
                    const fetchTalkData = async () => {
                        try {
                            const res = await axios.get("http://118.67.132.98:3000/alltalkcomment", { params: { "category": 2 } });
                            setTalks(res.data.slice(0, 10));
                            setComment("");
                            setIndexCom(1);
                            // console.log( "다시 수정"+indexCom);
                            if (indexCom > 1) {
                                // alert("확인");
                                // setIndexCom(1);
                                // document.getElementById("more-btn").style.display = "block";
                                document.getElementById("more-btn").disabled = false;
                            }
                            console.log(indexCom + "fd");
                        } catch (err) {
                            alert(err);
                        }
                    };

          fetchTalkData();
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  // enter 누르면 입력되게 되는 함수
  const activeEnter = (e) => {
    if (e.key === "Enter") {
      commentSubmit(e);
    }
  };

  const loadMoreTalks = async () => {
    // const totalPage = Math.floor(alltalk.length / 10) + (alltalk.length % 10 > 0 ? 1 : 0);
    // console.log("길이확인" + totalPage);

    const numLoadedComments = document.querySelectorAll(".comment-box").length;
    console.log(numLoadedComments);

    await axios
      .get("http://118.67.132.98:3000/alltalkcomment", { params: { category: 2 } })
      .then((res) => {
        // const newTalks = res.data.slice((indexCom*10)+1, (indexCom)*20);
        // setTalks([...talks.slice(0, 10), ...newTalks]);
        let startIndex = indexCom * 10;
        let endIndex = alltalk.length - talks.length >= 10 ? (indexCom + 1) * 10 : alltalk.length;
        console.log(indexCom + "indexCom");
        console.log(startIndex + "startindex");
        console.log(endIndex + "endIndex");
        console.log(alltalk.length / 10);
        const newTalks = res.data.slice(startIndex, endIndex);

        if (endIndex >= alltalk.length) {
          setIndexCom(1);
          // setLoading(true);
          console.log("초기화 확인용" + indexCom);
          // endIndex가 배열의 인덱스 범위를 벗어난 경우 버튼을 숨김
          document.getElementById("more-btn").disabled = true;
          // document.getElementById("more-btn").style.display = "none";
        }

        setTalks([...talks, ...newTalks]);
        setIndexCom(indexCom + 1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="allcontent">
      <div>
        {/*    <img src={story} alt="mainimg" className="mainimg" /> */}
        <img src={bookpage} alt="mainimg" className="mainimg" />
      </div>
      <h2 className="page">알라딘 베스트</h2>
      <Booklist titles={booktitles} datas={bookdatas} images={bookimages} />
      {/* {booktitles[0]} */}

            <div className="talkList">
                <div className="talktitle">
                    <h3>책 한줄 톡!</h3>
                </div>
                <textarea onClick={loginfnc} value={comment} onChange={(e) => { setComment(e.target.value) }}
                    onKeyDown={activeEnter} className="talkinsert" placeholder="책에 대한 톡을 입력해주세요. &#13;&#10;무관한 내용은 삭제 될 수 있습니다."></textarea>
                <div className="subinform">
                    <button type="submit" onClick={commentSubmit} className="btnsub">등록</button>
                    <p className="count">{comment.length}/300</p>
                </div>
                <div className="allcomment">
                    {talks.map((talk, index) => (
                        <div className="comment-box" key={index + 1}>
                            <p>
                                {talk.talkid}
                            </p>
                            <p>
                                {talk.talkcomment}
                            </p>
                        </div>
                    ))}
                    {alltalk.length === 0 && !firsrDel && <p>첫 코멘트를 달아주세요!</p>}
                </div>
            </div>
            <div className="morebtnAll">
                {alltalk.length === 0 && <button id="more-btn" disabled>더보기 ∨</button>}
                {alltalk.length > 0 && <button onClick={loadMoreTalks} id="more-btn">더보기 ∨</button>}
            </div>
        </div>

    )
}
export default BookCrawling;
