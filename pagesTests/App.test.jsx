import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {App } from "../src/App"
import { checkStatesIsContainsFalse } from "../src/pages/RegistrationAndLogin";

describe('App komponens', () => {
      test('checkStatesIsContainsFalse teszt - Ha mindegyik mező hamis, akkor igaz értéket ad vissza', () => {
        const tesztobjektum = { teszt1: false, teszt2: { teszt3: false } }
        expect(checkStatesIsContainsFalse(tesztobjektum)).toBe(true)
      })
      test('checkStatesIsContainsFalse teszt - Ha egy mező hamis, akkor igaz értéket ad vissza', () => {
        const tesztobjektum = { teszt1: false, teszt2: { teszt3: true } }
        expect(checkStatesIsContainsFalse(tesztobjektum)).toBe(true)
      })
      test('checkStatesIsContainsFalse teszt - Ha objektum típusú mező értéke hamis, akkor igaz értéket ad vissza', () => {
        const tesztobjektum = { teszt1: true, teszt2: { teszt3: false } }
        expect(checkStatesIsContainsFalse(tesztobjektum)).toBe(true)
      })
      test('checkStatesIsContainsFalse teszt - Ha mindegyik mező igaz, akkor hamis értéket ad vissza', () => {
        const tesztobjektum = { teszt1: true, teszt2: { teszt3: true } }
        expect(checkStatesIsContainsFalse(tesztobjektum)).toBe(false)
      })
    
})