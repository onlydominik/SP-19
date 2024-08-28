let labels = document.querySelectorAll("label");
let inputs = document.querySelectorAll("input");
let form;
const validate = (form) => {
  form = document.querySelector(form);
  const validationOptions = [
    {
      attribute: "data-validDay",
      isValid: (input) =>
        !isNaN(parseInt(input.value, 10)) && input.value <= 31,
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "data-validMonth",
      isValid: (input) =>
        !isNaN(parseInt(input.value, 10)) && input.value <= 12,
      errorMessage: (input) => input.dataset.err,
    },

    {
      attribute: "data-validYear",
      isValid: (input) =>
        !isNaN(parseInt(input.value, 10)) && input.value <= moment().year(),
      errorMessage: (input) => input.dataset.err,
    },
  ];

  const validateInvalid = () => {
    inputs.forEach((input) => {
      for (const option of validationOptions) {
        if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
          input.classList.add("input-invalid");
          input.parentElement.classList.add("label-invalid");
          input.nextElementSibling.textContent = option.errorMessage(input);
          resetDisplayValues();
          err.push(true);
        }
      }
    });
  };

  const validateNotExist = () => {
    labels.forEach((elem) => {
      elem.querySelector("input").classList.add("input-invalid");
      elem.classList.add("label-invalid");
    });
    document.querySelector("label p").textContent = "Must be a valid date";
    resetDisplayValues();
  };

  const validateEmpty = (elem) => {
    if (!elem.querySelector("input").value) {
      elem.querySelector("p").textContent = "This field is required";
      elem.querySelector("input").classList.add("input-invalid");
      elem.classList.add("label-invalid");
      resetDisplayValues();
      err.push(true);
    } else {
      elem.querySelector("p").textContent = "";
      elem.querySelector("input").classList.remove("input-invalid");
      elem.classList.remove("label-invalid");
    }
  };

  inputs.forEach((elem) => {
    elem.addEventListener("blur", () => {
      validateEmpty(elem.parentElement);
    });
  });
  let err = [];
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    labels.forEach((elem) => {
      validateEmpty(elem);
    });

    if (!err.includes(true)) {
      err = [];
      validateInvalid();
    }

    if (!err.includes(true)) displayDate();

    err = [];
    return;
  });

  const displayDate = () => {
    let inputDay = document.querySelector("#day").value;
    let inputMonth = document.querySelector("#month").value;
    inputMonth = parseInt(inputMonth, 10) - 1;
    let inputYear = document.querySelector("#year").value;
    let inputDate = moment([inputYear, inputMonth, inputDay]);
    let diff = moment.preciseDiff(inputDate, moment(), true);

    if (isNaN(diff["years"])) {
      validateNotExist();
      return;
    }

    document.querySelector(
      ".calculator__results p:nth-child(1) strong"
    ).textContent = diff["years"];
    document.querySelector(
      ".calculator__results p:nth-child(2) strong"
    ).textContent = diff["months"];
    document.querySelector(
      ".calculator__results p:nth-child(3) strong"
    ).textContent = diff["days"];
  };

  const resetDisplayValues = () => {
    document.querySelector(
      ".calculator__results p:nth-child(1) strong"
    ).textContent = "--";
    document.querySelector(
      ".calculator__results p:nth-child(2) strong"
    ).textContent = "--";
    document.querySelector(
      ".calculator__results p:nth-child(3) strong"
    ).textContent = "--";
  };
};

validate("#calculatorForm");
