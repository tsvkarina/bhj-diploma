/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {

  onSubmit(data) {
    User.login(data, (response) => {
      if (response.success) {

        this.element.reset();

        App.setState('user-logged');

        const modal = this.element.closest('.modal');
        if (modal) {
          Modal.close(modal);
        }
      } else {
        console.error(response.error || 'Ошибка авторизации');
      }
    });
  }
}

export default LoginForm;
