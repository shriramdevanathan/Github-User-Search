import React from 'react';
import { browserHistory as history } from 'react-router';
import Results from '../components/Results';
import Pagination from '../components/Pagination';
import $ from 'jquery'; 

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResults: []
        };
        this.state.user = [];
        this.state.totalUsers = 0;
        this.state.totalPages = 0;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleSubmitEnter = this._handleSubmitEnter.bind(this);
        
        this._handleNext = this._handleNext.bind(this);
        this._handlePrevious = this._handlePrevious.bind(this);
        this.onSelectUser = this.onSelectUser.bind(this);
        this.state.userTemp = "";
    }
    _handleSubmitEnter(e){
        if (e.keyCode === 13){
            this.state.totalUsers = 0;
            this.state.totalPages = 0;
            this._handleSubmit(e);
        }
    }
    onSelectUser(item){
        history.push('/user/'+item);
    }
    _callApi(){
        fetch(`https://api.github.com/search/users?q=${this.refs.userInput.value}&per_page=21&page=${this.state.page}`)
        .then(response => response.json())
        .then(
            user => {
                this.setState({
                    user: user.items,
                    totalUsers:user.total_count,
                    totalPages:Math.ceil(user.total_count/21),
                    userTemp: this.refs.userInput.value
                });
                
                this.refs.userInput.value = "";
            }
           
        );
    }
    _handleSubmit(e) {
        e.preventDefault();
        this.state.page = 1;
        this.setState(
            {
                user : []
            }
        );
        this.state.totalUsers = 0;
        this._callApi();
        
    }

    _handlePrevious(e) {
        e.preventDefault();
        //Ideally should hide the Previous button
        if(this.state.page==1){
         return;
        }
        this.refs.userInput.value = this.state.userTemp
        this.setState({
            user: []
        });
        this.setState({page :this.state.page - 1},this._callApi);
    }
    _handleNext(e) {
        e.preventDefault();
                //Ideally should hide the Next button

        if(this.state.user.length <21){
            return;
        }
        this.refs.userInput.value = this.state.userTemp
        this.setState({
            user: []
        });
        this.setState({page :this.state.page + 1},this._callApi);
            
        
    }


    render() {

        return (
                <div className="search-page">
                    <h2>Enter a GitHub login name</h2>
                    <input ref="userInput" className="search-page__input" type="text" onKeyDown={this._handleSubmitEnter} />
                    <button id="btnSearch" type="submit" onClick={this._handleSubmit} className="search-page__button"  >Search</button>


                    {this.state.user.length>0?<Pagination pageNum={this.state.page} totalPages={this.state.totalPages} totalResults= {this.state.totalUsers} onNext={this._handleNext} onPrevious={this._handlePrevious} />:null}
                    

                    <div>
                        <div className="search-results">
                        {this.state.user.length>0?<Results onSelectUser={this.onSelectUser} username={this.refs.userInput.value} user={this.state.user} />:null}
                        </div>
                    </div>

                </div>
        );
    }
};

export default Search;
