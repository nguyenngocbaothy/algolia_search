import React, { Component } from "react";
import { posts } from "../../data";
import moment from 'moment';
import { Card, Divider, Icon, Comment, Tooltip, List } from 'antd';
import "./Detail.css";


class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            comments_data: [],
            isShowComment: true,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        if (id) {
            const post = posts.posts.find(e => e.id === parseInt(id));
            this.setState({
                post,
            }, this.renderCommentContent)
        }
    }

    renderCommentContent = () => {
        const { post } = this.state;
        const comments = post.comments_detail;
        const comments_data = comments.map(e => {
            return {
                author: e.user,
                avatar: e.avatar,
                content: (
                    <p>{e.content}</p>
                ),
                datetime: (
                    <Tooltip
                        title={moment(post.created_date, "YYYY-MM-DDTHH:mm:ssZ").format("DD/MM/YYYY HH:mm:ss")}
                    >
                        <span>
                            {
                                moment(
                                    [
                                        moment(post.created_date, 'YYYY/MM/DD').year(),
                                        moment(post.created_date, 'YYYY/MM/DD').month(),
                                        moment(post.created_date, 'YYYY/MM/DD').date()
                                    ]
                                )
                                    .fromNow()
                            }
                        </span>
                    </Tooltip>
                ),
            }
        })


        if (comments_data.length > 0) {
            this.setState({
                comments_data,
            })
        }
    }

    render() {
        const { post, comments_data, isShowComment } = this.state;

        return (
            <div className="detail">
                <div className="card-detail">
                    {
                        post && (
                            <Card
                                style={{
                                    width: 500,
                                    borderRadius: 8,
                                    boxShadow: "10px 10px 40px rgba(174, 174, 174, 0.15)",
                                }}
                            >
                                <h2>{post.title}</h2>
                                <Divider orientation="right">{post.author}</Divider>

                                <div>
                                    <div>
                                        <span className="icon"><Icon type="star" style={{ fontSize: '16px' }} /></span>
                                        <span><strong>Point: </strong></span>
                                        <span>{post.points}</span>
                                    </div>
                                    <div>
                                        <span className="icon"><Icon type="calendar" style={{ fontSize: '16px' }} /></span>
                                        <span><strong>Created date: </strong></span>
                                        <span>{moment(post.created_date, "YYYY-MM-DDTHH:mm:ssZ").format("DD/MM/YYYY HH:mm:ss")}</span>
                                    </div>
                                    <div className="detail-link">
                                        <span className="icon"><Icon type="link" style={{ fontSize: '16px' }} /></span>
                                        <span><strong>Link: </strong></span>
                                        <span>
                                            <a href={post.link}>{post.link}</a>
                                        </span>
                                    </div>
                                </div>

                                <Divider dashed />
                                <div
                                    className="comment"
                                    onClick={() => this.setState({ isShowComment: !isShowComment })}
                                >
                                    <Icon type="message" style={{ fontSize: '14px' }} />{' '}
                                    <strong>Comments:</strong>
                                    <span>
                                        {
                                            comments_data.length > 0 ? ` (${comments_data.length} replies)` : " (No comment)"
                                        }
                                    </span>
                                </div>

                                {
                                    isShowComment && (
                                        <List
                                            className="comment-list"
                                            // header={`${data.length} replies`}
                                            itemLayout="horizontal"
                                            dataSource={comments_data}
                                            renderItem={item => (
                                                <li>
                                                    <Comment
                                                        actions={item.actions}
                                                        author={item.author}
                                                        avatar={item.avatar}
                                                        content={item.content}
                                                        datetime={item.datetime}
                                                    />
                                                </li>
                                            )}
                                        />
                                    )
                                }
                            </Card>
                        )
                    }

                </div>
            </div>
        )
    }
}

export default Detail;