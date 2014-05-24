define('ShortcutsManager', ['keymaster'], function() {

	var Shortcut = function(params) {
		this.params = params;

		this.toString = function() {
			return JSON.stringify(this.params);
		};

	};

	var ShortcutsManager = function ShortcutsManager() {
		if (instance !== null) {
			throw new Error("Cannot instantiate more than one ShortcutsManager, use ShortcutsManager.getInstance() faggot ;-) ");
		}
	};

	ShortcutsManager.prototype.shortcuts = [];
	
	ShortcutsManager.prototype.init = function() {
		var helpShortcutsParams = {
			combo: 'h',
			action: 'Show this page!'
		};
		var helpShortcut = new Shortcut(helpShortcutsParams);
		this.shortcuts.push(helpShortcut);
	};

	ShortcutsManager.prototype.addShortcut = function(combo, callback) {
		key(combo, callback);
	};

	ShortcutsManager.prototype.getList = function() {
		var list = this.shortcuts;
		return list;
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