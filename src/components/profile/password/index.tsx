import profileService from '@/src/services/profileService'
import styles from '@/styles/profile.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import ToastComponent from '../../common/toast'

const PasswordForm = function () {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [color, setColor] = useState('')
  const [toastIsOpen, setToatsIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    profileService.fetchCurrent().then((password) => {
      setCurrentPassword(password.currentPassword)
      setNewPassword(password.newPassword)
    })
  }, [])

  const handlePasswordUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(newPassword !== confirmNewPassword) {
      setToatsIsOpen(true)
      setErrorMessage('Senha e confirmação de senha diferentes!')
      setColor('bg-danger')
      setTimeout(() => {
        setToatsIsOpen(false)
      }, 1000 * 3)

      return
    }

    if(currentPassword === newPassword) {
      setToatsIsOpen(true)
      setErrorMessage('Não coloque a nova senha igual a senha antiga!')
      setColor('bg-danger')
      setTimeout(() => {
        setToatsIsOpen(false)
      }, 1000 * 3)

      return
    }

    const res = await profileService.passwordUpdate({
      currentPassword, newPassword
    })

    if(res === 204) {
      setToatsIsOpen(true)
      setErrorMessage('Senha alterada com sucesso!')
      setColor('bg-success')
      setTimeout(() => {
        setToatsIsOpen(false)
      }, 1000 * 3)

      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    }

    if(res === 400) {
      setToatsIsOpen(true)
      setErrorMessage('Senha atual incorreta!')
      setColor('bg-danger')
      setTimeout(() => {
        setToatsIsOpen(false)
      }, 1000 * 3)
    }
  }

  return (
    <>
      <Form onSubmit={handlePasswordUpdate} className={styles.form}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} for='currentPassword'>SENHA ATUAL</Label>
            <Input
              name='currentPassword'
              type='password'
              id='currentPassword'
              placeholder='********'
              required
              minLength={6}
              maxLength={12}
              className={styles.input}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.currentTarget.value)}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} for='newPassword'>
              NOVA SENHA
            </Label>
            <Input
              name='newPassword'
              type='password'
              id='newPassword'
              placeholder='********'
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
              value={newPassword}
              onChange={(event) => setNewPassword(event.currentTarget.value)}

            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} for='confirmNewPassword'>
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name='confirmNewPassword'
              type='password'
              id='confirmNewPassword'
              placeholder='********'
              required
              minLength={6}
              maxLength={12}
              className={styles.inputFlex}
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.currentTarget.value)}

            />
          </FormGroup>

        </div>
          <Button outline className={styles.formBtn} type='submit'>
            Salvar alterações
          </Button>
      </Form>
      <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
    </>
  )
}

export default PasswordForm
