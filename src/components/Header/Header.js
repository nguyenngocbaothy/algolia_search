/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
    Avatar,
    Input,
    Icon,
} from 'antd';
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        const { onSearch } = this.props;

        return (
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-color">
                    <a className="navbar-brand" href="#">
                        <Avatar
                            shape="square"
                            style={{
                                color: '#ffffff',
                                backgroundColor: 'orange',
                                border: "1px solid #ffffff"
                            }}
                            size={48}
                        >
                            H
                        </Avatar>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0 input-search-form">
                            <Input
                                addonBefore={<Icon type="search" />}
                                className="input-search"
                                placeholder="Searching title..."
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </form>
                    </div>
                </nav>

            </div>
        );
    }
}

export default Header;