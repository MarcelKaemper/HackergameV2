module.exports = (email) => {
	var regex = /^\S+[@]\S+[.]\S+$/;
	if(regex.test(email)) {
		return true;
	}
}
