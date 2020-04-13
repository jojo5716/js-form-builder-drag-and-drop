module.exports = {
    setDragStateInformation,
    changeElementColor,
    findFieldByNameInGroups,
    findFieldByName,
    restoreElementColor,
    getElementById,
};

function setDragStateInformation(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
}

function changeElementColor(event, color = '#e2dfdf') {
    event /* eslint-disable-line no-param-reassign */
        .style
        .backgroundColor = color;
}

function restoreElementColor(elementID) {
    const draggableElement = document.getElementById(elementID);

    changeElementColor( draggableElement );
}

function getElementById(fields, elementID) {
    const fieldName = elementID.split('-').slice(-1)[0];

    return findFieldByNameInGroups(fields, fieldName).find(x => x);

}

function findFieldByNameInGroups(fieldGroups, fieldName) {
    return fieldGroups.map(fieldGroup => fieldGroup.fields.find(field => field.name === fieldName));

}

function findFieldByName(fields, fieldName) {
    return fields.find(field => field.name === fieldName);

}
