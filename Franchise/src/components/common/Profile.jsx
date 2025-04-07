import React from 'react'
import { Link } from "react-router-dom";

const Profile = ({name,className,slogan,link}) => {
	return (
		<Link to={link} className={`product_profile ${className ? className : ''}`}>
			<div className="product_profile_content">
				<span>{name}</span>
				{slogan ? <p>{slogan}</p> : ""}
			</div>
		</Link>
	)
}

export default Profile;