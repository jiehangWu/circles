import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import "./InputArea.css";
import ImageIcon from '@material-ui/icons/Image';
import IconButton from "@material-ui/core/IconButton";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

let InputArea = () => {
    return (
        <div className="container">
            <Card className="input-area my-3">
                <div className="row">
                    <div className="col-lg-1">
                        <Avatar aria-label="avatar" className="input-area-avatar mx-3 my-3">
                            R
                        </Avatar>
                    </div>
                    <div className="col-lg-11">
                        <textarea className="text-box mx-2 mt-3"
                                  rows="3"
                                  placeholder="What's up?"
                                  required>
                        </textarea>
                        <IconButton aria-label="upload image">
                            <ImageIcon/>
                        </IconButton>
                        <IconButton aria-label="add emoji">
                            <EmojiEmotionsIcon/>
                        </IconButton>
                        <button type="button" className="btn btn-primary float-right mx-4 mb-3">
                            Submit
                        </button>
                    </div>
                </div>
            </Card>
        </div>
        // <div id="addArea" className="panel">
        //     <h2>How do you feel today</h2>
        //
        //     <form
        //         onSubmit={e => {
        //             e.preventDefault()
        //             if (!input.value.trim()) {
        //                 return
        //             }
        //             input.value = ''
        //         }}
        //     >
        //
        // <textarea ref={node => {
        //     input = node
        // }}
        //           className="textinput"
        // />
        //
        //         <button type="submit" className="inputPanel">Share</button>
        //
        //     </form>
        // </div>
    )
}


export default InputArea;