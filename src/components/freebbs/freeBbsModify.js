import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";

import { auth, db, firebasePhotoApp, storage } from "../firebasePhoto";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function FreeBbsModify() {
  ////////
  const [imageUpload, setImageUpload] = useState(null);
  //const [image, setImage] = useState("");
  const [imageurl, setImageurl] = useState(null);

  const storage = getStorage(firebasePhotoApp);
  //const imageListRef = ref(storage, "images/");

  let history = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [freebbs, setFreeBbs] = useState({});

  const imgRef = useRef();

  let params = useParams();

  let bbsSeq = params.bbsSeq;

  const [id, setId] = useState("");
  useEffect(function() {
    let login = JSON.parse(localStorage.getItem("login"));
    setId(login.id);
  }, []);

  function imageLoad() {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    //console.log(image);
  }
  function getbbsData() {
    axios
      .get("http://118.67.132.98:3000/getfreeBbs", {
        params: { bbsSeq: bbsSeq },
      })
      .then(function(resp) {
        setFreeBbs(resp.data);
        setTitle(resp.data.title);
        setContent(resp.data.content);
        setTag(resp.data.tag);
        if (resp.data.image !== null) {
          setImage(resp.data.image);
        }
        if (resp.data.imageurl !== null) {
          setImageurl(resp.data.image);
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  useEffect(() => {
    getbbsData(bbsSeq);
  }, []);

  async function modifyFreeBbs(e) {
    e.preventDefault();
    let formData = new FormData();
    if (title === "") {
      alert("글의 제목을 입력하세요");
      return;
    } else if (tag === "") {
      alert("관련카테고리를 선택하세요");
      return;
    } else if (content === "") {
      alert("내용을 입력하세요");
      return;
    } else {
      if (imageUpload === null) {
        formData.append("bbsSeq", bbsSeq);
        formData.append("title", title);
        formData.append("content", content);

        formData.append("image", image);

        formData.append("tag", tag);

        if (document.frm.uploadFile.files[0] == null || document.frm.uploadFile.files[0] == "") {
          formData.append("uploadFile", "basic");
        } else {
          console.log(document.frm.uploadFile.files[0].name);
          formData.append("uploadFile", document.frm.uploadFile.files[0]);
        }

        axios
          .post("http://118.67.132.98:3000/modifyFreebbs", formData)
          .then(function(resp) {
            if (resp.data === "YES") {
              alert("글이 수정되었습니다.");
              history(`/freeBbsDetail/${bbsSeq}`); // 이동(link)
            } else {
              alert("게시글 수정에 실패했습니다");
            }
          })
          .catch(function(err) {
            alert(err);
            alert("에러");
          });
      } else {
        const imageRef = ref(storage, `images/${imageUpload.name}`);
        const snapshot = await uploadBytes(imageRef, imageUpload);
        await getDownloadURL(snapshot.ref).then((url) => {
          formData.append("imageurl", url);
          console.log("imgurl : " + url);
        });

        formData.append("bbsSeq", bbsSeq);
        formData.append("title", title);
        formData.append("content", content);

        formData.append("image", image);

        formData.append("tag", tag);

        if (document.frm.uploadFile.files[0] == null || document.frm.uploadFile.files[0] == "") {
          formData.append("uploadFile", "basic");
        } else {
          console.log(document.frm.uploadFile.files[0].name);
          formData.append("uploadFile", document.frm.uploadFile.files[0]);
        }

        axios
          .post("http://118.67.132.98:3000/modifyFreebbs", formData)
          .then(function(resp) {
            if (resp.data === "YES") {
              alert("글이 수정되었습니다.");
              history(`/freeBbsDetail/${bbsSeq}`); // 이동(link)
            } else {
              alert("게시글 수정에 실패했습니다");
            }
          })
          .catch(function(err) {
            alert(err);
            alert("에러");
          });
      }
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (event) => {
    setImageUpload(event.target.files[0]);
    imageLoad();
  };

  const imageUrl = image == freebbs.image ? freebbs.imageurl : image;

  return (
    <div>
      <br />
      <h3>글 수정하기</h3>
      <br />
      <table border="1" align="center" className="ttable">
        <colgroup>
          <col width={"80px"} />
          <col width={"500px"} />
          <col width={"150px"} />
          <col width={"150px"} />
        </colgroup>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <textarea
                rows={1}
                style={{ border: "none", width: "100%", resize: "none" }}
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={/* handleTitleChange */ (e) => setTitle(e.target.value)}
              />
            </td>
            <th>주제 선택</th>
            <td>
              <select value={tag} onChange={(e) => setTag(e.target.value)}>
                <option value="" disabled>
                  카테고리
                </option>
                <option value={1}>농구</option>
                <option value={2}>축구</option>
                <option value={3}>야구</option>
                <option value={4}>예능</option>
                <option value={5}>드라마/영화</option>
                <option value={6}>게임</option>
                <option value={7}>음식</option>

                <option value={10}>잡담</option>
              </select>
            </td>
          </tr>
          <tr align="left">
            <td colSpan={4}>
              <form name="frm" onSubmit={modifyFreeBbs} encType="multipart/form-data">
                <input type="file" onChange={handleImageUpload} ref={imgRef} name="uploadFile" />
              </form>
            </td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan={4}>
              {imageUrl !== "" && imageUrl !== "" ? (
                <div>
                  <div>
                    <img
                      src={imageUrl}
                      alt="no image"
                      style={{
                        width: 500,
                        height: "auto",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <CloseButton onClick={() => setImage("")} />
                </div>
              ) : null}
            </td>
          </tr>
          <tr style={{ border: "none" }}>
            <td style={{ border: "none" }} colSpan={4}>
              <textarea rows={10} style={{ border: "none", width: "90%", resize: "none" }} placeholder="내용을 입력해주세요" value={content} onChange={handleContentChange} />
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <Button variant="success" size="sm" type="submit" onClick={modifyFreeBbs}>
                작성하기
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />
    </div>
  );
}

export default FreeBbsModify;
