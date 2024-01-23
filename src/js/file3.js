$(function () {
  $(document).on('contextmenu', function (e) {
    return false;
  });
  $('img').mousedown(
    function (e) {
      e.preventDefault();
    });
  $('img').mouseup(
    function (e) {
      e.preventDefault();
    });
});