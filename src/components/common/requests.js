const FOUND = 200;
const NOT_FOUND = 404;

usernameCall.performRequest()
    .then(requestResponse => {
        if (requestResponse.status === FOUND) {
            this.usernameErrors = ["This username is taken."];
        } else if (requestResponse.status === NOT_FOUND) {
            this.usernameErrors = [];
        }
    });

let emailCall = new APICall(RequestType.HEAD, "users", {email: this.email}, [FOUND, NOT_FOUND]);
emailCall.performRequest()
    .then(requestResponse => {
        if (requestResponse.status === FOUND) {
            this.emailErrors = ["This email is taken."];
        } else if (requestResponse.status === NOT_FOUND) {
            this.emailErrors = [];
        }
    });
// Submit form for registration.
let registerData = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    username: this.username,
    password: this.password
};

const SUCCESS = 200;

// TODO: Add some sort of prompt if the server errors out.
let registerCall = new APICall(RequestType.POST, "users", registerData, [SUCCESS]);
registerCall.performRequest()
    .then(registerResponse => {
        switch (registerResponse.status) {
            case SUCCESS: {
                this.$store.commit("login", registerResponse.data);
                this.$router.push('/home');
            }
                break;
        }
    });
}
break;
}
})
;
}
break;
