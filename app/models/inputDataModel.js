class InputDataModel {
  static input = [];
  static failed = [];

  static getInput() {
    return this.input;
  }

  static getFailed() {
    return this.failed;
  }

  static setInput() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set the time to 00:00:00:000 (midnight)

    const localStorageInput = [];
    //localStorage.clear("todo2");

    // store failed tasks in failed array from localeStorege
    JSON.parse(localStorage.getItem("todo2")) &&
      this.failed.unshift(...JSON.parse(localStorage.getItem("todo2")));

    //localStorage.clear("todo");
    // store  tasks in localStorageInput array from localeStorege
    JSON.parse(localStorage.getItem("todo")) &&
      localStorageInput.unshift(...JSON.parse(localStorage.getItem("todo")));

    if (localStorageInput) {
      //Check if the task's time has expired and put that task in faild arrays
      const filteredFailed = localStorageInput.filter(function (task) {
        return new Date(task.date).getTime() < today.getTime();
      });
      filteredFailed && this.failed.unshift(...filteredFailed);
      localStorage.setItem("todo2", JSON.stringify(this.failed));

      //Filter tasks that have not yet expired and put them in an input array.
      const filteredInput = localStorageInput.filter(function (task) {
        return new Date(task.date).getTime() >= today.getTime();
      });
      filteredInput && this.input.unshift(...filteredInput);
      localStorage.setItem("todo", JSON.stringify(this.input));
    }
  }

  static pushInput(input) {
    this.input.unshift(input); // add input to the beginning of the array
  }
}

export default InputDataModel;