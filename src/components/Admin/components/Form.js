// import { styled } from '@material-ui/core'
import React, { Component } from 'react'
import './Form.css'
import styled from 'styled-components'

const ankur = styled.div`
margin:10px;
background-color:red;
`
const jeet = {
    root: {
        margin:'2rem',
        background:'red'
    }
}

class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             moviename: '',
             movieposter: '',
             movielink: ''
        }
        
    }

    handleMovienameChange = event =>  {
        this.setState({
            moviename: event.target.value
        })
    }
    handleMovieposterChange = event => {
        this.setState({
            movieposter:event.target.value
        })
    }
    handleMovielinkChange = event => {
        this.setState({
            movielink: event.target.value
        })
    }
    handleSubmit = event => {
        alert(`${this.state.moviename} ${this.state.movieposter} ${this.state.movielink}`)
        event.preventDefault()
    }
    
    render() {
        return ( 
            <ankur>
            <form className={jeet.root} onSubmit={this.handleSubmit}>
                <div class="moviename">
                    <p>New Movie Adding</p>
                    <label>Movie Name</label>
                    <input 
                    type="text" 
                    value={this.state.moviename} 
                    onChange={this.handleMovienameChange} 
                    />
                </div>
                <div class="movieposter">
                    <label>Movie Poster</label>
                    <input type="file" 
                    name="filename"
                    value={this.state.movieposter}
                    onChange={this.handleMovieposterChange} 
                    />
                </div>
                <div class="movielink">
                    <label>Movie Link</label>
                    <input 
                    type="text" 
                    value={this.state.movielink} 
                    onChange={this.handleMovielinkChange} 
                    />
                </div>
                <button type="submit" class="add">Add Movie</button>
            </form>
            </ankur>  
        )    
    }
}

export default Form
