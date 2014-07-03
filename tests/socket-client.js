  var socket = require('socket.io-client')('http://localhost:9090/data');

  socket.on('connect', function() {
  	console.log('connected');

  	// socket.on('roomlist', function(roomlist) {
  	// 	console.log('roomlist', roomlist);
  	// });
  	// socket.emit('roomlist');

  	socket.on('enter-dataroom', function(data) {
  		console.log('data', data);
  	});
  	socket.emit('enter-dataroom', 'BTNY');

  	socket.on('BTCCHINA:BTC:CNY:TRD', function(data) {
  		console.log(data);
      // socket.emit('leave-dataroom','BTC:CNY');
  	});

  });