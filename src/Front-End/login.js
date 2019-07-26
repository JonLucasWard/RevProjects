// #region Global Variables
// All main parts of the webpage that are always accessible
main = document.getElementById("main");
navBar = document.getElementById("NavBar");
display = document.getElementById("display");
logout = document.getElementById("logout");
title = document.getElementById("title"); // I forgot to change this to change views, derp
login = document.getElementById("Login");
clientInfo = {}; // Pass in normal user info to this, use as normal
authorizer = {}; // pass in Bearer + ' ' + <token> to this, use as another header
// #endregion

// give functionality to login button
function loginMaker() {
  login.addEventListener("click", function () {
    var usrnam = document.getElementById("text-box")["value"]; //get value of user's input
    var passy = document.getElementById("passy")["value"]; // and their password
    responseText = '';
    fetch('http://localhost:3000/login', { // call to login
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' //needed or it won't be accepted
      },
      body: JSON.stringify({ UserName: usrnam, Password: passy }) // send body to server
    }).then((res) => {
      if (!res.ok) { // check if the response is under 400 (not an error)
        res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
      } else { //^IF IZ BAD! You must PROMISE to get the error which runs AFTER the fetch, otherwise the response is LOCKED!
        return res.json(); //return as normal if things are good
      }
    }) // receive and parse the response
      .then(function (data) { // data from the resulting response
        clientInfo = data; // push data into global variable object
        // clean up display if something is there.
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        // check role value, change display according to user role
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
  });
}

// build login functionality
loginMaker();

// Functionality of logout button
logout.addEventListener("click", function () {
  // #region clear body divs
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  // #endregion
  // #region Remake login
  var introPara = document.createElement("p");
  introPara.innerText = "Please log in.";
  main.appendChild(introPara);

  var username = document.createElement("input");
  username.setAttribute("id", "text-box");
  username.setAttribute("type", "text");
  var userLabel = document.createElement('label');
  userLabel.setAttribute('for', 'text-box');
  userLabel.innerText = 'Username';
  main.appendChild(userLabel);
  main.appendChild(username);

  var password = document.createElement("input");
  password.setAttribute("id", "passy");
  password.setAttribute("type", "password");
  var passLabel = document.createElement('label');
  passLabel.setAttribute('for', 'passy');
  passLabel.innerText = 'Password';
  main.appendChild(passLabel);
  main.appendChild(password);

  var newlog = document.createElement("input");
  newlog.setAttribute("type", "submit");
  newlog.setAttribute("id", "Login");
  main.appendChild(newlog);
  // #endregion

  login = document.getElementById("Login");
  loginMaker();
});

function removeBody() {
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

// Repeated code for a user to get their own information
function getSelf() {
  removeBody();
  var url = new URL('http://localhost:3000/users/');
  var url = url + clientInfo.iD;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res) => {
    if (!res.ok) {
      res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
    } else {
      return res.json();
    }
  })
    .then(function (data) {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      /*for (var key in data) {
        console.log(key);
      }*/ // can use this code to view keys in ANY object if you don't already know em
      for (var key in data) {
        let a = document.createElement('p');
        a.innerText = 'Your ' + key + ' is ' + data[key];
        display.appendChild(a);
      }
    })
    .catch((err) => console.log(err));
  main.innerText =
    `In the display port is your information at this company, ${clientInfo.firstName}.`;
}

