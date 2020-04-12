module.exports = {
    setDragStateInformation,
    changeElementColor,
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
