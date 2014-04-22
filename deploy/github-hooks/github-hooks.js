var gith = require('gith').create(9001);

gith({
	repo: 'CoinLord/InsightfulTrader'
}).on('all', function(payload) {
	console.log('Post-receive happened!', payload);
	console.log('TEST');
});

console.log('Github hook server running on port 9001...');
