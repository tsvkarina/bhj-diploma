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
        
   const modalLogin = App.getModal('login');
        if (modalLogin) {
          modalLogin.close();
        }
      } else {
        console.error(response.error || 'Ошибка авторизации');
      }
    });
  }
}

export default LoginForm;
