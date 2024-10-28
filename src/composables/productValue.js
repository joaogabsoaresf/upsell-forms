const productFunctionMap = {
    app:getAppValue,
    site:getAppValue,
    journey:getFeatureValue,
    kids:getFeatureValue,
    videos:getFeatureValue,
    cells:getFeatureValue,
    events:getFeatureValue,
}

export function getProductValue(membersRange, productType, productName, selectedOption) {
    const value = productFunctionMap[productName](membersRange, productType, productName, selectedOption)
    return value
}

function getAppValue(membersRange, productType, productName, selectedOption) {
    const pro = {
        "1-100":240,
        "101-300":240,
        "301-600":300,
        "601-1000":360,
        "1001-2500":450,
        "2501-5000":600,
        "5001-10000":900
    }
    const lite = {
        "1-100":150,
        "101-300":210,
        "301-600":270,
        "601-1000":330,
        "1001-2500":390,
        "2501-5000":480,
        "5001-10000":720
    }
    if (productType === 'pro') {
        return pro[membersRange]
    }
    if (productType === 'lite') {
        return lite[membersRange]
    }
}

function getFeatureValue(membersRange, productType, productName, selectedOption) {
    const journey = {
        "1-100":19.9,
        "101-300":34.9,
        "301-600":44.9,
        "601-1000":54.9,
        "1001-2500":64.9,
        "2501-5000":79.9,
        "5001-10000":109.9,
    }
    const kids = {
        "1-100":59.9,
        "101-300":69.9,
        "301-600":99.9,
        "601-1000":149.9,
        "1001-2500":329.9,
        "2501-5000":399.9,
        "5001-10000":499.9
    }
    const videos = {
        "up-5":49.9,
        "up-15":149.9,
        "unlimited":399.9,
    }
    const cells = {
        "1-100":39.9,
    }
    const events = {
        "1-100":19.9,
    }
    if (productName === 'journey') {
        return journey[membersRange]
    }
    if (productName === 'kids') {
        return kids[membersRange]
    }
    if (productName === 'videos') {
        return videos[selectedOption]
    }
    if (productName === 'cells') {
        return cells[membersRange]
    }
    if (productName === 'events') {
        return events[membersRange]
    }
}
