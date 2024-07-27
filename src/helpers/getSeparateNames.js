export const getSeparateName = (displayName) => {
    const nameArray = displayName.split(' ')
    const names = nameArray[0] + ' ' + nameArray[1]
    const lastNames = nameArray[2] + ' ' + nameArray[3]
   
    return {names , lastNames}
}