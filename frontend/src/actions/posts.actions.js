export const submitPost = (post) => {
    return {
        type: "SUBMIT_POST",
        payload: post,
    }
}

export const likePost = (postID) => {
    return {
        type: "LIKE_POST",
        payload: {
            "postID": postID
        }
    }
}

export const inputSentence = (sentence) => {return{
    type: "INPUT_TAG",
    input: sentence
}}

export const uploadImage = (data) => {
    return (dispatch) => {
        dispatch ({
            type: "UPLOAD_IMAGE",
            payload: data
        });
        fetch("http://localhost:5000/upload_image", {
            method:"POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
            body: data
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.success) {
                let address = data.address;
                console.log(address);
                dispatch ({
                    type: "ADD_IMAGE_POST",
                    payload: address
                });
            }
        })
    }
};

