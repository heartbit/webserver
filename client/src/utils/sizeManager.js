var SizeManager = function() {
	this.list = [];
	this.listback = [];
	if(SizeManager.caller != SizeManager.getInstance) {
		throw new Error("This object cannot be instanciated");
	}

};

SizeManager.instance = null;

SizeManager.getInstance = function() {
	if (this.instance === null) {
		this.instance = new SizeManager();
	}
	return this.instance;
}

SizeManager.prototype.add = function(fct, width, height, backfct, id) {
	var newFct = {
		fct: fct,
		width: width,
		height: height,
		id: id
	};
	this.list.push(newFct);
	if(backfct) {
		var newFct = {
			fct: backfct,
			width: width,
			height: height,
			id: id
		};
		this.listback.push(newFct);
	}
}

SizeManager.prototype.addBack = function(fct, width, height, backfct,id) {
	var newFct = {
		fct: fct,
		width: width,
		height: height,
		id: id
	};
	this.listback.push(newFct);
}



SizeManager.prototype.execute = function(specific) {
	var size = {
		width: window.innerWidth || document.body.clientWidth,
		height: window.innerHeight || document.body.clientHeight
	};

	var inf = function(fct) {
		if(fct.width && fct.height) {
			if(fct.width > size.width && fct.height > size.height) {
				fct.fct();
			}
		}

		if(fct.width && !fct.height) {
			if(fct.width > size.width) {
				fct.fct();
			}
		}

		if(!fct.width && fct.height) {
			if(fct.height > size.height) {
				fct.fct();
			}
		}
	}

	var sup = function(fct) {
		if(fct.width && fct.height) {
			if(fct.width < size.width && fct.height < size.height) {
				fct.fct();
			}
		}

		if(fct.width && !fct.height) {
			if(fct.width < size.width) {
				fct.fct();
			}
		}

		if(!fct.width && fct.height) {
			if(fct.height < size.height) {
				fct.fct();
			}
		}
	}

	_.each(this.list, function(fct) {
		if(!specific) {
			inf(fct);
		} else if(fct.id == specific) {
			inf(fct);
		}
	});
	_.each(this.listback, function(fct) {
		if(!specific) {
			sup(fct);
		} else if(fct.id == specific) {
			sup(fct);
		}
	});
}


module.exports = SizeManager.getInstance();