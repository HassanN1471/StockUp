export const filterData = (data, cutoff) => {
    return data.filter(item => {
        return (item.change >= cutoff || item.change <= -cutoff);
    })
}


export const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
}