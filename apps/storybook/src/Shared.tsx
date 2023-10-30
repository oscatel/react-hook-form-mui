import {FC, PropsWithChildren} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import ResetFormButton from './ResetFormButton'

export const BoxMargin: FC<PropsWithChildren> = ({children}) => {
  return (
    <Box
      sx={{
        marginY: 2,
      }}
    >
      {children}
    </Box>
  )
}

export const SubmitButton: FC = () => {
  return (
    <Stack direction={'row'} spacing={2}>
      <ResetFormButton />
      <Button type={'submit'} color={'primary'}>
        {' '}
        Submit
      </Button>
    </Stack>
  )
}
