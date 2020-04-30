import React, { Component } from "react";
import Header from "../../components/Header/Header"
import PostList from "../../components/PostList/PostList"


class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueSearch: "",
        };
    }

    onSearch = (value) => {
        this.setState({
            valueSearch: value,
        })
    }

    render() {
        const { valueSearch } = this.state;

        return (
            <div className="posts">
                <Header onSearch={this.onSearch} />
                <PostList valueSearch={valueSearch} />
            </div>
        );
    }
}

export default Posts;