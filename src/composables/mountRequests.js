import { productSuperlogicaIDs, featuresSuperlogicaIDs, featuresInchurchIDs } from "./../constants/products";

const itemMap = {
    app:getProductId,
    site:getProductId,
    journey:getModuleId,
    kids:getModuleId,
    cells:getModuleId,
    events:getModuleId,
}

export function getSuperlogicaId(tertiarygroup_id, membersRange, productType, item, ...options){
    if (item === 'videos'){
        return getVideosId(options[0])
        
    }
    return itemMap[item](membersRange, productType, item)
}

function getProductId(membersRange, productType, item){
    return productSuperlogicaIDs[productType][item][membersRange]
}

function getModuleId(membersRange, productType, item){
    return featuresSuperlogicaIDs[item][membersRange]
}

function getVideosId(options){
    return featuresSuperlogicaIDs.videos[options]
}

export function getFeatureId(membersRange, item, ...options){
    if (item === 'videos'){
        return featuresInchurchIDs.videos[options[0]]
        
    }
    return featuresInchurchIDs[item][membersRange]
}