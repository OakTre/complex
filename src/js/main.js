// eslint-disable-next-line import/no-extraneous-dependencies
import 'focus-visible';
import lazyIMages from './modules/lazyIMages';
import documenReady from './helpers/documenReady';
import initModal from './modules/initModal';
import validation from './modules/validation';
import openMenu from './modules/openMenu';
import contacts from './modules/contacts';

documenReady(() => {
  window.___YOUR_PROJECT___API = { };

  lazyIMages();
  initModal();
  validation();
  openMenu();
  contacts();
});
