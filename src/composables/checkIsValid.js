const indexValidationMap = {
    1:page1Validation,
    2:page2Validation,
    3:page3Validation,
    4:page4Validation,
    5:page5Validation,
}

export function checkPageValidation(index, formData){
    console.log(index)
    return indexValidationMap[index](formData)
}

function page1Validation(formData){
    if (!formData.page1.email && !formData.page1.channel && !formData.page1.sdr){
        return false
    }
    const emailPattern = /^[^\s@]+@inchurch\.com\.br$/;
    return emailPattern.test(formData.page1.email);
}

function page2Validation(formData){
    if (!formData.page2.tertiarygroupID){
        return false
    }
    return true
}

function page3Validation(formData){
    if (formData.page3.hasSetup === undefined){
        return false
    }
    else if (!formData.page3.hasSetup) {
        return true
    }
    if (!formData.page3.setupValue || !formData.page3.setupValue.includes(',')) {
        return false
    }
    if (formData.page3.hasDownPayment) {
        if (!formData.page3.downPaymentValue || !formData.page3.downPaymentValue.includes(',')){
            return false
        }
    }
    if (formData.page3.setupInstallments < 1){
        return false
    }
    return true
}

function page4Validation(formData){
    return true
    if (!formData.page4.products || formData.page4.products.length < 1){
        return false
    }
    if (!formData.page4.membersRange || !formData.page4.productType){
        return false
    }
    return true
}

function page5Validation(formData){
    let counter = 0
    for (let i in formData.page5.config){
        counter++
    }
    return (counter === formData.page4.products.length)
}

