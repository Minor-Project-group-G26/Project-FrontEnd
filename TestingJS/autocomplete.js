import React, { Component } from 'react';
import './style.css';

export default class AutoCompleteText extends Component{
    constructor(props){
        super(props)
        this.items =[
            'David',
            'Ankur',
            'Akash',
            'Jeet',
            'Gourav',
        ];
        this.state ={
            suggestions :[],
            text:"",
        }
    }

    onTextChange = (e) =>{
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'g');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
            this.setState(()=>({suggestions , text : value}));
    }

    suggestionSelected (value) {
        this.setState(()=>({
            text : value,
            suggestions: [],
        }));
    }


    renderSuggestions(){
        const {suggestions} = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return(
            <ul>
            {suggestions.map((item)=><li onClick={()=> this.suggestionSelected(item)}>{item}</li>)}
            </ul>
            );
    }


    render(){
        const {text} = this.state;
        return(
            <div className="Auto">
                <input value={text} onChange={this.onTextChange} type="text"/>
               {this.renderSuggestions()}
            </div>
        );
    }

}