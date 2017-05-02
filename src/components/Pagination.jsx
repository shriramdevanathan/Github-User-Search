import React from 'react';
import { browserHistory as history } from 'react-router';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.nextHandler = this.nextHandler.bind(this);
        this.previousHandler = this.previousHandler.bind(this);
    }
    nextHandler(e) {
        if (typeof this.props.onNext === 'function') {
            this.props.onNext(e);
        }
    }
    previousHandler(e) {
        if (typeof this.props.onPrevious === 'function') {
            this.props.onPrevious(e);
        }
    }

    render() {

        return (
            <div className="paginate-parent">
            	<div>
                    <strong>Total Results:</strong> {this.props.totalResults}
                    
                </div>
                <div>
                	<strong>{this.props.pageNum}</strong> of <strong>{this.props.totalPages}</strong>
                </div>
                <div className="pull-left">
                    
                    <svg width="40" height="40" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"><title>arrow-left</title><path d="M6 3L0 8l6 5v-3h4V6H6z" fill="#000" fill-rule="evenodd"></path></svg>
                    <button className="search-page__button" onClick={this.previousHandler}>Previous</button>
                </div>

                


                <div className="pull-right">
                    <button className="search-page__button" onClick={this.nextHandler}>Next</button>
                    <svg width="40" height="40" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"><title>arrow-right</title><path d="M10 8L4 3v3H0v4h4v3z" fill="#000" fill-rule="evenodd"></path></svg>
                </div>
            </div>
        );
    }
};

export default Pagination;
