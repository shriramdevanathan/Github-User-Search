import React from 'react';
import { browserHistory as history } from 'react-router';
import { Link } from 'react-router';
import $ from 'jquery'; 
import Search from '../components/Search';
import KendoListView from 'kendo-ui-react-jquery-listview';
import 'kendo-ui-core/css/web/kendo.common.core.min.css';
import 'kendo-ui-core/css/web/kendo.default.min.css';

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);      
    }

    onChange(e){
       var selectedItem = e.sender.dataSource.view()[e.sender.select().index()].login;
       this.props.onSelectUser(selectedItem);
    }
    renderStat(stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    }


    render() {

       
        if (!this.props.username) {
            return (<div className="user-page">LOADING...</div>);
        } 

        return (
        <div>
            <KendoListView events={{ //name of event, and callback 
        change:this.onChange
        
    }} options={{template:$("#template").html(),dataSource:{data:this.props.user,pageSize:21},pageable:true,selectable:true}}>
            </KendoListView>

         </div>
        );
    }
};

export default Results;
