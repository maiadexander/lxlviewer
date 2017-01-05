export function getEditorData(state) {
  return state.editor.data;
}
export function getVocabulary(state) {
  return state.vocab;
}
export function getDisplayDefinitions(state) {
  return state.display;
}
export function getSettings(state) {
  return state.settings;
}
export function getStatus(state) {
  return state.status;
}
export function getKeybindState(state) {
  return state.status.keybindState;
}
