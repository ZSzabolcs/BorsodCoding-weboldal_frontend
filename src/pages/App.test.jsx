import { describe, test, expect } from "bun:test";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {App, checkStates} from "../App"

describe('RegistrationOrLogin komponens', () => {
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
    
})