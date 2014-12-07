// Generated by CoffeeScript 1.8.0
var focusOnSearch, updateQueue;

$(document).on('emoji:ready', function() {
  var clip;
  $(".input-search").focus();
  $(".loading").remove();
  if (navigator.userAgent.match(/iPad|iPhone/i)) {
    return $(document).on('click', '.emoji-code, .queue', function() {
      this.selectionStart = 0;
      return this.selectionEnd = this.value.length;
    });
  } else {
    clip = new ZeroClipboard($("[data-clipboard-text]"), {
      moviePath: "/assets/zeroclipboard.swf"
    });
    clip.on("complete", function(_, args) {
      return $("<div class=alert></div>").text("Copied " + args.text).appendTo("body").fadeIn().delay(1000).fadeOut();
    });
    return $(".emoji-code").attr("readonly", "readonly");
  }
});

focusOnSearch = function(e) {
  var t;
  if (e.keyCode === 191 && !$(".input-search:focus").length) {
    $(".input-search").focus();
    t = $(".input-search").get(0);
    if (t.value.length) {
      t.selectionStart = 0;
      t.selectionEnd = t.value.length;
    }
    return false;
  }
};

$.getJSON('emojis.json', function(emojis) {
  var container, i;
  container = $('.emojis-container');
  i = 0;
  return $.each(emojis, function(name, keywords) {
    i++;
    container.append("<li class='result emoji-wrapper'><div class='emoji s_" + (name.replace(/\+/, '')) + "' title='" + name + "'>" + name + "</div> <input type='text' class='autofocus plain emoji-code' value=':" + name + ":' data-clipboard-text=':" + name + ":' /> <span class='keywords'>" + name + " " + keywords + "</span> </li>");
    if (Object.keys(emojis).length === i) {
      return $(document).trigger('emoji:ready');
    }
  });
});

$(document).keydown(function(e) {
  return focusOnSearch(e);
});

$(document).on('keydown', '.emoji-wrapper input', function(e) {
  $(".input-search").blur();
  return focusOnSearch(e);
});

$(document).on('click', '[data-clipboard-text]', function() {
  return ga('send', 'event', 'copy', $(this).attr('data-clipboard-text'));
});

$(document).on('click', '.js-queue-all', function() {
  $("li:visible .emoji").click();
  return false;
});

$(document).on('click', '.js-hide-text', function() {
  $("ul").toggleClass("hide-text");
  return false;
});

$(document).on('click', '.story .emoji', function(e) {
  $(this).remove();
  updateQueue();
  return false;
});

$(document).on("click", ".list .emoji", function(e) {
  $(this).clone().appendTo(".story");
  updateQueue();
  return false;
});

$(document).on('click', '.label.active', function() {
  location.hash = "";
  return false;
});

$(document).on('click', '.js-clear-queue', function() {
  $(".story .emoji").remove();
  updateQueue();
  return false;
});

$(document).on('click', '.js-contribute', function() {
  return ga('send', 'event', 'contribute', 'click');
});

updateQueue = function() {
  var val;
  val = $.map($(".story .emoji"), function(e) {
    return ":" + $(e).attr("title") + ":";
  }).join("");
  $(".js-copy-queue").attr("data-clipboard-text", val);
  return $(".story").toggleClass("queued", !!$(".story .emoji").length);
};
