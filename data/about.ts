// @ts-ignore
import numberToWords from 'number-to-words'
import { About } from '@/types/pages'


function years(): string {
  const yearsDevelopment: number = new Date().getFullYear() - 2013
  return numberToWords.toWords(yearsDevelopment)
}

export const about: About = {
  firstName: 'Mohamed',
  lastName: 'Bensaleh',
  role: 'Software Developer',
  city: 'Saskatoon',
  province: 'Saskatchewan',
  companyLogo: `/images/enodo-logo.svg`,
}
  