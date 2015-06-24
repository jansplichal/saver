/**
 * error page handler
 *
 * @param {String} path (optional) - path to the error page
 * @param {Object} opts (optional)
 * @api public
 */


 module.exports = function (path, opts) {
   opts = opts || {};

   return function *errorPage(next) {
     try {
       yield next;
     } catch (err) {
       yield this.render(path, {error:err});
       this.app.emit('error', err, this);
     }
   };
}
