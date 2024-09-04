/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {

  onSubmit(data) {
    User.register(data, (response) => {
      if (response.success) {

        this.element.reset();

        App.setState('user-logged');

        const modal = this.element.closest('.modal');
        if (modal) {
          Modal.close(modal);
        }
      } else {
        console.error(response.error || 'Ошибка регистрации');
      }
    });
  }
}

export default RegisterForm;
