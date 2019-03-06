import React from 'react';
import axios from 'axios';
import '../css/MessageBoardApp.css';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';
import Search from './Search';
import commentData from '../data';

// Task:
//  1. Pass comments down to CommentList (using props)
//  2. create a CommentItem component
//  3. render a single CommentItem with the data from the first comment (aka comments[0])

class MessageBoardApp extends React.Component {
    constructor(props) {
        super(props);

        // set initial state
        this.state = {
            comments: [],
        };

    }

    componentDidMount() {
        axios
            .get('https://marantzexpress.herokuapp.com/api/comments')
            .then(response => this.setState({comments: response.data}));
    }

    handleDelete = (id) => {
        axios.delete(`https://marantzexpress.herokuapp.com/api/comments/${id}`)
            .then(response => this.setState({comments: response.data.comments}))
            .catch(error => console.log(error));
        // // Filter out the comments
        // const updatedComments = this.state.comments.filter(comment => comment.id !== id);
        // // set state
        // this.setState({ comments: updatedComments });    
    }

    handleAddComment = commentText => {
        console.log(`commenting ${commentText}`);
        axios.post(`https://marantzexpress.herokuapp.com/api/comments/`, {text: commentText,})
            .then(response => this.setState({comments: response.data.comments}))
            .catch(err => {
                if(err.response && err.response.status === 400){
                    alert(`Please enter comment text!`);
                }
        });
    };

    handleSearchSubmit = searchText => {
        console.log(searchText);
        axios.get(`https://marantzexpress.herokuapp.com/api/comments?filter=${searchText}`).then(response => this.setState({comments: response.data}));
    };

    render() {
        return(
            <div className="message-board-app">
                <Search onSearch={this.handleSearchSubmit}/>
                <CommentList comments={this.state.comments} onDelete={this.handleDelete}/>
                <AddCommentForm onAddComment={this.handleAddComment}/>
            </div>
        );
    }
}

export default MessageBoardApp;