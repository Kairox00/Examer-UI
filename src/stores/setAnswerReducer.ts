export default function setAnswerReducer(
  state: Record<string, string>,
  action: { key: string; value: string }
) {
  return { ...state, [action.key]: action.value };
}