function makeReim() {
  removeBody();
  /* var postReim = document.createElement('form');
      main.appendChild(postReim);
      form forces page restart, not ideal for a one page app*/
  var amount = document.createElement("input");
  amount.setAttribute("id", "amount");
  amount.setAttribute("type", "number");
  var amountLabel = document.createElement('label');
  amountLabel.setAttribute('for', 'amount');
  amountLabel.innerText = 'Amount';
  main.appendChild(amountLabel);
  main.appendChild(amount);
  var description = document.createElement("input");
  description.setAttribute("id", "description");
  description.setAttribute("type", "text");
  var descLabel = document.createElement('label');
  descLabel.setAttribute('for', 'description');
  descLabel.innerText = 'Description';
  main.appendChild(descLabel);
  main.appendChild(description);

  // rType should be a drop-menu list selector
  var rType = document.createElement("input");
  rType.setAttribute("id", "rType");
  rType.setAttribute("type", "text");
  var rTypeLabel = document.createElement('label');
  rTypeLabel.setAttribute('for', 'rType');
  rTypeLabel.innerText = 'Type';
  main.appendChild(rTypeLabel);
  main.appendChild(rType);

  var submitter = document.createElement("button");
  submitter.setAttribute("id", "submitter");
  submitter.innerText = "Submit";
  main.appendChild(submitter);

  submitter.addEventListener("click", function () {
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }
    fetch('http://localhost:3000/reimbursements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 0,
        author: clientInfo.iD,
        amount: document.getElementById('amount')['value'],
        description: document.getElementById('description')['value'],
        type: document.getElementById('rType')['value']
      })
    }).then((res) => {
      if (!res.ok) {
        res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
      } else {
        return res.json();
      }
    })
      .then(function (data) {
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        for (var key in data) {
          let a = document.createElement('p');
          a.innerText = data[key] + ' ' + key;
          display.appendChild(a);
        }
      })
      .catch((err) => console.log(err));
    main.innerText =
      `In the display port is your new Reimbursement, ${clientInfo.firstName}.`;
  });
}

function getYourReims() {
  removeBody();
  var url = new URL('http://localhost:3000/reimbursements/author/userId/');
  var url = url + clientInfo.iD;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res) => {
    if (!res.ok) {
      res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
    } else {
      return res.json();
    }
  })
    .then(function (data) {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      for (var key in data) {
        for (var keyx in data[key]) { // for loop in for loop, one for list of objects, 2nd for objects in that list
          let a = document.createElement('p');
          a.innerText = data[key][keyx] + ' ' + keyx;
          display.appendChild(a);
        }
      }
    })
    .catch((err) => console.log(err));
  main.innerText =
    `In the display port is your information at this company, ${clientInfo.firstName}.`;
}

function userViewMaker() {
  // #region clear body
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  removeBody();
  // #endregion
  // #region make user page
  var user = document.createElement("button")
  user.setAttribute("id", "UserInfo");
  user.innerText = "Your Information";
  navBar.appendChild(user);
  var submitReim = document.createElement("button")
  submitReim.setAttribute("id", "submitReim");
  submitReim.innerText = "Submit Reimbursement";
  navBar.appendChild(submitReim);
  var getYoReims = document.createElement('button')
  getYoReims.setAttribute('id', 'getYoReims');
  getYoReims.innerText = "Get Your Reims";
  navBar.appendChild(getYoReims);
  // #endregion
  main.innerText = `Welcome ${clientInfo.firstName}, please select an option from the nav bar`;

  // When user clicks for their own information
  user.addEventListener("click", function () {
    getSelf();
  });
  // When user clicks to make a reimbursement
  submitReim.addEventListener("click", function () {
    makeReim();
  });

  getYoReims.addEventListener('click', function () {
    getYourReims();
  });
}

