main = document.getElementById("main");
navBar = document.getElementById("NavBar");
display = document.getElementById("display");
logout = document.getElementById("logout");
title = document.getElementById("title");
login = document.getElementById("Login");
clientInfo = {};

// make a function that makes the following addEventListener, call it on need to remake
function loginMaker() {
  login.addEventListener("click", function () {
    var usrnam = document.getElementById("text-box")["value"];
    var passy = document.getElementById("passy")["value"]; // required me to not have password field
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ UserName: usrnam, Password: passy })
    }).then((res) => res.json())
      .then(function (data) {
        clientInfo = data;
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        switch (clientInfo.role) {
          case 3:
            userViewMaker();
            break;
          case 2:
            FMViewMaker();
            break;
          case 1:
            adminViewMaker();
            break;
        }
      })
      .catch((err) => console.log(err));

    /*.then(function (data) {
        
        console.log(body);
        
        console.log("Request success: ", data);
      })
      .catch(function (error) {
        console.log("Request failure: ", error);
        console.log("Bad Input");
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        var reject = document.createElement("p");
        reject.innerText = "Bad Input.";
        display.appendChild(reject);
      });*/
  });
  /*switch (usrnam) {
    case "User":
      while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        userViewMaker();
        break;
    case "FM":
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      FMViewMaker();
      break;
    case "Admin":
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      adminViewMaker();
      break;
    default:
      console.log("Bad Input");
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      var reject = document.createElement("p");
      reject.innerText = "Bad Input.";
      display.appendChild(reject);
      break;*/
}

loginMaker();

logout.addEventListener("click", function () {
  // clear body
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  // remake login
  var introPara = document.createElement("p");
  introPara.innerText = "Please login.";
  main.appendChild(introPara);
  var username = document.createElement("input");
  username.setAttribute("id", "text-box");
  username.setAttribute("type", "text");
  username.setAttribute("placeholder", "Username");
  main.appendChild(username);
  var password = document.createElement("input");
  password.setAttribute("id", "passy");
  password.setAttribute("type", "password");
  password.setAttribute("placeholder", "Password");
  main.appendChild(password);
  var newlog = document.createElement("input");
  newlog.setAttribute("type", "submit");
  newlog.setAttribute("id", "Login");
  main.appendChild(newlog);
  login = document.getElementById("Login");
  loginMaker();
  console.log("I finished logging out");
  // re-hide logout
});

function userViewMaker() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  var user = document.createElement("button");
  user.setAttribute("id", "UserInfo");
  user.innerText = "Your Information";
  navBar.appendChild(user);
  var submitReim = document.createElement("button");
  submitReim.setAttribute("id", "submitReim");
  submitReim.innerText = "Submit Reimbursement";
  navBar.appendChild(submitReim);
  main.innerText = `Welcome ${clientInfo.firstName}, please select an option from the nav bar`;

  user.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    main.innerText =
      "In the display port is your information at this company, User.";
    display.innerText = "I should have some information, or something.";
  });

  submitReim.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    /* var postReim = document.createElement('form');
        main.appendChild(postReim);
        form forces page restart, not ideal for a one page app*/

    var amount = document.createElement("input");
    amount.setAttribute("id", "amount");
    amount.setAttribute("type", "number");
    amount.setAttribute("placeholder", "123.45");
    main.appendChild(amount);
    var description = document.createElement("input");
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    description.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(description);

    // rType should be a drop-menu list selector
    var rType = document.createElement("input");
    rType.setAttribute("id", "rType");
    rType.setAttribute("type", "text");
    rType.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(rType);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      display.innerText = "I display the resulting reimbursement here!";
    });
  });
}

