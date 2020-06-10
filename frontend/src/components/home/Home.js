import React from "react";
import PostContainer from './PostContainer';
import InputArea from './InputArea';



let Home = () => {

	return (
		<div id="addArea" className="panel">

               <PostContainer/>
			<InputArea/>
		</div>
	)
}


export default Home;