import { describe, test, expect } from "bun:test";
import { checkIsEmail, passwordFormatCheckers, checkStatesIsContainsFalse } from "../src/pages/RegistrationAndLogin";

describe('RegistrationOrLogin komponens', () => {

  test('checkIsMinLengthReached teszt - Ha hat karakternél rövidebb a jelszó, hamis értéket ad vissza', () => {
    const { checkIsMinLengthReached } = passwordFormatCheckers
    const jelszoTeszt = "abcde"
    expect(checkIsMinLengthReached(jelszoTeszt)).toBe(false)
  })
  test('checkIsMinLengthReached teszt - Ha hat karakternél hosszabb (vagy egyenlő) a jelszó, igaz értéket ad vissza', () => {
    const { checkIsMinLengthReached } = passwordFormatCheckers
    const jelszoTeszt = "abcdef"
    expect(checkIsMinLengthReached(jelszoTeszt)).toBe(true)
  })
  
  test('checkIsEmail teszt - Ha jó az e-mail-cím', () => {
    const emailTeszt = "valami@gmail.com"
    expect(checkIsEmail(emailTeszt)).toBe(true)
  })
  test('checkIsEmail teszt - Ha rossz az e-mail-cím', () => {
    const emailTeszt = "valamigmail.com"
    expect(checkIsEmail(emailTeszt)).toBe(false)
  })

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

});