function FMViewMaker() {
  // #region clear all
  removeBody();
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  // #endregion 
  // #region make options for new view
  var user = document.createElement("button");
  user.setAttribute("id", "UserInfo");
  user.innerText = "Get Your Info";
  navBar.appendChild(user);

  var getYoReims = document.createElement('button')
  getYoReims.setAttribute('id', 'getYoReims');
  getYoReims.innerText = "Get Your Reims";
  navBar.appendChild(getYoReims);

  var userget = document.createElement('button');
  userget.setAttribute("id", "UserGet");
  userget.innerText = "Search By UserID";
  navBar.appendChild(userget);

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

  var searchAllUsers = document.createElement("button");
  searchAllUsers.setAttribute("id", "searchAllUsers");
  searchAllUsers.innerText = "Get All Users";
  navBar.appendChild(searchAllUsers);
  // #endregion

  main.innerText = `Welcome ${clientInfo.firstName}, please select an option from the nav bar`;

  // When user clicks for their own information
  user.addEventListener("click", function () {
    getSelf();
  });

  getYoReims.addEventListener('click', function () {
    getYourReims();
  });

  userget.addEventListener('click', function () {
    removeBody();
    var userId = document.createElement('input');
    userId.setAttribute("id", "userId");
    userId.setAttribute("type", "number");
    var userIdLabel = document.createElement('label');
    userIdLabel.setAttribute('for', 'userId');
    userIdLabel.innerText = 'ID #';
    main.appendChild(userIdLabel);
    main.appendChild(userId);
    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      var url = new URL('http://localhost:3000/users/');
      var url = url + document.getElementById('userId')['value'];
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if (!res.ok) {
          res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
        } else {
          return res.json();
        }
      })
        .then(function (data) {
          while (display.firstChild) {
            display.removeChild(display.firstChild);
          }
          /*for (var key in data) {
            console.log(key);
          }*/ // can use this code to view keys in ANY object if you don't already know em
          for (var key in data) {
            let a = document.createElement('p');
            a.innerText = 'Your ' + key + ' is ' + data[key];
            display.appendChild(a);
          }
        })
        .catch((err) => console.log(err));
      main.innerText =
        `In the display port is your information at this company, ${clientInfo.firstName}.`;
    });
  });

  // When user clicks to make a reimbursement
  submitReim.addEventListener("click", function () {
    makeReim();
  });

  // When Financial Manager wants to update a reimbursement
  upd8Reim.addEventListener("click", function () {
    removeBody();
    // #region create inputs and button
    var reimId = document.createElement('input');
    reimId.setAttribute("id", "reimId");
    reimId.setAttribute("type", "number");
    var reimIdLabel = document.createElement('label');
    reimIdLabel.setAttribute('for', 'reimId');
    reimIdLabel.innerText = 'ID #';
    main.appendChild(reimIdLabel);
    main.appendChild(reimId);

    var amount = document.createElement("input");
    amount.setAttribute("id", "amount");
    amount.setAttribute("type", "number");
    var amountLabel = document.createElement('label');
    amountLabel.setAttribute('for', 'amount');
    amountLabel.innerText = 'Amount';
    main.appendChild(amountLabel);
    main.appendChild(amount);
    var description = document.createElement("input");
    description.setAttribute("id", "description");
    description.setAttribute("type", "text");
    var descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.innerText = 'Amount';
    main.appendChild(descriptionLabel);
    main.appendChild(description);

    // rType and rStatus should be a drop-menu list selector
    var rType = document.createElement("input");
    rType.setAttribute("id", "rType");
    rType.setAttribute("type", "number");
    var rTypeLabel = document.createElement('label');
    rTypeLabel.setAttribute('for', 'rType');
    rTypeLabel.innerText = 'Type';
    main.appendChild(rTypeLabel);
    main.appendChild(rType);
    var rStatus = document.createElement("input");
    rStatus.setAttribute("id", "rStatus");
    rStatus.setAttribute("type", "number");
    var rStatusLabel = document.createElement('label');
    rStatusLabel.setAttribute('for', 'rStatus');
    rStatusLabel.innerText = 'Status';
    main.appendChild(rStatusLabel);
    main.appendChild(rStatus);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);
    // #endregion
    // send update to reim
    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      // #region make request body, if null, don't add it to object
      let reimid = document.getElementById('reimId')['value']; // get value
      let payload = { id: parseInt(reimid), resolver: clientInfo.iD }; // set basic payload
      let desc = document.getElementById('description')['value'];
      if (desc != '') { payload.description = desc; } // check value
      let amt = document.getElementById('amount')['value'];
      if (amt != '') { payload.amount = parseInt(amt); } // MUST CONVERT VALUE TO INT
      let rTy = document.getElementById('rType')['value'];
      if (rTy != '') { payload.type = parseInt(rTy); }
      let rSta = document.getElementById('rStatus')['value'];
      if (rSta != '') { payload.status = parseInt(rSta); }
      // #endregion
      // #region fetch for Patch
      fetch('http://localhost:3000/reimbursements', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then((res) => {
        if (!res.ok) {
          res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
        } else {
          return res.json();
        }
      })
        .then(function (data) {
          while (display.firstChild) { // clear display
            display.removeChild(display.firstChild);
          }
          for (var key in data) { // print object element to display
            let a = document.createElement('p');
            a.innerText = data[key] + ' ' + key;
            display.appendChild(a);
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
      main.innerText =
        `In the display port is your new Reimbursement, ${clientInfo.firstName}.`;
    });
    // #endregion
  });

  // Get all users
  searchAllUsers.addEventListener("click", function () {
    removeBody();
    fetch('http://localhost:3000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => {
      if (!res.ok) {
        res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
      } else {
        return res.json();
      }
    })
      .then(function (data) {
        while (display.firstChild) {
          display.removeChild(display.firstChild);
        }
        for (var key in data) {
          for (var keyx in data[key]) { // for loop in for loop, one for list of objects, 2nd for objects in that list
            let a = document.createElement('p');
            a.innerText = data[key][keyx] + ' ' + keyx;
            display.appendChild(a);
          }
        }
        console.log(data);
      })
      .catch((err) => console.log(err));
    main.innerText =
      `In the display port is the target's information at this company, ${clientInfo.firstName}.`;
  });

  // Get all reimbursements
  searchAllReimS.addEventListener("click", function () {
    removeBody();
    // #region inputs and submitter
    var input = document.createElement("input");
    input.setAttribute("id", "input");
    input.setAttribute("type", "number");
    var inputLabel = document.createElement('label');
    inputLabel.setAttribute('for', 'input');
    inputLabel.innerText = '#';
    main.appendChild(inputLabel);
    main.appendChild(input);

    var typing = document.createElement("input");
    typing.setAttribute("id", "typing");
    // If 0, author, 1 is status
    // SHOULD MAKE A DROP MENU
    typing.setAttribute("type", "number");
    var typingLabel = document.createElement('label');
    typingLabel.setAttribute('for', 'typing');
    typingLabel.innerText = '0 for user, 1 for status';
    main.appendChild(typingLabel);
    main.appendChild(typing);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);
    // #endregion

    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      var url = 'http://localhost:3000/reimbursements/';
      if (document.getElementById('typing')['value'] == 0) { // if you want by user ID
        url = url + 'author/userId/' + document.getElementById('input')['value']; // specify URL
      } else {
        url = url + 'status/' + document.getElementById('input')['value']; // find by status
      }
      // #region fetch command
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        if (!res.ok) {
          res.text().then(text => { responseText = Error(text); display.innerText = responseText; });
        } else {
          return res.json();
        }
      })
        .then(function (data) {
          while (display.firstChild) {
            display.removeChild(display.firstChild);
          }
          for (var key in data) { // for loop of objects
            for (var keyx in data[key]) { // for loop to display objects in objects
              let a = document.createElement('p');
              a.innerText = data[key][keyx] + ' ' + keyx;
              display.appendChild(a);
            }
          }
          console.log(data);
        })
        .catch((err) => console.log(err));
      // #endregion
      main.innerText =
        `In the display port is the target's information at this company, ${clientInfo.firstName}.`;
    });
  });
}

