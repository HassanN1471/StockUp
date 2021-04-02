const reformatDataForList = (data) => {
    let list = [];
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i].close !== null && data[i + 1].close !== null) {
            list.push({
                change: ((data[i + 1].close - data[i].close) / data[i].close * 100).toFixed(2),
                interval: `${data[i].label} - ${data[i + 1].label}`
            });
        }
    }
    return list;
}

module.exports = { reformatDataForList };