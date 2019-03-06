import React from 'react';
import '../css/CommentItem.css';

export default class CommentItem extends React.Component {
    render() {
        const { comment, onDeleteMe } = this.props;
        return(
            <div className="message-board-comment-item">
               <p>{comment.text}</p>
               <p class="timestamp">${comment.timestamp}</p>
                <button type="button" class="delete-button" onClick={onDeleteMe}>x</button>
                <button type="button" class="details-button">Details</button>
            </div>
        );
    }
}
