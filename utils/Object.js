export async function FOR_EACH(array = [], func = async (item) => {
}) {
    return Promise.all(array.map(value => func(value)));
}
