var psas = require('../../app/controllers/psas.server.controller');

module.exports = function(app) {
    app.route('/psas')
    	.post(psas.create)
    	.get(psas.list);

    app.route('/psas/:psaId')
    	.get(psas.read)
    	.put(psas.update)
    	.delete(psas.delete);

    //app.param('psaId', psas.psaByID);
};