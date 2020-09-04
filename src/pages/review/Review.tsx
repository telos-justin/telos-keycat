import React, { useState, useEffect } from 'react'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from '../../design/moles/fields/PasswordField'
import Submit from 'design/moles/fields/Submit'
import { navigate } from '@reach/router'
import { Form } from '../../design/moles/form/Form'

const SaveKey = props => {
  const { state } = props.location
  const { accountHandle, keys } = state
  const [accountHandleInput, setAccountHandleInput] = useState('')
  const [privateKeyInput, setPrivateKeyInput] = useState('')
  const [isBoxChecked, setIsBoxChecked] = useState(false)
  const [doesInputMatch, setDoesInputMatch] = useState(false)
  const [error, setError] = useState('')

  const onClickSave = () => {
    console.log('isBoxChecked: ', isBoxChecked)
    if (isBoxChecked) {
      navigate('/signin')
    }
  }

  useEffect(() => {
    checkInputMatches()
  }, [accountHandleInput, privateKeyInput])

  const onChangeCheckmark = e => {
    setIsBoxChecked(!isBoxChecked)
  }

  const onChangeAccountHandle = event => {
    const input = event.target.value
    setAccountHandleInput(input)
  }

  const onChangePrivateKey = event => {
    const input = event.target.value
    setPrivateKeyInput(input)
  }

  const checkInputMatches = () => {
    if (accountHandleInput === accountHandle && privateKeyInput === keys.ownerKeys.privateKey) {
      setDoesInputMatch(true)
      setError('')
    } else {
      setError('Inputs do not match account info')
    }
  }

  console.log('accountHandle: ', accountHandle, 'keys: ', keys)
  return (
    <CardLayout title="Review Telos Testnet Account Into">
      <Form method="post" noValidate onSubmit={onClickSave} autoComplete="off">
        <Fields>
          <p>
            The following is your critical Telos info,{' '}
            <strong>please copy and paste these values into the fields below, and store them in a safe place:</strong>
          </p>
          <p style={{ textAlign: 'center' }}>
            <strong>Account: </strong>
            <br />
            <br />
            {accountHandle}
            <br />
            <br />
            <strong>Private Key: </strong>
            <br />
            <br />
            {keys.ownerKeys.privateKey}
          </p>
          <AccountField
            onChange={onChangeAccountHandle}
            value={accountHandleInput}
            id="account-name"
            autoComplete="off"
          />
          <PasswordField onChange={onChangePrivateKey} value={privateKeyInput} id="private-key" autoComplete="off" />
          <p style={{ color: 'red' }}>{!!error && error}</p>
          <br />
          <input name={'myCheck'} value="myCheckbox" type="checkbox" onChange={onChangeCheckmark} /> I have copied and
          stored my keys
        </Fields>
        <Submit onClick={onClickSave} disabled={!isBoxChecked || !doesInputMatch}>
          Save
        </Submit>
      </Form>
    </CardLayout>
  )
}

export default SaveKey