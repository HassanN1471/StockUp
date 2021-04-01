export const filterData = (data, cutoff) => {
    return data.filter(item=>{
        return (item.change>=cutoff || item.change<=-cutoff );
    })
}