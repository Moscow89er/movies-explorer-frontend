import FormContainer from "../FormContainer/FormContainer";

function Login () {
    return (
        <FormContainer
            titleText={"Рады видеть!"}
            buttonText={"Войти"}
            paragraphText={"Ещё не зарегистрированы?"}
            parentComponent={"Login"}
        />
    )
}

export default Login;