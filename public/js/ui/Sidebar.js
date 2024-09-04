/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initAuthLinks() {
    const registerButton = document.querySelector('.sidebar-register');
    if (registerButton) {
      registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modalRegister = App.getModal('register');
        if (modalRegister) {
          modalRegister.open();
        }
      });
    }

    const loginButton = document.querySelector('.sidebar-login');
    if (loginButton) {
      loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modalLogin = App.getModal('login');
        if (modalLogin) {
          modalLogin.open();
        }
      });
    }

    const logoutButton = document.querySelector('.sidebar-logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await User.logout();
        if (response.success) {
          App.setState('init');
        }
      });
    }
  }

  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');

    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();

        const body = document.querySelector('body');

        if (body.classList.contains('sidebar-open')) {
          body.classList.remove('sidebar-open');
          body.classList.add('sidebar-collapse');
        } else {
          body.classList.remove('sidebar-collapse');
          body.classList.add('sidebar-open');
        }
      });
    }
  }
}
