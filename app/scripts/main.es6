$(function() {
  let History = window.History;
  let loading = false;
  if (!History.enabled) {
    return false;
  }
  let $ajaxContainer = $('#ajax-container');
  History.Adapter.bind(window, 'statechange', () => {
    let State = History.getState();
    $.get(State.url, result => {
      let $html = $(result);
      let $newContent = $('#ajax-container', $html).contents();
      document.title = $html.filter('title').text();

      $ajaxContainer.fadeOut(500, () => {
        $ajaxContainer.html($newContent);
        $ajaxContainer.fadeIn();
        loading = false;
        NProgress.done();
      })
    });
  });

  $('body').on('click', '.js-ajax-links', function(e) {
    e.preventDefault();
    if (loading === false) {
      let url = $(this).attr('href');
      let currentState = History.getState();
      let title = $(this).attr('title') || ' ';
      url = _M.getAbsoluteUrl(url);
      if (url.replace(/\/$/, '') !== currentState.url.replace(/\/$/, '')) {
        loading = true;
        NProgress.start();
        History.pushState({}, title, url);
      }
    }

  });
});
