import React, {useEffect, useState} from "react"
import Post from "../Profile/Post";
import axios from "axios";
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {connect, useSelector} from "react-redux";
import Moment from "moment/moment";


const Posts = (props) => {
    const {user: currentUser} = useSelector((state) => state.auth);

    const [allposts, setallpost] = useState([]);
    const [postTitle, setpostTitle] = useState("");
    const [postDesc, setpostDesc] = useState("");
    const [postError, setpostError] = useState([]);
    let allpostsData = "https://localhost:8087/api/post/all";


    useEffect(() => {

        axios.get(allpostsData, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`,
                userEmail: currentUser.email
            }
        })
            .then(resOne => {
                setallpost(resOne.data);
            })
    }, [postError]);
    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const formattedDate = Moment(date).format('llll');
        return formattedDate.toLocaleString();
    }
    function addNewPost() {
        if (postTitle !== null && postDesc !== null) {
            const newPost = {
                postsCreatedDate: Date.now(),
                postsDescription: postDesc,
                postsTitle: postTitle,
                userEmail: currentUser.email
            }
            axios.post("https://localhost:8087/api/post/createPost", newPost, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`,
                    userEmail: currentUser.email
                }
            }).then(response => setpostError(response.data))
            setpostTitle("");
            setpostDesc("");
        }
    }

    return (
        <div>
            <div>
                <Card className="posts">
                    <Card.Header className="text-center" style={{background: '#242424', opacity: '0.9'}}>
                        <Card.Title className="text-primary ">New post</Card.Title>
                    </Card.Header>

                    <form className="text-dark" style={{padding: '2vh'}}>
                        <label className="form-label" htmlFor="floatingInput">Title</label>
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                className="form-control"

                                maxLength={65}
                                required
                                value={postTitle}
                                placeholder="Enter title"
                                onChange={(e) => {
                                    setpostTitle(e.target.value)
                                }}
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="floatingDescription">Description</label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter a description"
                                required
                                value={postDesc}
                                maxLength={300}
                                onChange={(e) => {
                                    setpostDesc(e.target.value)
                                }}
                            />

                        </div>

                        <div className="row">
                            <div className="col">
                                <Button
                                    onClick={() => {
                                        addNewPost()
                                    }}
                                >Post
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>

            <div>
                {
                    allposts.map(post =>
                        <Post
                            key={post.id} author={post.userEmail} text={post.postsDescription}
                            title={post.postsTitle}
                            date={getFormattedDate(post.postsCreatedDate)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Posts;