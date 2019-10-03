class UI {
  constructor(preloader, videoSwitch, videoItem) {
    this.preloader = preloader;
    this.videoSwitch = videoSwitch;
    this.videoItem = videoItem;
  }

  signUp() {
    const drinkName = document.querySelector(".input-name").value;
    const drinkLName = document.querySelector(".input-lastname").value;
    const drinkEmail = document.querySelector(".input-email").value;

    if (drinkName === "" || drinkLName === "" || drinkEmail === "") {
      this.showFeedback("please enter all areas", "error");
    } else {
      this.showFeedback("Your free drink is waiting", "success");
      const customer = new Customer(drinkName, drinkLName, drinkEmail);
      customer.addPerson();
    }

    document.querySelector(".input-name").value = "";
    document.querySelector(".input-lastname").value = "";
    document.querySelector(".input-email").value = "";
  }

  showFeedback(text, classVal) {
    document.querySelector(".drink-form__feedback").classList.add(classVal);
    document.querySelector(".drink-form__feedback").textContent = text;

    setTimeout(() => {
      document
        .querySelector(".drink-form__feedback")
        .classList.remove(classVal);
      document.querySelector(".drink-form__feedback").textContent = "";
    }, 3000);
  }

  removePreloader() {
    setTimeout(() => {
      this.preloader.classList.add("active");
    }, 1000);
  }

  addNavbar() {
    const navbar = document.querySelector(".nav");
    navbar.classList.toggle("active");
    navbar.classList.toggle("appear");
  }

  startStopVideo() {
    if (this.videoItem.paused == true) {
      this.videoItem.play();
      document.querySelector(".video__switch-btn").classList.remove("active");
    } else {
      this.videoItem.pause();
      document.querySelector(".video__switch-btn").classList.add("active");
    }
  }

  showModal(data) {
    const modal = document.querySelector("#modal");
    modal.className = "work-modal--show";
    const modalImg = document.querySelector(".work-modal__item");
    modalImg.style.background = `url("./img/work-${data}.jpeg") center/cover`;
  }

  closeModal() {
    const modal = document.querySelector("#modal");
    modal.className = "work-modal";
  }
}

class Customer {
  constructor(name, lname, email) {
    this.name = name;
    this.lname = lname;
    this.email = email;
  }

  addPerson() {
    let random = Math.floor(Math.random() * 4);
    const list = document.querySelector(".drink-card__list");
    const div = document.createElement("div");
    div.classList.add("person");
    div.innerHTML = `<img
                src="img/person-${random}.jpeg"
                alt="person"
                class="person__thumbnail"
              />
              <h4 class="person__name">${this.name}</h4>
              <h4 class="person__last-name">${this.lname}</h4>`;
    list.appendChild(div);
  }
}

function eventListeners() {
  const preloader = document.querySelector(".preloader");

  const navBtn = document.querySelector(".navBtn");
  const videoSwitch = document.querySelector(".video__switch");
  const videoItem = document.querySelector(".video__item");
  const form = document.querySelector("form");

  const ui = new UI(preloader, videoSwitch, videoItem);

  window.addEventListener("load", function() {
    ui.removePreloader();
  });

  navBtn.addEventListener("click", function() {
    ui.addNavbar();
  });

  videoSwitch.addEventListener("click", function() {
    ui.startStopVideo();
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    ui.signUp();
  });

  document.querySelectorAll(".work-item__icon").forEach(function(icon) {
    icon.addEventListener("click", function(e) {
      e.preventDefault();
      let data = icon.dataset.id;
      ui.showModal(data);
    });
  });

  document
    .querySelector(".work-modal__close")
    .addEventListener("click", function(e) {
      e.preventDefault();
      ui.closeModal();
    });
}

console.log(document.querySelector(".work-item__icon").children);
eventListeners();
