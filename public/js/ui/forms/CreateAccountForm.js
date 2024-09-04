/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {

  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {

        App.getModal('createAccount').close();
        
        App.update();
        
        this.element.reset();
      } else {
        console.error(err || response.error);
      }
    });
  }
}
