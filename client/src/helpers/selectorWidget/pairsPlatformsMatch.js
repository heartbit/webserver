var match = {};

match.getPair = function(selectedPlatform, selector, allPlatforms, defaultpairs) {
	var currentPair = selector.item + '/' + selector.currency;
	_.each(allPlatforms.platforms, function(pairs, platform) {
		if(selectedPlatform == platform) {
			_.each(pairs, function(pair, key) {
				if(currentPair == pair) {
					return pair;
				}
			});
		}
	});
	var defaultpair = defaultpairs[selectedPlatform].split('/');
	return defaultpair;
};

match.getPlatform = function(selectedPair, selector, allPlatforms, defaultplatforms) {
	console.log("MATCH THIS",selectedPair, selector, allPlatforms, defaultplatforms);
	var selectedPlatform = selector.platform;
	_.each(allPlatforms.platforms, function(pairs, platform) {
		if(platform == selectedPlatform) {
			_.each(pairs, function(pair, key) {
				if(selectedPair == pair){
					return selectedPlatform;
				}
			});
		}
	});
	var defaultplatform = defaultplatforms[selectedPair];
	return defaultplatform;
	
}


module.exports = match;