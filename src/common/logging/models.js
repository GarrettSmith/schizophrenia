export const Entry = {
  id: null,
  createdAt: null,
  physical: 0,
  mental: 0,
  emotional: 0,
  bloodPressureId: null,
  sideEffects: [],
  symptoms: [],
  weight: null,
  bloodSugar: null,
};

export const Symptom = {
  id: null,
  name: null,
};

export const EntrySymptom = {
  id: null,
  entryId: null,
  symptomId: null,
  severity: 1,
};

export const SideEffect = {
  id: null,
  name: null,
}

export const EntrySideEffect = {
  id: null,
  entryId: null,
  sideEffectId: null,
  severity: 1,
};

export const BloodPressure = {
  id: null,
  systolic: null,
  diastolic: null,
};
