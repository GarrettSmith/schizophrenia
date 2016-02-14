import messages from './messages';

const initialState = {
  availableLanguages: ['en'],
  messages,
  selectedLanguage: 'en',
};

export default function intlReducer(state = initialState) {
  return state;
}
