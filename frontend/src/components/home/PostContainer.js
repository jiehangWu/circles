import React from "react";

const mockData = {
    userID: 'Jerome',
    time: '20 h',
    content: `Lorem ipsum dolor sit amet, 
    consectetur adipiscing elit. 
    Curabitur at elementum ligula. 
    Morbi id mauris tempor elit congue bibendum vitae id ex. 
    Nulla facilisi. Vivamus vulputate non sem quis consectetur. 
    Integer et euismod elit. Proin fermentum suscipit ipsum, eget blandit lacus rutrum ac. 
    Morbi aliquet tincidunt dui in imperdiet. Integer ornare, tellus vitae feugiat maximus, 
    risus odio viverra erat, ut dapibus massa erat sit amet nisi. Sed a semper eros. 
    Mauris sit amet lorem tellus. Quisque sed neque eget erat hendrerit venenatis vitae in ipsum.`
};

const styles = {
    card: {
        maxWidth: '25rem'
    },
    cardHeader: {
        color: 'white',
        fontSize: '0.8rem'
    },
    cardFooter: {
        color: 'gray',
        fontSize: '0.8rem'
    },
    content: {
        color: 'black'
    }
};

const PostContainer = () => {
    return (
        <div className="post-container">
            <div class='row no-gutters'>
                <div class='col bg-dark' style={{
                    maxWidth: '3rem',
                }}>
                    <div class='card'>
                        <img src='' alt='avatar' class='img-thumbnail' />
                    </div>
                </div>
                <div class='col'>
                    <div class="card" style={styles.card}>
                        <div class="card-header bg-dark text-left" style={styles.cardHeader}>
                            @{mockData.userID}
                        </div>
                        <div class="card-body bg-light text-left" id="content" style={styles.content}>
                            {mockData.content}
                        </div>
                        <div class="card-footer bg-dark text-right" style={styles.cardFooter}>
                            {mockData.time}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostContainer;