import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // A screen-t most NE importáld itt
import { RegistrationOrLoginForm, checkEmail, checkIsMinLengthReached, checkIsOneBigChar, checkIsOneNumber, checkIsOneSpecChar } from "../src/pages/RegistrationAndLogin";
import { App, checkStates, PasswordState } from "../src/App";

describe('RegistrationOrLogin komponens', () => {

  test('checkPassword teszt - Ha hat karakternél rövidebb a jelszó, hamis értéket ad vissza', () => {
    const jelszoTeszt = "abcde"
    expect(checkIsMinLengthReached(jelszoTeszt)).toBe(false)
  })
  test('checkPassword teszt - Ha hat karakternél hosszabb (vagy egyenlő) a jelszó, igaz értéket ad vissza', () => {
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
