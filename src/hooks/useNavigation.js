export function useNavigation () {
  function push (path) {
    window.location.href = path
  }

  return { push }
}
