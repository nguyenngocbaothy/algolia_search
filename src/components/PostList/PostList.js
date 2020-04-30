import React, { Component } from "react";
import moment from 'moment';
import { posts } from "../../data";
import { Select, Divider, Pagination } from 'antd';
import "./PostList.css";

const { Option } = Select;

class PostList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            copyPosts: [],
            valueSearch: "",
            total: 0,
            current: 1,
            defaultPageSize: 3,
            slicedItemPage: [],
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    componentDidUpdate(prevProps) {
        const { valueSearch } = this.props;
        const { copyPosts, posts } = this.state;

        if (prevProps.valueSearch !== valueSearch && copyPosts.length > 0) {
            if (!valueSearch) {
                this.setState({
                    copyPosts: posts,
                })
            } else {
                const filteredPosts = copyPosts.filter(e => e.title.toLowerCase().includes(valueSearch.toLowerCase()))
                if (filteredPosts.length === 0) {
                    this.setState({
                        copyPosts: posts,
                    })
                } else {
                    this.setState({
                        copyPosts: filteredPosts,
                    })
                }
            }
        }
    }

    getPosts = () => {
        const { defaultPageSize } = this.state;

        const dataPosts = posts.posts;
        let slicedItemPage = [];
        for (let i = 0; i < dataPosts.length; i += defaultPageSize) {
            let sliced = dataPosts.slice(i, i + defaultPageSize);
            slicedItemPage.push(sliced);
        }


        this.setState({
            posts: dataPosts,
            copyPosts: slicedItemPage[0],
            total: posts.total,
            slicedItemPage,
        })
    }

    renderDate = (date) => {
        const day = moment(date, 'YYYY/MM/DD').date();
        const month = moment(date, 'YYYY/MM/DD').month();
        const year = moment(date, 'YYYY/MM/DD').year();

        return moment([year, month, day]).fromNow();
    }

    onSelectChange = (value) => {
        const { copyPosts } = this.state;

        if (value === 1) {
            copyPosts.sort((a, b) => a.points - b.points);
        } else {
            copyPosts.sort((a, b) => b.points - a.points);
        }

        this.setState({
            copyPosts,
        })

    }

    onChangeDate = (value) => {
        const { copyPosts } = this.state;

        if (value === 1) {
            copyPosts.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
        } else {
            copyPosts.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        }

        this.setState({
            copyPosts,
        })
    }

    onChangePagination = page => {
        const { slicedItemPage } = this.state;

        this.setState({
            current: page,
            copyPosts: [...slicedItemPage[page - 1]],
        });
    };

    goToPageDetail = (id) => {
        window.location.href = window.location.origin + "/detail/" + id;
    }

    render() {
        const { copyPosts, total, current, defaultPageSize } = this.state;

        return (
            <div className="post-list">
                <div className="sort">
                    <span>Sort by point</span>
                    {' '}
                    <span>
                        <Select
                            defaultValue={0}
                            style={{ width: 180 }}
                            onChange={this.onSelectChange}
                        >
                            <Option value={0} disabled>Please choose option</Option>
                            <Option value={1}>Ascending</Option>
                            <Option value={-1}>Descending </Option>
                        </Select>
                    </span>
                    {' '}
                    <span>or time</span>
                    {' '}
                    <span>
                        <Select
                            defaultValue={0}
                            style={{ width: 180 }}
                            onChange={this.onChangeDate}
                        >
                            <Option value={0} disabled>Please choose option</Option>
                            <Option value={1}>Ascending</Option>
                            <Option value={-1}>Descending </Option>
                        </Select>
                    </span>
                </div>

                <div className="post-items">
                    {
                        copyPosts.length > 0 ? copyPosts.map(e => (
                            <div className="post-item" key={e.id}>
                                <div className="title" onClick={() => this.goToPageDetail(e.id)}>
                                    {e.title}
                                </div>
                                <div className="post-body">
                                    {`${e.points} points`}
                                    <Divider type="vertical" />
                                    {e.author}
                                    <Divider type="vertical" />
                                    {this.renderDate(e.created_date)}
                                    <Divider type="vertical" />
                                    {`${e.comments} comments`}
                                    <Divider type="vertical" />
                                    <a href={e.link} className="link">
                                        {`(${e.link})`}
                                    </a>
                                </div>
                            </div>
                        )) : null
                    }
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        defaultCurrent={1}
                        total={total}
                        defaultPageSize={defaultPageSize}
                        current={current}
                        onChange={this.onChangePagination}
                    />
                </div>
            </div>
        );
    }
}

export default PostList;