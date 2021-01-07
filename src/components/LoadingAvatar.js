import React from "react";
import "spinkit/spinkit.min.css";

const LoadingAvatar = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "16vh" }}
		>
			<table>
				<tbody>
					<tr>
						<td className="table table-align-middle mb-0">
							<div className="sk-grid">
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
								<div className="sk-grid-cube"></div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default LoadingAvatar;
