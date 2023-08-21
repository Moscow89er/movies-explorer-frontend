import FormContainer from "../FormContainer/FormContainer";

function Register () {
    return (
        <FormContainer
            titleText={"Добро пожаловать!"}
            buttonText={"Зарегистрироваться"}
            paragraphText={"Уже зарегистрированы?"}
            parentComponent={"Register"}
        />
    )
}

export default Register;