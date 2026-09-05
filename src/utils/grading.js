export const GRADE_VALUES = {
  one: { A1: 100, B2: 90, B3: 80, C4: 70, C5: 60, C6: 50, D7: 40, E8: null, F9: null },
  two: { A1: 95, B2: 85, B3: 75, C4: 65, C5: 55, C6: 45, D7: 35, E8: null, F9: null },
}

export function calculate({ jambScore, sitting, subjects }) {
  const scale = GRADE_VALUES[sitting]
  if (!scale) throw new Error('Invalid sitting type.')
  if (!Number.isFinite(jambScore) || jambScore < 0 || jambScore > 400) throw new Error('JAMB score must be between 0 and 400.')
  if (!Array.isArray(subjects) || subjects.length !== 4) throw new Error('Exactly four subjects are required.')

  const normalized = subjects.map(s => ({ name: String(s.name || '').trim(), grade: String(s.grade || '').trim().toUpperCase() }))
  if (normalized.some(s => !s.name || scale[s.grade] == null)) throw new Error('Each subject must have a valid grade. E8 and F9 are not accepted.')

  const olevelTotal = normalized.reduce((sum, s) => sum + scale[s.grade], 0)
  const jambContribution = jambScore * 0.15
  const olevelContribution = olevelTotal * 0.1
  const aggregate = jambContribution + olevelContribution
  return { jambContribution, olevelTotal, olevelContribution, aggregate }
}
