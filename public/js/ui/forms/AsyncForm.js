/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  constructor(element) {
    if (!element || !(element instanceof HTMLFormElement)) {
      throw new Error('Invalid form element provided to AsyncForm constructor.');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    return data;
  }

  onSubmit(options) {
  }

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}

const form = document.getElementById('myform');
const asyncForm = new MyForm(form);
