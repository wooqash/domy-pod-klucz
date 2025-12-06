export const protectInfo = () => {
  // const user1 = "biuro";
  const user = "kontakt";
  const domain = "domypodklucz";
  const tld = "pl";
  const phoneNumb1 = "+48 697 855 332";
  // Złożenie adresu

  // const emailAddress1 = user1 + "@" + domain + "." + tld;
  const emailAddress1 = user + "@" + domain + "." + tld;
  // Wyświetlenie jako klikalny link

  // const emails1 = document.querySelectorAll(".email-1");
  const email1 = document.querySelectorAll(".email-1");

  const phone1 = document.querySelectorAll(".phone-1");

  Array.from(email1).forEach(email => {
    const text = email.textContent || emailAddress1;
    return (email.innerHTML =
      '<a href="mailto:' +
      emailAddress1 +
      '" class="hover-underline">' +
      text +
      "</a>");
  });

  Array.from(phone1).forEach(phone => {
    const text = phone.textContent || phoneNumb1;
    return (phone.innerHTML =
      '<a href="callto:' +
      phoneNumb1.replaceAll(" ", "") +
      '" class="hover-underline">' +
      text +
      "</a>");
  });
};

export const copyrightDate = (): void => {
  const startYear = 2017;
  const presentYear = new Date().getFullYear();
  const copyrightDate = document.getElementById("copyright-date");

  if (!copyrightDate) {
    return;
  }

  if (startYear === presentYear) {
    copyrightDate.innerText = startYear + "";
  } else {
    copyrightDate.innerText = `${startYear} - ${presentYear}`;
  }
};
