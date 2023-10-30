import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import {FormContainer, TextFieldElement, useWatch} from 'react-hook-form-mui'

const SubComponent = () => {
  const [name, email] = useWatch({
    name: ['name', 'email'],
  })
  return (
    <>
      <Stack spacing={3}>
        <Button
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={!(name && email)}
        >
          Submit
        </Button>
        <Alert variant={'outlined'} severity={'info'}>
          You have to fill out the required fields before the Button activates.
        </Alert>
      </Stack>
    </>
  )
}

export default function IndexPage() {
  return (
    <div>
      <FormContainer
        defaultValues={{
          name: '',
        }}
        onSuccess={(data) => {
          console.log(data)
        }}
      >
        <Stack direction={'column'}>
          <TextFieldElement name={'name'} label={'Name'} required /> <br />
          <TextFieldElement
            name={'email'}
            label={'Email'}
            required
            type={'email'}
          />{' '}
          <br />
          <TextFieldElement name={'interest'} label={'Interest'} /> <br />
          <SubComponent />
        </Stack>
      </FormContainer>
    </div>
  )
}
