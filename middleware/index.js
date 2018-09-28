var middleware = {};

// isLoggedIn will probably go here
middleware.isLoggedIn =  function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	
	//flash messages that indicates a user must be logged in
	//req.flash("error", "Please log in first!" );
	
	res.redirect("/login");
};
// Also, authorization (different from Authentication) functions may/may not go here as well

module.exports = middleware;
