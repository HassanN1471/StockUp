const indexOfItemID = (data, id) => {
    return index = data.findIndex(el => el.id === id);
}

module.exports = { indexOfItemID };