import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/PostDetail.module.css";

const PostDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const noticeId = searchParams.get("notice_id");
  const navigate = useNavigate();
  const [userNames, setUserNames] = useState({});
  const user_id = localStorage.getItem("user_id");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  // const [newReply, setNewReply] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
    const fetchData = async () => {
      try {
        let baseURL = "";
        if (process.env.NODE_ENV === "development") {
          baseURL = "http://121.139.20.242:5100";
        }
        const responsePost = await axios.get(`${baseURL}/api/notice_select`, {
          params: { notice_id: noticeId },
        });
        if (responsePost.data.valid) {
          if (responsePost.data.data[0].notice_auth === 1) {
            setPost(responsePost.data.data[0]);
          } else {
            setErrorMessage("커뮤니티 글이 아닙니다.");
          }
        } else {
          setErrorMessage("Invalid notice ID.");
        }
        
        const responseComments = await axios.get(`${baseURL}/api/comment_select`, {
          params: { notice_id: noticeId },
        });
        if (responseComments.data.valid) {
          const commentsData = responseComments.data.data || []; // If no comments, set to empty array
          setComments(commentsData);
          const userNames = {};
          const nameRequests = commentsData.map(async (comment) => {
            try {
              const nameResponse = await axios.post(`${baseURL}/api/select_name`, {
                user_name: comment.user_id,
              });
              userNames[comment.user_id] = nameResponse.data.data[0].user_id;
            } catch (error) {
              console.error('Failed to fetch user name:', error);
            }
          });
          await Promise.all(nameRequests);
          setUserNames(userNames);
        } else {
          setComments([]); // Set comments to empty array if no comments found
          // setErrorMessage("No comments found."); // Optionally set an error message
        }
      } catch (error) {
        setErrorMessage("Failed to fetch data from the server.");
      }
    };
  
    fetchData();
  }, [noticeId]);
  
  

  const handleDelete = async () => {
    try {
      let baseURL = "";
      if (process.env.NODE_ENV === "development") {
        baseURL = "http://121.139.20.242:5100";
      }
      const response = await axios.post(`${baseURL}/api/notice_delete`, {
        review_id: noticeId,
      });
      if (response.status === 200) {
        alert("게시물이 삭제되었습니다.");
        navigate("/community"); // 게시물 삭제 후 메인 페이지로 이동
        scrollToTop();
      } else {
        setErrorMessage("게시물 삭제에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("데이터베이스 연결에 실패했습니다.");
    }
  };

  const handleAddComment = async () => {
    try {
      let baseURL = "";
      if (process.env.NODE_ENV === "development") {
        baseURL = "http://121.139.20.242:5100";
      }
      const currentDate = new Date(); // Get the current date and time
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");
      const seconds = String(currentDate.getSeconds()).padStart(2, "0");
      
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
      const response = await axios.post(`${baseURL}/api/comment_insert`, {
        notice_id: noticeId,
        comment_detail: newComment,
        user_id: user_id,
        comment_date: formattedDate,
      });
      
      if (response.data.valid) {
        // Add the new comment to the comments array
        setComments([...comments, response.data.comment]);
        // Clear the comment input field
        setNewComment("");
        window.location.reload();
      } else {
        setErrorMessage("Failed to add comment.");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
    }
  };

  // const handleAddReply = (parentId) => {
  //     if (newReply.trim() !== '') {
  //         const newComments = [...comments, { text: newReply, id: Date.now(), replies: [], parentId: parentId }];
  //         setComments(newComments);
  //         setNewReply('');
  //         setReplyTo(null);
  //     }
  // };

  // const handleReply = (commentId) => {
  //   setReplyTo(commentId);
  // };

  return (
    <div className={styles.postDetailContainer}>
      {errorMessage ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : (
        <>
          <div className={styles.postHeader}>
            <h1 className={styles.postTitle}>{post.notice_name}</h1>
            {user_id === post.user_name && (
              <button className={styles.deleteButton} onClick={handleDelete}>
                삭제하기
              </button>
            )}
          </div>
          <p className={styles.postMeta}>
            조회수: {post.notice_views} | 작성일:{" "}
            {new Date(post.notice_date).toLocaleDateString()}
          </p>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.notice_detail }}
          />
          <div className={styles.commentSection}>
            <h2>댓글</h2>
            <div className={styles.commentInput}>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
              />
              <button className={styles.button} onClick={handleAddComment}>
                댓글 달기
              </button>
            </div>
            {comments.map((comment) => (
              <div key={comment.comment_id} className={styles.comment}>
                <div className={styles.comment__top}>
                <p>{userNames[comment.user_id]} : {comment.comment_detail}</p>
                  <button
                      className={styles.replyButton}
                      onClick={() => handleReply(comment.id)}
                  >
                      답글 쓰기
                  </button>
                </div> 
                {/* <div className={styles.replyInput}>
                  <input
                      type="text"
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                      placeholder="답글을 입력하세요"
                  />
                  <button
                      className={styles.button}
                      onClick={() => handleAddReply(comment.id)}
                  >
                      답글 달기
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
