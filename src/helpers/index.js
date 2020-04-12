module.exports = {
    setDragStateInformation,
    changeElementColor,
    findFieldByName,
    restoreElementColor,
};

function setDragStateInformation(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
}

function changeElementColor(event, color = 'red') {
    event /* eslint-disable-line no-param-reassign */
        .currentTarget
        .style
        .backgroundColor = color;
}

function restoreElementColor(elementID) {
    const draggableElement = document.getElementById(elementID);

    changeElementColor({ currentTarget: draggableElement });
}

function findFieldByName(fields, fieldName) {
    return fields.find(fieldData => fieldData.name === fieldName);
}
