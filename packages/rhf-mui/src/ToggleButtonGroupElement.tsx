import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
} from 'react-hook-form'
import {FieldValues} from 'react-hook-form/dist/types/fields'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel, {FormLabelProps} from '@mui/material/FormLabel'
import ToggleButton, {ToggleButtonProps} from '@mui/material/ToggleButton'
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup'

import {ReactNode} from 'react'
import {useFormError} from './FormErrorProvider'

type SingleToggleButtonProps = Omit<ToggleButtonProps, 'value' | 'children'> & {
  id: number | string
  label: ReactNode
}

export type ToggleButtonGroupElementProps<T extends FieldValues> =
  ToggleButtonGroupProps & {
    required?: boolean
    label?: string
    validation?: ControllerProps<T>['rules']
    name: Path<T>
    parseError?: (error: FieldError) => ReactNode
    control?: Control<T>
    options: SingleToggleButtonProps[]
    formLabelProps?: FormLabelProps
    helperText?: string
    enforceAtLeastOneSelected?: boolean
  }

export default function ToggleButtonGroupElement<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  control,
  label,
  validation = {},
  required,
  options = [],
  parseError,
  helperText,
  formLabelProps,
  enforceAtLeastOneSelected = false,
  exclusive,
  ...toggleButtonGroupProps
}: ToggleButtonGroupElementProps<TFieldValues>) {
  const errorMsgFn = useFormError()
  const customErrorFn = parseError || errorMsgFn
  if (required && !validation.required) {
    validation.required = 'This field is required'
  }

  const isRequired = required || !!validation?.required
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
        const renderHelperText = error
          ? typeof customErrorFn === 'function'
            ? customErrorFn(error)
            : error.message
          : helperText
        return (
          <FormControl
            error={!!error}
            required={isRequired}
            fullWidth={toggleButtonGroupProps?.fullWidth}
          >
            {label && (
              <FormLabel
                {...formLabelProps}
                error={!!error}
                required={isRequired}
                sx={{mb: 1, ...formLabelProps?.sx}}
              >
                {label}
              </FormLabel>
            )}
            <ToggleButtonGroup
              {...toggleButtonGroupProps}
              exclusive={exclusive}
              value={value}
              onBlur={onBlur}
              onChange={(event, val) => {
                if (enforceAtLeastOneSelected) {
                  // don't allow unselecting the last item
                  if (exclusive && val === null) return
                  if (!exclusive && val.length === 0) return
                }
                onChange(val)
                if (typeof toggleButtonGroupProps.onChange === 'function') {
                  toggleButtonGroupProps.onChange(event, val)
                }
              }}
            >
              {options.map(({label, id, ...toggleProps}) => (
                <ToggleButton value={id} {...toggleProps} key={id}>
                  {label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            {renderHelperText && (
              <FormHelperText>{renderHelperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
