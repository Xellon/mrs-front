import * as React from "react";
import { TextField } from "@material-ui/core";

export interface MainInfoState {
    email: string;
    emailError?: string;
}

export class MainInfo extends React.Component<{}, MainInfoState> {
    public readonly state: MainInfoState = {
        email: "",
    }

    private handleChange = (type: keyof MainInfoState) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => { 
            const value = e.target.value;
            const error = this.validate(type, value);
            this.setState({
                [type]: e.target.value,
                [type + "Error"]: error,
            } as Pick<MainInfoState, keyof MainInfoState>);
        };
    }

    private validate(type: keyof MainInfoState, value: string | number) {
        switch(type) {
            case "email": return this.validateEmail(value.toString());
        }
    }

    private validateEmail(email: string){
        if(!email.toLowerCase().match(/.*@.*\.[a-z]{2,6}$/g))
            return "Email is wrong!";
        return undefined;
    }

    public render() {
        return(
            <div>
                <TextField 
                    label="Email"
                    required
                    margin="normal"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    helperText={this.state.emailError}
                />
            </div>
        );
    }
}