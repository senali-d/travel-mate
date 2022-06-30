const set = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    return false
  }
}

const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return false
  }
}

const remove = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    return false
  }
}

export { set, get, remove }
