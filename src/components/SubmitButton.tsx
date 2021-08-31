import { useForm } from 'formact'

export default function SubmitButton(props: {
  children: string
  disabled?: boolean
}) {
  const form = useForm()

  return (
    <button
      disabled={!form.valid || form.submitting || props.disabled}
      onClick={form.submit}>
      {props.children}
    </button>
  )
}
