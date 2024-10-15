import { post } from "./base"
import { getSuperlogicaId } from "../composables/mountRequests";

const { api_post } = post();

const startDateMap = {
    "paid":1,
    "3-months-free":4,
    "6-months-free":7,
    "9-months-free":10,
    "12-months-free":13,
  }

export async function createCharge(body) {
    try {
        const data = await api_post('/webhooks/superlogica/item/', body);
        return data
    } catch (error) {
        console.error('POST error:', error);
    } finally {}
}

export async function createSetup(body) {
    try {
        const data = await api_post('/create-charge-setup/', body);
        return data
    } catch (error) {
        console.error('POST error:', error);
    } finally {}
}

export async function createItems(items) {
    const response = []
    for (let key in items.products) {
        const product = items.products[key]
        let superlogicaId = null
        if (product == 'videos'){
            superlogicaId = getSuperlogicaId(items.tertiarygroupID, items.membersRange, items.productType, product, items.productInfo.videos.selectedOption)
        } else {
            superlogicaId = getSuperlogicaId(items.tertiarygroupID, items.membersRange, items.productType, product)
        }
        const value = items.productInfo[product]['selectedOption'] === 'free' ? 0 : items.productInfo[product]['productValue']
        const start_in = items.productInfo[product]['selectedOption'] === undefined ? 1 : startDateMap[items.productInfo[product]['selectedOption']]
        const body = JSON.stringify({
            'tertiarygroup_id':items.tertiarygroupID,
            'item_id':superlogicaId,
            'item_value':value,
            'start_in':start_in,
            'billing_period':12,
        })
        const itemResponse = await createCharge(body)
        response.push(itemResponse)
    }
    return response
}

export async function createSetupItems(items) {
    const response = []
    let hasInstallments = true
    let firstPaymentValue = null
    let installmentsValue = null
    let installments = null

    if (items.hasDownPayment){
        firstPaymentValue = items.downPaymentValue
        installmentsValue = (items.setupValue - items.downPaymentValue) / items.setupInstallments
        installments = items.setupInstallments
    } else {
        firstPaymentValue = items.setupValue / items.setupInstallments
        if ((items.setupInstallments - 1) > 0){
            installmentsValue = items.setupValue / items.setupInstallments
            installments = items.setupInstallments - 1

        } else {
            hasInstallments = false
        }
    }

    const firstPaymentBody = JSON.stringify({
        "tertiarygroup_id":items.tertiarygroupID, 
        "value":firstPaymentValue,
        "due_date":items.setupDueDate
    })
    const setupResponse = await createSetup(firstPaymentBody)
    response.push(setupResponse)

    if (hasInstallments){
        const installmentsBody = JSON.stringify({
            'tertiarygroup_id':items.tertiarygroupID,
            'item_id':42,
            'item_value':installmentsValue,
            'start_in':startDateMap.paid,
            'billing_period':installments - 1,
        })
        const itemResponse = await createCharge(installmentsBody)
        response.push(itemResponse)
    }
    return response
}

export async function saveAirtable(data) {
    const body = JSON.stringify(data)
    try {
        const data = await api_post('/upsell/save/', body);
        return data
    } catch (error) {
        console.error('POST error:', error);
    } finally {}
}
