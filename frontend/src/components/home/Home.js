import React from "react";
import PostContainer from './PostContainer';
import InputArea from './InputArea';
import PreferenceBar from './PreferenceBar';


let Home = () => {

	return (
		<div id="addArea" className="panel">
			{/* <PreferenceBar/> */}
               <PostContainer/>
			<InputArea/>
		</div>
	)
}


export default Home;