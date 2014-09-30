var Auth = (function () {
    function Auth(req, res) {
        this.req = req;
        this.res = res;
    }
    Auth.prototype.set = function (userId, userName) {
        //this.res.cookie('userId', userId, {path: '/'});
        this.res.cookie('userName', userName, { path: '/' });
        this.res.cookie('sessionUserId', userId, { signed: true });
        this.res.cookie('sessionUserName', userName, { signed: true });
        this.req.session.userId = userId;
        this.req.session.userName = userName;
    };

    Auth.prototype.clear = function () {
        //this.res.clearCookie('userId');
        this.res.clearCookie('userName');
        this.res.clearCookie('sessionUserId');
        this.res.clearCookie('sessionUserName');
        delete this.req.session.userId;
        delete this.req.session.userName;
    };
    return Auth;
})();
exports.Auth = Auth;
