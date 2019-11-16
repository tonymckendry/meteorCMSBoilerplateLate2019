import React, { useContext } from 'react'
import { useObserver } from 'mobx-react-lite'
import NumberFormat from 'react-number-format'

import { makeStyles } from '@material-ui/core/styles'
import MUITextField from '@material-ui/core/TextField'

import { FormContext } from './'

const useStyles = makeStyles({
    errorText: {
        color: 'red', // TODO: Update with proper colors from theme once available,
        width: '100%' // TODO: Update with proper colors from theme once available,
    },
    container: {
        width: '100%',
        marginBottom: 5,
        marginTop: 5,
    }
})

const TextField = ({ name, type, ...extra }) => {
    if (!name) {
        throw Error('the name prop is required')
    }
    const classes = useStyles()
    const formState = useContext(FormContext)
    const handleChange = e => formState.onChange(e.target.name, e.target.value)
    const handleBlur = e => formState.onBlur(e.target.name)
    let inputComponent
    switch (type) {
        case 'money':
            inputComponent = MoneyFormatCustom
            break
        case 'percentage':
            inputComponent = PercentageFormatCustom
    }
    return useObserver(() => (
        <div className={classes.container}>
            <MUITextField
                {...extra}
                name={name}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                value={formState.values[name] || ''}
                error={!!formState.errors[name]}
                InputProps={{
                    inputComponent: inputComponent
                }} />
            {(formState.showErrors || formState.touched[name]) && formState.errors[name] && (
                <div className={classes.errorText}>{formState.errors[name]}</div>
            )}
        </div>
    ))
}

export default TextField

function MoneyFormatCustom (props) {
    const { inputRef, onChange, name, ...other } = props
    return (
        <NumberFormat
            {...other}
            ref={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        name: name
                    }
                })
            }}
            thousandSeparator
            prefix="$"
            value={props.value} />
    )
}

function PercentageFormatCustom (props) {
    const { inputRef, onChange, name, ...other } = props
    return (
        <NumberFormat
            {...other}
            ref={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        name: name
                    }
                })
            }}
            suffix="%"
            value={props.value} />
    )
}
