define('newsLayer', ['d3', 'd3tip', 'FormatUtils', 'moment'], function(d3, d3tip, FormatUtils) {

  function NewsLayer(chart) {
    var self = this;
    this.chart = chart;
    this.cellSize = 30;

    d3.tip = d3tip;

    var formatTwitterTip = function(d) {
      var twitterTipTpl = "<div><div><img src='<%=user.profile_image_url%>'/></div><div><%=user.name%></div><h3><%=text%></h3></div>";
      return _.template(twitterTipTpl, d);
    };

    var formatRSSTip = function(d) {
      var rssTipTpl = "<div><div><img src='<%=params.logo%>'/></div><div><%=params.name%></div><h3><%=title%></h3><div><%=summary%></div></div>";
      return _.template(rssTipTpl, d);
    };

    var formatFbTip = function(d) {
      d.picture = d.picture || "";
      var fbTipTpl = "<div><div class='right'><img src='<%=picture%>'/></div><div><%=name%></div><h3><%=message%></h3></div>";
      return _.template(fbTipTpl, d);
    };

    this.twittertip = d3.tip()
      .direction('s')
      .offset([10, 0])
      .attr('class', 'd3-tip')
      .style('max-width', '500px')
      .html(formatTwitterTip);

    this.rsstip = d3.tip()
      .direction('s')
      .offset([10, 0])
      .attr('class', 'd3-tip')
      .style('max-width', '500px')
      .html(formatRSSTip);

    this.fbtip = d3.tip()
      .direction('s')
      .offset([10, 0])
      .attr('class', 'd3-tip')
      .style('max-width', '500px')
      .html(formatFbTip);

    this.newsLayer = this.chart.mainLayer
      .append("g")
      .attr("class", "news_layer")
      .call(this.twittertip)
      .call(this.rsstip)
      .call(this.fbtip);

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
      .range([0, this.chart.height / 4]);

    this.twitterLayer = this.newsLayer
      .append('g')
      .attr('class', 'news_twitter_layer');

    this.fbLayer = this.newsLayer
      .append('g')
      .attr('class', 'news_fb_layer');

    this.rssLayer = this.newsLayer
      .append('g')
      .attr('class', 'news_rss_layer');

  };

  NewsLayer.prototype.draw = function(params) {
    this.params = params;
    this.update();
  };

  NewsLayer.prototype.update = function(params) {
    var self = this;
    this.news = this.chart.models.news;

    if (this.news) {
      // Draw tweets
      this.twitterLayerRects = this.twitterLayer
        .selectAll("rect.tweet")
        .data(this.news.twitter, function(tweet) {
          return tweet.id;
        });

      // Update
      this.twitterLayerRects
        .enter()
        .insert("rect")
        .attr("class", "tweet")
        .attr("x", function(tweet) {
          if (tweet.created_at) {
            var x = self.chart.timeScale(new Date(Date.parse(tweet.created_at.replace(/( \+)/, ' UTC$1'))));
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
        .attr("height", self.cellSize)
        .attr('opacity', .5)
        .attr('y', this.cellSize)
        .on('mouseover', this.twittertip.show)
        .on('mouseout', this.twittertip.hide);

      // Draw fb posts
      this.fbLayerRects = this.fbLayer
        .selectAll("rect.fb")
        .data(self.news.facebook, function(post) {
          return post.id;
        });

      // Update
      this.fbLayerRects
        .enter()
        .insert("rect")
        .attr("class", "fb")
        .attr("x", function(post) {
          if (post.created_time) {
            var x = self.chart.timeScale(new Date(post.created_time));
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
        .attr('y', 2 * self.cellSize + 5)
        .on('mouseover', this.fbtip.show)
        .on('mouseout', this.fbtip.hide);


      this.rssLayerRects = this.rssLayer
        .selectAll("rect.rss")
        .data(self.news.rss, function(rss) {
          return rss.id;
        });

      // Update
      this.rssLayerRects
        .enter()
        .insert("rect")
        .attr("class", "rss")
        .attr("x", function(rss) {
          if (rss.pubDate) {
            var x = self.chart.timeScale(new Date(rss.pubDate));
            return x;
          } else {
            return 0;
          }
        })
        .attr("width", function(rss) {
          return self.cellSize;
        })
        .attr('fill', function(rss) {
          switch (rss.params.id) {
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
        .attr('y', 3 * self.cellSize + 10)
        .on('mouseover', this.rsstip.show)
        .on('mouseout', this.rsstip.hide);

    }
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
    this.volumeBarChart
      .transition()
      .duration(defaultDuration)
      .attr("height", 0)
      .attr('y', this.chart.height)

    this.NewsLayer
      .transition()
      .duration(defaultDuration)
      .attr('opacity', 0)
  };

  NewsLayer.prototype.show = function() {
    var self = this;
    this.isVisible = true;

    this.volumeBarChart
      .transition()
      .duration(defaultDuration)
      .attr("height", function(d) {
        var height = self.chart.height - self.volumeYScale(d.amount);
        return height >= 0 ? height : 0;
      })
      .attr('y', function(d) {
        return d.amount == 0 ? self.chart.height : self.volumeYScale(d.amount);
      });

    this.NewsLayer
      .transition()
      .duration(defaultDuration)
      .attr('opacity', 1)
  };

  NewsLayer.prototype.updateTooltip = function(date) {
    var self = this;

    var finclosestVolume = function(date) {
      var pointIndex = (self.closestPoint && self.closestPoint.index) || 0;
      var closestPoint = self.volumeBarChart[pointIndex];
      var barCount = self.volumeBarChart.size()
      self.volumeBarChart.each(function(barVolume, index) {
        if (index == 0 && date <= barVolume.startDate) {
          pointIndex = index;
          closestPoint = barVolume;
        }
        if (index == barCount - 1 && date >= barVolume.endDate) {
          pointIndex = index;
          closestPoint = barVolume;
        }
        if (barVolume.startDate <= date && barVolume.endDate >= date) {
          pointIndex = index;
          closestPoint = barVolume;
        }
      });
      return {
        index: pointIndex,
        candle: closestPoint
      };
    };

    this.closestPoint = finclosestVolume(date);

    if (this.closestPoint) {
      var left = 0;
      var top = 0;
      this.volumeBarChart
        .transition()
        .duration(100)
        .attr('opacity', function(d, i) {
          if (i == self.closestPoint.index) {
            left = d3.select(this).attr('x');
            top = d3.select(this).attr('y');
            return 1;
          } else {
            return 0.5;
          }
        });

      this.volumeLabel
        .attr('opacity', 1)
        .style("text-anchor", "middle")
        .attr('x', +left + 5)
        .attr('y', +top - 15)
        .text(FormatUtils.formatValue(this.closestPoint.candle.amount, 0));
    }
  };

  NewsLayer.prototype.mouseout = function() {
    this.volumeBarChart
      .transition()
      .duration(100)
      .attr('opacity', 0.5);

    this.volumeLabel
      .transition()
      .duration(100)
      .attr('opacity', 0);
  };

  NewsLayer.prototype.mouseover = function() {};

  return NewsLayer;

});