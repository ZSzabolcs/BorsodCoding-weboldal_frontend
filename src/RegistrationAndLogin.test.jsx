import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // A screen-t most NE importáld itt
import { CheckPassword, RegistrationOrLoginForm, checkEmail } from "./pages/RegistrationAndLogin";
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
  test('Ha mindegyik mező hamis, akkor igaz értéket ad vissza', () => {
    const tesztobjektum = { teszt1: false, teszt2: { teszt3: false } }
    expect(checkStates(tesztobjektum)).toBe(true)
  })
  test('Ha egy mező hamis, akkor igaz értéket ad vissza', () => {
    const tesztobjektum = { teszt1: false, teszt2: { teszt3: true } }
    expect(checkStates(tesztobjektum)).toBe(true)
  })
  test('Ha objektum típusú mező értéke hamis, akkor igaz értéket ad vissza', () => {
    const tesztobjektum = { teszt1: true, teszt2: { teszt3: false } }
    expect(checkStates(tesztobjektum)).toBe(true)
  })
  test('Ha mindegyik mező igaz, akkor hamis értéket ad vissza', () => {
    const tesztobjektum = { teszt1: true, teszt2: { teszt3: true } }
    expect(checkStates(tesztobjektum)).toBe(false)
  })

  test('CheckPassword teszt - Ha hat karakternél rövidebb a jelszó, hamis értéket ad vissza', () => {
    const jelszoTeszt = "abcde"
    const elvart = new PasswordState()
    expect(CheckPassword(jelszoTeszt)).toBe(elvart)
  })
  test('CheckPassword teszt - Ha hat karakternél rövidebb a jelszó, igaz értéket ad vissza', () => {
    const jelszoTeszt = "abcdef"
    const elvart = new PasswordState()
    elvart.isMinLengthReached = true
    expect(CheckPassword(jelszoTeszt)).toBe(elvart)
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
