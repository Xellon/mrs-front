
export enum UserType {
    Client,
    Admin,
    Finance,
}

export interface User {
    id: number;
    userType: UserType;
}

let user: User | undefined;

function validateSignIn(email: string, password: string): User | undefined {
    // Go to server

    //TODO: fix hack
    switch (email) {
        case "client@app.test":
            if (password === "client")
                user = { id: 1, userType: UserType.Client }
            break;
        case "finance@app.test":
            if (password === "finance")
                user = { id: 2, userType: UserType.Finance };
            break;
        case "admin@app.test":
            if (password === "admin")
                user = { id: 3, userType: UserType.Admin };
            break;
    }

    return user;
}

function getSignedInUser() {
    return user;
}

export const Authentication = {
    validateSignIn,
    getSignedInUser,
};