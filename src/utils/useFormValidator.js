import { useState, useCallback } from 'react';

function useFormValidator (initialState) {
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const isFormValid = (values, errors) => {
        const allRequiredFieldsFilled = Object.values(values).every(value => value.trim());
        const noErrors = Object.values(errors).every(error => !error);

        return allRequiredFieldsFilled && noErrors;
    }
    
    const handleInputChange = (evt) => {
        const  { name, value } = evt.target;

        let error;

        if (name === 'email' && !emailPattern.test(value)) {
            error = 'Неверный формат e-mail.';
        } else {
            error = evt.target.validationMessage;
        }

        setFormErrors(prevErrors => {
            const updatedErrors = {...prevErrors, [name]: error};
            
            return updatedErrors;
        });

        setFormValues(prevValues => {
            const updateValues = {...prevValues, [name]: value};
            setIsValid(isFormValid(updateValues, formErrors));

            return updateValues;
        });
    }

    const resetForm = useCallback(() => {
        setFormValues({});
        setFormErrors({});
        setIsValid(false);
    }, [setFormValues, setFormErrors, setIsValid]);

    return { formValues, formErrors, isValid, handleInputChange, resetForm, setFormValues };
}

export default useFormValidator;