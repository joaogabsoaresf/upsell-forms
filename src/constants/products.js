import { ref } from 'vue';

export const rangeOptions = ref([
    {value: "1-100", name: "1-100 Membros"},
    {value: "101-300", name: "101-300 Membros"},
    {value: "301-500", name: "301-500 Membros"},
]);

export const moduleOptions = [
    {value: "null", name: "Sem módulo"},
    {value: "paid", name: "Pago"},
    {value: "free", name: "Isento"},
    {value: "3-months-free", name: "Isento por 3 meses"},
    {value: "6-months-free", name: "Isento por 6 meses"},
    {value: "9-months-free", name: "Isento por 9 meses"},
    {value: "12-months-free", name: "Isento por 12 meses"},
];

export const videosOptions = [
    {value: "null", name: "Sem módulo"},
    {value: "up-5", name: "Até 5 vídeos"},
    {value: "up-15", name: "Até 15 vídeos"},
    {value: "unlimited", name: "Ilimitado"},
    {value: "free", name: "Isento"},
    {value: "3-months-free", name: "Isento por 3 meses"},
    {value: "6-months-free", name: "Isento por 6 meses"},
    {value: "9-months-free", name: "Isento por 9 meses"},
    {value: "12-months-free", name: "Isento por 12 meses"},
];

export const allProductsList = ref([
    {value: "app", name: "App"},
    {value: "site", name: "Site"},
    {value: "journey", name: "Jornadas"},
    {value: "kids", name: "Kids"},
    {value: "videos", name: "Vídeos"},
    {value: "cells", name: "Gestão de Células"},
    {value: "events", name: "Gestão de Eventos"},
]);

export const liteProProductsList = ref([
    {value: "app", name: "App"},
    {value: "site", name: "Site"},
    {value: "journey", name: "Jornadas"},
    {value: "kids", name: "Kids"},
    {value: "videos", name: "Vídeos"},
]);

export const starterProductsList = ref([
    {value: "journey", name: "Jornadas"},
    {value: "kids", name: "Kids"},
    {value: "videos", name: "Vídeos"},
    {value: "cells", name: "Gestão de Células"},
    {value: "events", name: "Gestão de Eventos"},
]);

export const productLabels = ref({
    app:'App',
    site:'Site',
    journey:'Jornadas',
    kids:'Kids',
    videos:'Vídeos',
    cells:'Gestão de Células',
    events:'Gestão de Eventos'
})

export const productSuperlogicaIDs = {
    pro:{
        app:{
            '1-100':164,
            '101-300':165,
            '301-600':166,
            '601-1000':167,
            '1001-2500':168,
            '2501-5000':169,
            '5001-10000':170,
            '10001+':171,
        },
        site:{
            '1-100':189,
            '101-300':239,
            '301-600':174,
            '601-1000':175,
            '1001-2500':176,
            '2501-5000':177,
            '5001-10000':178,
            '10001+':196,
        },
    },
    lite:{
        app:{
            '1-100':113,
            '101-300':149,
            '301-600':150,
            '601-1000':151,
            '1001-2500':152,
            '2501-5000':153,
            '5001-10000':154,
            '10001+':155,
        },
        site:{
            '1-100':156,
            '101-300':157,
            '301-600':158,
            '601-1000':159,
            '1001-2500':160,
            '2501-5000':161,
            '5001-10000':162,
            '10001+':163,
        },
    },
    starter:{
        app:{
            '1-100':180,
        },
        site:{
            '1-100':181,
        },
    },
}

export const featuresSuperlogicaIDs = {
    journey:{
        '1-100':231,
        '101-300':232,
        '301-600':233,
        '601-1000':234,
        '1001-2500':235,
        '2501-5000':236,
        '5001-10000':237,
    },
    videos:{
        'up-5':246,
        'up-15':247,
        'unlimited':248,
    },
    kids:{
        '1-100':254,
        '101-300':255,
        '301-600':256,
        '601-1000':257,
        '1001-2500':258,
        '2501-5000':259,
        '5001-10000':260,
    },
    cells:{
        'cells':107,
    },
    events:{
        'events':106,
    },
}

export const featuresInchurchIDs = {
    journey:{
        '1-100':1,
        '101-300':2,
        '301-600':3,
        '601-1000':4,
        '1001-2500':5,
        '2501-5000':6,
        '5001-10000':7,
    },
    videos:{
        'up-5':9,
        'up-15':10,
        'unlimited':11,
    },
    kids:{
        '1-100':12,
        '101-300':13,
        '301-600':14,
        '601-1000':15,
        '1001-2500':16,
        '2501-5000':17,
        '5001-10000':18,
    }
}