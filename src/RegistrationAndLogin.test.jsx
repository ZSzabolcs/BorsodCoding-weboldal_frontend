import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react'; // A screen-t most NE importáld itt
import { RegistrationOrLoginForm } from "./pages/RegistrationAndLogin";
import { App, checkStates } from "./App";

describe('RegistrationOrLogin komponens', () => {
  test('itt lesz tesztelés', () => {
    const {getByPlaceholderText} = render(<RegistrationOrLoginForm/>)
    const usernameInput = getByPlaceholderText('Felhasználónév');
    const passwordInput = getByPlaceholderText('Jelszó');
    fireEvent.change(usernameInput, {target: {value: 'user'}})
    fireEvent.change(passwordInput, {target: {value: 'password'}})
    expect(usernameInput.value).toBe('user')
    expect(passwordInput.value).toBe('password')
    //expect(getByPlaceholderText('Felhasználónév')).toBeInTheDocument();
    //expect(getByPlaceholderText('Jelszó')).toBeInTheDocument();
    
  });
  test('Ha mindegyik mező hamis, akkor igaz értéket ad vissza', () => {
    const tesztobjektum = {teszt1 : false, teszt2 : {teszt3 : false}}
    expect(checkStates(tesztobjektum)).toBe(true)
  })
  test('Ha egy mező hamis, akkor igaz értéket ad vissza', () => {
    const tesztobjektum = {teszt1 : false, teszt2 : {teszt3 : true}}
    expect(checkStates(tesztobjektum)).toBe(true)
  })
  test('Ha objektum típusú mező értéke hamis, akkor igaz értéket ad vissza', () => {
    const tesztobjektum = {teszt1 : true, teszt2 : {teszt3 : false}}
    expect(checkStates(tesztobjektum)).toBe(true)
  })
  test('Ha mindegyik mező igaz, akkor hamis értéket ad vissza', () => {
    const tesztobjektum = {teszt1 : true, teszt2 : {teszt3 : true}}
    expect(checkStates(tesztobjektum)).toBe(false)
  })
});
