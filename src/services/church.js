import { post } from "./base";
import { featuresInchurchIDs } from "../constants/products";
import { getFeatureId } from "../composables/mountRequests";

const { api_post } = post();

export async function getChurch(tertiarygroupId) {
    try {
        const body = JSON.stringify({'tertiarygroup_id':tertiarygroupId})
        const data = await api_post('/webhooks/get-tertiarygroup/', body);
        return data
    } catch (error) {
        console.error('Erro ao buscar igreja:', error);
    } finally {}
}

export async function updateChurch(body) {
    try {
        const data = await api_post('/webhooks/release-feature/', body);
        return data
    } catch (error) {
        console.error('Erro ao buscar igreja:', error);
    } finally {}
}

export async function accessRelease(items) {
    const response = []
    for (let key in items.products) {
        const product = items.products[key]
        console.log(product)
        if (product !== 'app' && product !== 'site'){
            let featureId = null
            if (product == 'videos'){
                featureId = getFeatureId(items.membersRange, product, items.productInfo.videos.selectedOption)
            } else {
                featureId = getFeatureId(items.membersRange, product)
            }
            const body = JSON.stringify({
                'tertiarygroup_id':items.tertiarygroupID,
                'plan':`/api/v1/feature_plan/${featureId}/`,
            })
            const itemResponse = await updateChurch(body)
            response.push(itemResponse)
        }
        else {
            const body = JSON.stringify({
                'tertiarygroup_id':items.tertiarygroupID,
                'product':product,
            })
            const itemResponse = await updateChurch(body)
            response.push(itemResponse)
        }
    }
    return response
}