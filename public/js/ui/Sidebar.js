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

  static initAuthLinks() {
  }
}
