import React, { useState } from "react";
import LoadingAvatar from "./LoadingAvatar";
import { useSelector } from "react-redux";
import { CImg } from "@coreui/react";

const Image = () => {
	const { avatar, status } = useSelector((state) => state.user);
	const [avatarUrl, setAvatarUrl] = useState("");

	if (avatar && avatar !== "") {
		var reader = new FileReader();

		reader.onload = function () {
			setAvatarUrl(reader.result);
		};

		reader.readAsDataURL(avatar);
	}

	if (status === "GET_AVATAR_SUCCESS") {
		return (
			<div className="text-center">
				<CImg
					src={avatarUrl}
					width="150px"
					height="150px"
					alt="User Avatars"
					className="round img-thumbnail"
				/>
			</div>
		);
	} else if (status === "GET_AVATAR_PENDING") {
		return <LoadingAvatar />;
	} else {
		return <></>;
	}
};

export default Image;
