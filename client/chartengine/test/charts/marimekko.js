require(['../../dist/ChartEngine'], function(ChartEngine) {

  // var DatasetFactory = require('DatasetFactory');

  var chartParams = {
    anchorId: "#test",
    chartType: "MarimekkoChart",
    size: 'auto',
    modeDebug: true,
    options: {
      title: 'Marimekko chart'
    }
  };

  var chart = ChartEngine.create(chartParams);

  var dataset = {
    lines: [{
      id: "prout",
      name: "Email",
      points: [{
        id: "nl1409",
        value: 30000,
        x: "nl1409",
        name: "nl1409",
        status: 'other'
      }]
    }, {
      id: "Social",
      name: "Social",
      points: [{
        id: "redirect_disqus_com",
        value: 6000,
        x: "redirect.disqus.com",
        name: "redirect.disqus.com"
      }, {
        id: "facebook_com",
        value: 11000,
        x: "facebook.com",
        name: "facebook.com"
      }, {
        id: "reddit_com",
        value: 6000,
        x: "reddit.com",
        name: "reddit.com",
      }, {
        id: "l_facebook_com",
        value: 4000,
        value: 2,
        x: "l.facebook.com",
        name: "l.facebook.com"
      }]
    }, {
      id: "Referral",
      name: "Referral",
      points: [{
        id: "duplicateid",
        value: 50000,
        x: "moodle.bucknell.edu",
        name: "moodle.bucknell.edu"
      }, {
        id: "google_de",
        value: 10000,
        x: "google.de",
        name: "google.de",
        status: 'other'
      }, {
        id: "google_fr",
        value: 5000,
        x: "google.fr",
        name: "google.fr"
      }]
    }, {
      id: "Direct",
      name: "Direct",
      points: [{
        id: "duplicateid",
        value: 98000,
        x: "direct traffic",
        name: "direct traffic"
      }]
    }]
  };

  // var dataset = {
  //   lines: [{
  //     id: "Email",
  //     name: "Email",
  //     points: [{
  //       id: "nl1409",
  //       value: 8000,
  //       x: "nl1409",
  //       name: "nl1409",
  //     }]
  //   }, {
  //     id: "Social",
  //     name: "Social",
  //     points: [{
  //       id: "redirect_disqus_com",
  //       value: 6000,
  //       x: "redirect.disqus.com",
  //       name: "redirect.disqus.com"
  //     }, {
  //       id: "facebook_com",
  //       value: 11000,
  //       x: "facebook.com",
  //       name: "facebook.com"
  //     }]
  //   }]
  // };

  chart.draw(dataset);

});