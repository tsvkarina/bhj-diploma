/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  
  constructor(element) {
    if (!element) {
      throw new Error("Element is required");
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const createAccountButton = this.element.querySelector('.create-account');
    createAccountButton.addEventListener('click', () => {
      App.getModal('newAccount').open();
    });

    this.element.addEventListener('click', (event) => {
      const accountElement = event.target.closest('.account');
      if (accountElement) {
        this.onSelectAccount(accountElement);
      }
    });
  }

 update() {
    if (User.current()) {
      Account.list({}, (response) => {
        if (response.error) {
          console.error("Failed to fetch accounts:", response.error);
        } else {
          this.clear();
          response.data.forEach(account => this.renderItem(account));
        }
      });
    }
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach(account => account.remove());
  }

  onSelectAccount(element) {
    const activeAccount = this.element.querySelector('.account.active');
    if (activeAccount) {
      activeAccount.classList.remove('active');
    }
    element.classList.add('active');

    const accountId = element.dataset.id;
    App.showPage('transactions', { account_id: accountId });
  }

  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> /
          <span>${item.sum.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}</span>
        </a>
      </li>
    `;
  }

  renderItem(data) {
    const html = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeend', html);
  }
}
