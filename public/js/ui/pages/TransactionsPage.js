/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  
  constructor(element) {
    if (!element) {
      throw new Error("Element не передан");
    }
    this.element = element;
    this.registerEvents();
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {
    this.element.addEventListener("click", (e) => {
      if (e.target.closest(".remove-account")) {
        this.removeAccount();
      } else if (e.target.closest(".transaction__remove")) {
        const id = e.target.closest(".transaction__remove").dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  removeAccount() {
    if (!this.lastOptions) return;

    const confirmation = confirm("Вы действительно хотите удалить счёт?");
    if (confirmation) {
      Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
        if (response && response.success) {
          this.clear();
          App.updateWidgets();
          App.updateForms();
        }
      });
    }
  }

  removeTransaction(id) {
    const confirmation = confirm("Вы действительно хотите удалить эту транзакцию?");
    if (confirmation) {
      Transaction.remove({ id }, (err, response) => {
        if (response && response.success) {
          this.update();
          App.updateWidgets();
        }
      });
    }
  }

  render(options) {
    if (!options) return;

    this.lastOptions = options;

    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list({ account_id: options.account_id }, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  renderTitle(name) {
    const title = this.element.querySelector(".content-title");
    title.textContent = name;
  }

  formatDate(date) {
    const d = new Date(date);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return d.toLocaleDateString('ru-RU', options).replace(",", " в");
  }

  getTransactionHTML(item) {
    const typeClass = item.type === 'income' ? 'transaction_income' : 'transaction_expense';
    const formattedDate = this.formatDate(item.created_at);

    return `
      <div class="transaction ${typeClass} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${formattedDate}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>
    `;
  }

renderTransactions(data) {
  const content = this.element.querySelector(".content");

  const transactionsHTML = data.reduce((html, item) => {
    return html + this.getTransactionHTML(item);
  }, '');

  content.innerHTML = transactionsHTML;
}
