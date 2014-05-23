define('ShortcutsManager', ['keymaster'], function() {

	var ShortcutsManager = function ShortcutsManager() {
		if (instance !== null) {
			throw new Error("Cannot instantiate more than one ShortcutsManager, use ShortcutsManager.getInstance() faggot ;-) ");
		}
	};

	ShortcutsManager.prototype.init = function() {
		key('h', function() {
			console.log('Press h -> help');
		});
	};

	ShortcutsManager.prototype.addShortcut = function(combo, callback){
		key(combo, callback);
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