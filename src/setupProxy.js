const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api/*",
		createProxyMiddleware({
			target: "https://grata-api-gateway-8i6ttwu5.uc.gateway.dev",
			changeOrigin: true,
			pathRewrite: {
				"^/api/users": "/users",
				"^/api/images": "/images",
			},
		})
	);
};
