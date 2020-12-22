import VueFormGenerator from 'vue-form-generator'

export default {
    groups: [
        {
            legend: 'Datos de Conductor',
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'NIF/DNI',
                    model: 'nif',
                    required: true,
                    validator: VueFormGenerator.validators.string.locale({
                        fieldIsRequired: "El NIF/CIF es oblicagorio",
                    })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Nombre',
                    model: 'nombre',
                    required: true,
                    validator: VueFormGenerator.validators.string.locale({
                        fieldIsRequired: "El nombre es oblicagorio",
                    })
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Apellido 1',
                    model: 'apellido1',
                    required: false,
                    validator: ['string']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Apellido 2',
                    model: 'apellido2',
                    required: false,
                    validator: ['string']
                },                
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Observaciones',
                    model: 'observaciones',
                    required: false,
                    validator: ['string']
                },
            ]
        },
    ],
}