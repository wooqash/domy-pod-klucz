import IMask from "imask";

type FormData = {
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  formType: string | undefined;
  offerType: string | undefined;
  message: string | undefined;
  recaptchaToken: unknown;
};

type errorTypes = {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  minHeight?: string;
  maxHeight?: string;
  step?: string;
  email?: string;
  url?: string;
};

const messages: Record<string, string> = {
  success: "🎉 Formularz został wysłany! 🎉",
  failed: "⛔ Mamy jakiś problem, niestety formularz nie został wysłany!",
  serverError: "⛔ Błąd połączenia z serwerem ⛔",
};

const errorMessages: Record<string, errorTypes> = {
  name: { required: "Pole 'Imię i nazwisko' jest obowiązkowe!" },
  email: { required: "Pole 'Email' jest obowiązkowe!" },
  phone: { required: "Pole 'Telefon' jest obowiązkowe!" },
  message: { required: "Pole 'Wiadomość' jest obowiązkowe!" },
};

export const initForms = () => {
  createForm("contactForm");
  createForm("offerForm");
};

export const createForm = (formId: string) => {
  const form: HTMLFormElement | null = document.querySelector(`#${formId}`);

  if (!form) {
    return;
  }
  const submitBtn: HTMLButtonElement | null = document.querySelector(
    `#${formId} button[type=submit]`
  );
  const formMessage: HTMLElement | null = document.querySelector(
    `#${formId}Container .form-msg`
  );
  const errorControls: NodeListOf<HTMLParagraphElement> | null =
    document.querySelectorAll(`#${formId} .error-msg`);
  const formControls: NodeListOf<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  > = document.querySelectorAll(`#${formId} .form-control`);
  const inputs = Array.from(formControls);
  const errors = Array.from(errorControls);
  const phoneInput = inputs.find(input => input.name === "phone");
  const phoneMaskOptions = {
    mask: "+{00} 000-00[0-0]00",
  };

  if (phoneInput) {
    IMask(phoneInput, phoneMaskOptions);
  }

  form?.addEventListener("submit", async e => {
    e.preventDefault();
    clearErrors();
    const inputMap = inputs.map(input => [input.name, input.value?.trim()]);
    const inputsData = Object.fromEntries(inputMap);
    const formData: FormData = {
      ...inputsData,
      formType: formId,
      offerType:
        formId === "offerForm"
          ? document.querySelector(".offer-type")?.textContent
          : "",
      recaptchaToken: await getRecaptchaToken(),
    };

    if (form.checkValidity()) {
      submitForm(formData);
    }
  });

  function handleInvalid(event: Event) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const index = target ? inputs.indexOf(target) : -1;
    const errorElement = errors[index] || null;
    const errorRequiredMessage = target.name
      ? errorMessages[target.name].required
      : null;

    if (!target.value && errorRequiredMessage) {
      target.setCustomValidity(errorRequiredMessage);
    }

    if (errorElement) {
      errorElement.textContent = target.validationMessage;
    }
  }

  function handleInput(event: Event) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const index = target ? inputs.indexOf(target) : -1;
    const errorElement = errors[index] || null;

    if (target.value) {
      target.setCustomValidity("");
    }
    if (errorElement) {
      errorElement.textContent = "";
    }
    target.checkValidity();
  }

  async function getRecaptchaToken() {
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    return new Promise(resolve => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(recaptchaSiteKey, {
            action: "submit",
          })
          .then(token => resolve(token));
      });
    });
  }

  async function submitForm(data: FormData) {
    submitBtn?.classList.add("loading");
    submitBtn?.setAttribute("disabled", "disabled");
    try {
      const response = await fetch("../php/send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        showMessage(messages.success, "success");
        form?.reset();
      } else {
        showMessage(
          `${messages.failed}: (${result.error} || "Nieznany błąd")`,
          "error"
        );
      }
    } catch (error) {
      showMessage(messages.serverError, "error");
      console.error(error);
    }
    submitBtn?.classList.remove("loading");
    submitBtn?.removeAttribute("disabled");
  }

  function clearErrors() {
    if (errorControls) {
      Array.from(errorControls).forEach(el => {
        el.textContent = "";
      });
    }
  }

  function showMessage(message: string, color: string) {
    if (formMessage) {
      formMessage.textContent = message;
      formMessage.classList.add(color);
      formMessage.classList.remove("hidden");
    }
  }

  inputs.forEach(input => {
    input.addEventListener("invalid", handleInvalid);
    input.addEventListener("input", handleInput);
  });
};
