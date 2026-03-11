import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // A screen-t most NE importáld itt
import { CheckPassword, RegistrationOrLoginForm, checkEmail, checkIsMinLengthReached, checkIsOneBigChar, checkIsOneNumber, checkIsOneSpecChar } from "./pages/RegistrationAndLogin";
import { App, checkStates, PasswordState } from "./App";

describe('RegistrationOrLogin komponens', () => {
  test('itt lesz tesztelés', () => {
    const { getByPlaceholderText } = render(<RegistrationOrLoginForm />)
    const usernameInput = getByPlaceholderText('Felhasználónév');
    const passwordInput = getByPlaceholderText('Jelszó');
    fireEvent.change(usernameInput, { target: { value: 'user' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    expect(usernameInput.value).toBe('user')
    expect(passwordInput.value).toBe('password')
    //expect(getByPlaceholderText('Felhasználónév')).toBeInTheDocument();
    //expect(getByPlaceholderText('Jelszó')).toBeInTheDocument();

  });

  test('CheckPassword teszt - Ha hat karakternél rövidebb a jelszó, hamis értéket ad vissza', () => {
    const jelszoTeszt = "abcde"
    expect(checkIsMinLengthReached(jelszoTeszt)).toBe(false)
  })
  test('CheckPassword teszt - Ha hat karakternél hosszabb (vagy egyenlő) a jelszó, igaz értéket ad vissza', () => {
    const jelszoTeszt = "abcdef"
    expect(checkIsMinLengthReached(jelszoTeszt)).toBe(true)
  })
  test('checkEmail teszt - Ha jó az e-mail-cím', () => {
    const emailTeszt = "valami@gmail.com"
    expect(checkEmail(emailTeszt)).toBe(true)
  })
  test('checkEmail teszt - Ha rossz az e-mail-cím', () => {
    const emailTeszt = "valamigmail.com"
    expect(checkEmail(emailTeszt)).toBe(false)
  })
});