function adminViewMaker() {
  // #region clear all
  removeBody();
  while (navBar.firstChild) {
    navBar.removeChild(navBar.firstChild);
  }
  // #endregion
  // #region making admin view
  var user = document.createElement("button");
  user.setAttribute("id", "UserInfo");
  user.innerText = "Your Information";
  navBar.appendChild(user);

  var submitReim = document.createElement("button");
  submitReim.setAttribute("id", "submitReim");
  submitReim.innerText = "Submit Reimbursement";
  navBar.appendChild(submitReim);

  var getYoReims = document.createElement('button')
  getYoReims.setAttribute('id', 'getYoReims');
  getYoReims.innerText = "Get Your Reims";
  navBar.appendChild(getYoReims);

  var userUpd8 = document.createElement("button");
  userUpd8.setAttribute("id", "userUpd8");
  userUpd8.innerText = "Update User";
  navBar.appendChild(userUpd8);
  // #endregion

  main.innerText = `Welcome ${clientInfo.firstName}, please select an option from the nav bar`;

  // When user clicks for their own information
  user.addEventListener("click", function () {
    getSelf();
  });
  // When user clicks to make a reimbursement
  submitReim.addEventListener("click", function () {
    makeReim();
  });

  getYoReims.addEventListener('click', function () {
    getYourReims();
  });

  userUpd8.addEventListener("click", function () {
    removeBody();
    // #region make inputs and submit
    var useRid = document.createElement("input");
    useRid.setAttribute("id", "iD");
    useRid.setAttribute("type", "number");
    var useRidLabel = document.createElement('label');
    useRidLabel.setAttribute('for', 'iD');
    useRidLabel.innerText = 'User ID';
    main.appendChild(useRidLabel);
    main.appendChild(useRid);
    var userName = document.createElement("input");
    userName.setAttribute("id", "text");
    userName.setAttribute("type", "username");
    var usernameLabel = document.createElement('label');
    usernameLabel.setAttribute('for', 'username');
    usernameLabel.innerText = 'Username';
    main.appendChild(usernameLabel);
    main.appendChild(userName);
    var password = document.createElement("input");
    password.setAttribute("id", "password");
    password.setAttribute("type", "password");
    var passwordLabel = document.createElement('label');
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = 'Password';
    main.appendChild(passwordLabel);
    main.appendChild(password);
    var firstName = document.createElement("input");
    firstName.setAttribute("id", "firstName");
    firstName.setAttribute("type", "text");
    var firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'firstName');
    firstNameLabel.innerText = 'First Name';
    main.appendChild(firstNameLabel);
    main.appendChild(firstName);
    var lastName = document.createElement("input");
    lastName.setAttribute("id", "lastName");
    lastName.setAttribute("type", "text");
    var lastNameLabel = document.createElement('label');
    lastNameLabel.setAttribute('for', 'lastName');
    lastNameLabel.innerText = 'Last Name';
    main.appendChild(lastNameLabel);
    main.appendChild(lastName);
    var emailAdd = document.createElement("input");
    emailAdd.setAttribute("id", "emailAdd");
    emailAdd.setAttribute("type", "text");
    var emailAddLabel = document.createElement('label');
    emailAddLabel.setAttribute('for', 'emailAdd');
    emailAddLabel.innerText = 'Email';
    main.appendChild(emailAddLabel);
    main.appendChild(emailAdd);

    var submitter = document.createElement("button");
    submitter.setAttribute("id", "submitter");
    submitter.innerText = "Submit";
    main.appendChild(submitter);
    // #endregion

    // when admin clicks submit
    submitter.addEventListener("click", function () {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
      // #region admin making update request payload
      let userId = document.getElementById('iD')['value'];
      let payload = { iD: parseInt(userId) }; // info that must be in there, initialize payload object
      let usernam = document.getElementById('text')['value']; // get value from input
      if (usernam != '') { payload.userName = usernam; } // if null, it doesn't get added to payload object
      let pass = document.getElementById('password')['value'];
      if (pass != '') { payload.passWord = pass; }
      let firstname = document.getElementById('firstName')['value'];
      if (firstname != '') { payload.firstName = firstname; }
      let lastname = document.getElementById('lastName')['value'];
      if (lastname != '') { payload.lastName = lastname; }
      let email = document.getElementById('emailAdd')['value'];
      if (email != '') { payload.email = email; }
      // #endregion
      // #region fetch request and results
      fetch('http://localhost:3000/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) // turn object into readable JSON
      }).then((res) => {
        if (!res.ok) {
          res.text().then(text => { responseText = Error(text); console.log(responseText); display.innerText = responseText; });
        } else {
          return res.json();
        }
      })
        .then(function (data) { // data is readable results
          while (display.firstChild) {
            display.removeChild(display.firstChild);
          }
          for (var key in data) {
            let a = document.createElement('p');
            a.innerText = data[key] + ' ' + key;
            display.appendChild(a);
          }
        })
        .catch((err) => console.log(err));
      // #endregion
      main.innerText =
        `In the display port is the edited User, ${clientInfo.firstName}.`;
    });
  });
};