function FMViewMaker() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  var user = document.createElement("button");
  user.setAttribute("id", "UserInfo");
  user.innerText = "Search By UserID";
  navBar.appendChild(user);

  var submitReim = document.createElement("button");
  submitReim.setAttribute("id", "submitReim");
  submitReim.innerText = "Submit Reimbursement";
  navBar.appendChild(submitReim);

  var upd8Reim = document.createElement("button");
  upd8Reim.setAttribute("id", "upd8Reim");
  upd8Reim.innerText = "Update Reimbursement";
  navBar.appendChild(upd8Reim);

  var searchAllReimS = document.createElement("button");
  searchAllReimS.setAttribute("id", "searchAllReim");
  searchAllReimS.innerText = "Search By Status";
  navBar.appendChild(searchAllReimS);

  main.innerText = `Welcome ${clientInfo.firstName}, please select an option from the nav bar`;

  user.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    var userId = document.createElement("input");
    userId.setAttribute("id", "userId");
    userId.setAttribute("type", "number");
    userId.setAttribute("placeholder", "1");
    main.appendChild(userId);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      display.innerText = "I display the resulting user here!";
    });
  });

  submitReim.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    /* var postReim = document.createElement('form');
        main.appendChild(postReim);
        form forces page restart, not ideal for a one page app*/

    var amount = document.createElement("input");
    amount.setAttribute("id", "amount");
    amount.setAttribute("type", "number");
    amount.setAttribute("placeholder", "123.45");
    main.appendChild(amount);
    var description = document.createElement("input");
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    description.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(description);

    // rType should be a drop-menu list selector
    var rType = document.createElement("input");
    rType.setAttribute("id", "rType");
    rType.setAttribute("type", "text");
    rType.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(rType);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      display.innerText = "I display the resulting reimbursement here!";
    });
  });

  upd8Reim.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    var amount = document.createElement("input");
    amount.setAttribute("id", "amount");
    amount.setAttribute("type", "number");
    amount.setAttribute("placeholder", "123.45");
    main.appendChild(amount);
    var description = document.createElement("input");
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    description.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(description);

    // rType and rStatus should be a drop-menu list selector
    var rType = document.createElement("input");
    rType.setAttribute("id", "rType");
    rType.setAttribute("type", "text");
    rType.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(rType);
    var rStatus = document.createElement("input");
    rStatus.setAttribute("id", "rStatus");
    rStatus.setAttribute("type", "text");
    rStatus.setAttribute("placeholder", "Reimbursement Current Status.");
    main.appendChild(rStatus);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      console.log("The submission ran!");
      display.innerText = "I display the resulting reimbursement here!";
    });
  });

  searchAllReimS.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    var input = document.createElement("input");
    input.setAttribute("id", "input");
    // drop down menu for this one
    input.setAttribute("type", "number");
    main.appendChild(input);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      display.innerText = "I display the resulting list here!";
    });
  });
}

function adminViewMaker() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  var user = document.createElement("button");
  user.setAttribute("id", "UserInfo");
  user.innerText = "Your Information";
  navBar.appendChild(user);

  var submitReim = document.createElement("button");
  submitReim.setAttribute("id", "submitReim");
  submitReim.innerText = "Submit Reimbursement";
  navBar.appendChild(submitReim);

  var userUpd8 = document.createElement("button");
  userUpd8.setAttribute("id", "userUpd8");
  userUpd8.innerText = "Update User";
  navBar.appendChild(userUpd8);

  main.innerText = `Welcome ${clientInfo.firstName}, please select an option from the nav bar`;

  user.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    main.innerText =
      "In the display port is your information at this company, User.";
    display.innerText = "I should have some information, or something.";
  });

  submitReim.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    /* var postReim = document.createElement('form');
        main.appendChild(postReim);
        form forces page restart, not ideal for a one page app*/

    var amount = document.createElement("input");
    amount.setAttribute("id", "amount");
    amount.setAttribute("type", "number");
    amount.setAttribute("placeholder", "123.45");
    main.appendChild(amount);
    var description = document.createElement("input");
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    description.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(description);

    // rType should be a drop-menu list selector
    var rType = document.createElement("input");
    rType.setAttribute("id", "rType");
    rType.setAttribute("type", "text");
    rType.setAttribute(
      "placeholder",
      "Describe the purpose of your reimbursement."
    );
    main.appendChild(rType);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      display.innerText = "I display the resulting reimbursement here!";
    });
  });

  userUpd8.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    var userName = document.createElement("input");
    userName.setAttribute("id", "text");
    userName.setAttribute("type", "username");
    userName.setAttribute("placeholder", "Username");
    main.appendChild(userName);
    var password = document.createElement("input");
    password.setAttribute("id", "password");
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "Password");
    main.appendChild(password);
    var firstName = document.createElement("input");
    firstName.setAttribute("id", "firstName");
    firstName.setAttribute("type", "text");
    firstName.setAttribute("placeholder", "First Name");
    main.appendChild(firstName);
    var lastName = document.createElement("input");
    lastName.setAttribute("id", "lastName");
    lastName.setAttribute("type", "text");
    lastName.setAttribute("placeholder", "Last Name");
    main.appendChild(lastName);
    var emailAdd = document.createElement("input");
    emailAdd.setAttribute("id", "emailAdd");
    emailAdd.setAttribute("type", "text");
    emailAdd.setAttribute("placeholder", "Abc123@example.com");
    main.appendChild(emailAdd);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      display.innerText = "I display the resulting update here!";
    });
  });
}
