import React from "react";
import "spinkit/spinkit.min.css";

const LoadingFallback = () => {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "100vh" }}
		>
			<table>
				<tbody>
					<tr>
						<td className="table table-align-middle mb-0">
							<div className="sk-circle-fade">
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
								<div className="sk-circle-fade-dot"></div>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default LoadingFallback;
