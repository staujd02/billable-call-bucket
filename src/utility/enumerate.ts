function enumerate<T>(result: IterableIterator<T & Realm.Object>, count: number): Array<T> {
    let limit = 0;
    const memoryList = [];
    for (const r of result) {
        memoryList.push(r);
        if (limit++ > count)
            break;
    }
    return memoryList;
}

export {
    enumerate
}