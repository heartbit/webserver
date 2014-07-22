var socket = require('socket.io-client')('http://localhost:9090/data');

socket.on('connect', function() {
  console.log('connected');

  // socket.on('roomlist', function(roomlist) {
  //   console.log('roomlist', roomlist);
  // });
  // socket.emit('roomlist');

  socket.on('enter-dataroom', function(data) {
    console.log('join dataroom', data);
  });
  socket.emit('enter-dataroom', 'BTC:USD');

  socket.once('BITSTAMP:BTC:USD:TRD', function(data) {
    console.log(data);

    setTimeout(function() {
      socket.on('leave-dataroom', function(status) {
        console.log('status leave data', status);
      });

      socket.emit('leave-dataroom', 'BTC:USD');

      setTimeout(function() {
        socket.emit('enter-dataroom', 'BTC:CNY');
        socket.on('BTCCHINA:BTC:CNY:TRD', function(data) {
          console.log(data)
        });

        socket.once('BITSTAMP:BTC:USD:TRD', function(data) {
          console.log(data)
        });
      }, 2000);

    }, 2000);

  });

});