define('newsLayer', ['d3', 'd3tip', 'FormatUtils', 'news', 'tweets', 'fbposts', 'moment'], function(d3, d3tip, FormatUtils, News, Tweets, Fbposts) {

  d3.tip = d3tip;

  var defaultDuration = 300;

  var formatTwitterTip = function(d) {
    var twitterTipTpl = "<div><div><img src='<%=user.profile_image_url%>'/></div><div><%=user.name%></div><h3><%=text%></h3></div>";
    return _.template(twitterTipTpl, d.attributes);
  };

  var formatRSSTip = function(d) {
    var rssTipTpl = "<div><div><img src='<%=params.logo%>'/></div><div><%=params.name%></div><h3><%=title%></h3><div><%=summary%></div></div>";
    return _.template(rssTipTpl, d.attributes);
  };

  var formatFbTip = function(d) {
    d.picture = d.picture || "";
    var fbTipTpl = "<div><div class='right'><img src='<%=picture%>'/></div><div><%=name%></div><h3><%=message%></h3></div>";
    return _.template(fbTipTpl, d.attributes);
  };

  function NewsLayer(chart) {
    var self = this;
    this.chart = chart;
    this.cellSize = 20;
    this.isVisible = false;

    _.bindAll(this, 'updateTwitterLayer', 'updateNewsLayer', 'updateFacebookLayer', 'update');

    this.tweets = new Tweets();
    this.fbposts = new Fbposts();
    this.news = new News();

    this.twittertip = d3.tip()
      .direction('n')
      .offset([-15, 0])
      .attr('class', 'd3-tip')
      .style('max-width', '400px')
      .html(formatTwitterTip);

    this.rsstip = d3.tip()
      .direction('n')
      .offset([-15, 0])
      .attr('class', 'd3-tip')
      .style('max-width', '400px')
      .html(formatRSSTip);

    this.fbtip = d3.tip()
      .direction('n')
      .offset([-15, 0])
      .attr('class', 'd3-tip')
      .style('max-width', '400px')
      .html(formatFbTip);

    this.newsLayer = this.chart.mainLayer
      .append("g")
      .attr("class", "news_layer");

    this.newsLayer
      .call(this.twittertip)
      .call(this.fbtip)
      .call(this.rsstip);

    var defs = this.newsLayer
      .append("defs");

    defs.append("pattern")
      .attr("id", "twitter-image")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .append("image")
      .attr("xlink:href", "/images/charts/twitter.png")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('x', 0)
      .attr('y', 0);

    defs.append("pattern")
      .attr("id", "fb-image")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .append("image")
      .attr("xlink:href", "/images/charts/fb.png")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('x', 0)
      .attr('y', 0);

    defs.append("pattern")
      .attr("id", "coindesk-image")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .append("image")
      .attr("xlink:href", "/images/charts/coindesk.ico")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('x', 0)
      .attr('y', 0);

    defs.append("pattern")
      .attr("id", "gnews-image")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .append("image")
      .attr("xlink:href", "/images/charts/gnews.png")
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('x', 0)
      .attr('y', 0);

    this.isVisible = true;

    this.newsYScale = d3.scale
      .linear()
      .range([3 * this.chart.height / 4, this.chart.height]);

    this.twitterLayer = this.newsLayer
      .append('g')
      .attr('class', 'news_twitter_layer');

    this.fbLayer = this.newsLayer
      .append('g')
      .attr('class', 'news_fb_layer');

    this.rssLayer = this.newsLayer
      .append('g')
      .attr('class', 'news_rss_layer');

    this.hide();
  };

  NewsLayer.prototype.draw = function() {
    this.update();
  };

  NewsLayer.prototype.update = function() {
    var self = this;

    var extremeDates = [d3.min(this.chart.models.candles.map(function(candle) {
      return candle.startDate;
    })), d3.max(this.chart.models.candles.map(function(candle) {
      return candle.endDate;
    }))];

    this.tweets.fetch({
      data: {
        "startDate": extremeDates[0],
        "endDate": extremeDates[1],
        "limit": 10,
        "filters": {}
      },
      type: 'POST',
      success: this.updateTwitterLayer
    });

    this.fbposts.fetch({
      data: {
        "startDate": extremeDates[0],
        "endDate": extremeDates[1],
        "limit": 10,
        "filters": {}
      },
      type: 'POST',
      success: this.updateFacebookLayer
    });

    this.news.fetch({
      data: {
        "startDate": extremeDates[0],
        "endDate": extremeDates[1],
        "limit": 10,
        "filters": {}
      },
      type: 'POST',
      success: this.updateNewsLayer
    });

  };

  NewsLayer.prototype.updateNewsLayer = function() {
    var self = this;

    console.log('News layer : ', this.news.models.length);
    if (!this.news.models || !this.news.models.length > 0) {
      this.news.models = [];
    }

    this.rssLayerRects = this.rssLayer
      .selectAll("rect.rss")
      .data(self.news.models, function(rss) {
        return rss.get('id');
      });

    // Remove
    this.rssLayerRects
      .exit()
      .transition()
      .duration(100)
      .remove();

    // Enter
    this.rssLayerRects
      .enter()
      .insert("rect")
      .attr("class", "rss");

    // Update
    this.rssLayerRects
      .attr("x", function(rss) {
        if (rss.get('pubDate')) {
          var x = self.chart.timeScale(new Date(rss.get('pubDate')));
          return x;
        } else {
          return 0;
        }
      })
      .attr("width", function(rss) {
        return self.cellSize;
      })
      .attr('fill', function(rss) {
        switch (rss.get('params').id) {
          case "googlenews":
            return 'url(#gnews-image)';
          case "coindesk":
            return 'url(#coindesk-image)';
          default:
            return 'red';
        }
      })
      .attr("height", self.cellSize)
      .attr('opacity', .5)
      .attr('y', function() {
        var y = self.chart.height - 3 * self.cellSize - 5;
        return y;
      })
      .on('mouseover', this.rsstip.show)
      .on('mouseout', this.rsstip.hide);

  };

  NewsLayer.prototype.updateFacebookLayer = function() {
    var self = this;
    console.log('Fbposts layer : ', this.fbposts.models.length);

    if (!this.fbposts.models || !this.fbposts.models.length > 0) {
      this.fbposts.models = [];
    }

    // Draw fb posts
    this.fbLayerRects = this.fbLayer
      .selectAll("rect.fb")
      .data(self.fbposts.models, function(post) {
        return post.get('id');
      });

    // Remove
    this.fbLayerRects
      .exit()
      .transition()
      .duration(100)
      .remove();

    // Enter
    this.fbLayerRects
      .enter()
      .insert("rect")
      .attr("class", "fb");

    // Update
    this.fbLayerRects
      .attr("x", function(post) {
        if (post.get('created_time')) {
          var x = self.chart.timeScale(new Date(post.get('created_time')));
          return x;
        } else {
          return 0;
        }
      })
      .attr("width", function(post) {
        return self.cellSize;
      })
      .attr('fill', function(post) {
        return 'url(#fb-image)';
      })
      .attr("height", self.cellSize)
      .attr('opacity', .5)
      .attr('y', function() {
        var y = self.chart.height - self.cellSize - 1;
        return y;
      })
      .on('mouseover', this.fbtip.show)
      .on('mouseout', this.fbtip.hide);
  };

  NewsLayer.prototype.updateTwitterLayer = function() {
    var self = this;
    console.log('Twitter layer : ', this.tweets.models.length);

    if (!this.tweets.models || !this.tweets.models.length > 0) {
      this.tweets.models = [];
    }

    // Draw tweets
    this.twitterLayerRects = this.twitterLayer
      .selectAll("rect.tweet")
      .data(this.tweets.models, function(tweet) {
        return tweet.get('id');
      });

    // Remove
    this.twitterLayerRects
      .exit()
      .transition()
      .duration(100)
      .remove();

    // Enter
    this.twitterLayerRects
      .enter()
      .insert("rect")
      .attr("class", "tweet");

    // Update
    this.twitterLayerRects
      .attr("x", function(tweet) {
        if (tweet.get('created_at')) {
          var x = self.chart.timeScale(new Date(Date.parse(tweet.get('created_at').replace(/( \+)/, ' UTC$1'))));
          return x;
        } else {
          return 0;
        }
      })
      .attr("width", function(tweet) {
        return self.cellSize;
      })
      .attr('fill', function(volume, i) {
        return 'url(#twitter-image)';
      })
      .attr("height", this.cellSize)
      .attr('opacity', .5)
      .attr('y', function() {
        var y = self.chart.height - 2 * self.cellSize - 3;
        return y;
      })
      .on('mouseover', this.twittertip.show)
      .on('mouseout', this.twittertip.hide);
  };

  NewsLayer.prototype.resize = function() {
    this.volumeYScale.range([this.chart.height, 3 * this.chart.height / 4]);
    this.volumeYAxisInstance
      .transition()
      .duration(defaultDuration)
      .call(this.volumeYAxis);
    this.update();
  };

  NewsLayer.prototype.hide = function() {
    this.isVisible = false;

    this.newsLayer
      .transition()
      .duration(defaultDuration)
      .attr('opacity', 0)
  };

  NewsLayer.prototype.show = function() {
    var self = this;
    this.isVisible = true;

    this.newsLayer
      .transition()
      .duration(defaultDuration)
      .attr('opacity', 1);
  };

  return NewsLayer;

});