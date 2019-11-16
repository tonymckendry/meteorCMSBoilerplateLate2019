import React, {
    createContext,
} from 'react'
import { useLocalStore, useObserver } from 'mobx-react-lite'

export const FormContext = createContext(null)

const Form = ({
    children,
    onSubmit,
    onReset,
    onChange,
    values,
    validationSchema,
    ...extra,
}) => {
    const formState = useLocalStore(() => ({
        values: values || {},
        touched: {},
        errors: {},
        showErrors: false,
    }))

    const handleBlur = key => {
        formState.touched[key] = true
    }

    const handleChange = (key, value) => {
        formState.values[key] = value
        onChange && onChange(formState)
    }
    /**
     * Validation function run onSubmit.
     */
    const handleValidate = () => new Promise((resolve, reject) => {
        if (!validationSchema) {
            resolve()
        }

        formState.errors = Object.keys(validationSchema).reduce((acc, key) => {
            const currentValue = formState.values[key]
            if (validationSchema[key]) {
                validationSchema[key].map(validateFn => {
                    const invalid = validateFn(currentValue, formState.values)
                    invalid && (acc[key] = invalid)
                })
            }
            return acc
        }, {})

        Object.keys(formState.errors).length === 0 ? resolve() : reject()
    })

    const handleSubmit = async e => {
        e.preventDefault()

        /**
         * Reset errors on each submit
         */
        formState.showErrors = false
        formState.errors = {}

        try {
            await handleValidate()
            onSubmit && onSubmit(formState)
        } catch (error) {
            formState.showErrors = true
        }
    }

    const handleReset = () => onReset && onReset(formState)

    return useObserver(() => (
        <FormContext.Provider value={{
            ...formState,
            onChange: handleChange,
            onBlur: handleBlur,
        }}>
            <form onSubmit={handleSubmit} onReset={handleReset} {...extra}>
                {children}
            </form>
        </FormContext.Provider>
    ))
}

export default Form
