import { FieldProps, useField } from 'formact'
import { forwardRef } from 'react'

type Props = FieldProps & { placeholder?: string }

const TextField = forwardRef<HTMLInputElement | null, Props>((props, ref) => {
  const field = useField(props)

  return (
    <input
      ref={ref}
      placeholder={props.placeholder}
      type={props.type || 'text'}
      value={field.fieldValue}
      onChange={(e) => field.update(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          field.submit()
        }
      }}
    />
  )
})

export default TextField
