import VueFormGenerator from 'vue-form-generator'

export default {
    groups: [
        {
            legend: 'Datos de la Mercancía',
            fields: [                
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
                    label: 'Observaciones',
                    model: 'observaciones',
                    required: false,
                },
            ]
        },
    ],
}