/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */
class UserWidget {

  constructor(element) {
    if (!element) {
      throw new Error('Передан пустой элемент в UserWidget');
    }

    this.element = element;
  }

  update() {
    const currentUser = User.current();

    if (currentUser) {
      const userNameElement = this.element.querySelector('.user-name');
      if (userNameElement) {
        userNameElement.textContent = currentUser.name;
      }
    }
  }
}
