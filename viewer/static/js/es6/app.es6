import Loader from './loader';

window.loadHandler = new Loader();

$(document).ready(() => {
  const timeout = 0;
  // Load everything
  setTimeout(() => {
    window.loadHandler.createViews();
    window.loadHandler.initPage(document.body.id);
  }, timeout);
});
