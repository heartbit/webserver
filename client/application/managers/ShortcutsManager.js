define('ShortcutsManager', ['keymaster'], function(key) {

	var ShortcutsManager = function ShortcutsManager() {
		if (instance !== null) {
			throw new Error("Cannot instantiate more than one ShortcutsManager, use ShortcutsManager.getInstance() faggot ;-) ");
		}
	};

	ShortcutsManager.prototype.init = function() {
		key('a', function() {
			alert('you pressed a!')
		});
	};

	var instance = null;
	ShortcutsManager.getInstance = function() {
		if (instance === null) {
			instance = new ShortcutsManager();
		}
		return instance;
	};

	return ShortcutsManager.getInstance();

});