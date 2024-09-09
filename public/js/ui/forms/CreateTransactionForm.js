/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        const accountsSelect = this.element.querySelector('.accounts-select');

        const optionsHTML = response.data.reduce((html, account) => {
          return html + `<option value="${account.id}">${account.name}</option>`;
        }, '');
        
        accountsSelect.innerHTML = optionsHTML;
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal(this.element.closest('.modal')).close();
        App.update();
      }
    });
  }
}
