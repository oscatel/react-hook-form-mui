import Button from '@mui/material/Button'
import {useFormContext} from 'react-hook-form'

export default function ResetFormButton() {
  const {reset} = useFormContext()
  return (
    <Button
      onClick={() => {
        reset({})
      }}
    >
      Reset
    </Button>
  )
}
